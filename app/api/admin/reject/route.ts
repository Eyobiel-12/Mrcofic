import { supabase } from "@/lib/supabaseServer"

export async function POST(req: Request) {
  try {
    const { id } = await req.json()
    console.log("❌ REJECT API called for appointment:", id)
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing id" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // First check current status to prevent duplicate emails
    const { data: currentData } = await supabase
      .from("appointments")
      .select("status")
      .eq("id", id)
      .single()

    if (currentData?.status === "rejected") {
      console.log("⚠️ Appointment already rejected, skipping email:", id)
      return new Response(
        JSON.stringify({ success: true, message: "Already rejected" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "rejected" })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: "Appointment not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      )
    }

    // Send rejection email to customer
    try {
      const emailPayload: any = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID_USER_REJECT,
        user_id: process.env.EMAILJS_USER_ID, // Public Key
        template_params: {
          email: data.email, // Template uses {{email}}
          to_email: data.email, // Also send to_email for compatibility
          to_name: data.name, // Some templates use to_name
          name: data.name,
          date: data.date,
          time: data.time,
          reply_to: data.email, // Some services need this
        },
      }
      
      // Add private key as accessToken for server-side API calls
      if (process.env.EMAILJS_PRIVATE_KEY) {
        emailPayload.accessToken = process.env.EMAILJS_PRIVATE_KEY
      }

      console.log("📧 Sending rejection email to:", data.email)
      console.log("📧 EmailJS Payload:", JSON.stringify(emailPayload, null, 2))

      const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      })

      const responseText = await emailResponse.text()
      let emailResult: any
      
      try {
        emailResult = JSON.parse(responseText)
      } catch (e) {
        emailResult = { text: responseText, raw: responseText }
      }
      
      if (emailResponse.ok) {
        console.log("✅ Rejection email sent successfully:", emailResult)
      } else {
        console.error("❌ EmailJS error:", emailResponse.status, emailResult)
        if (emailResponse.status === 403) {
          console.error("⚠️ Server-side API calls are disabled. Enable in EmailJS Dashboard → Account → General Settings")
        }
      }
    } catch (e) {
      console.error("❌ EmailJS user reject failed:", e)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

