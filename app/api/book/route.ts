import { supabase } from "@/lib/supabaseServer"
import { validateEmail, validateDate, validateTimeSlot, validatePhone } from "@/utils/validation"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, date, time, message } = body

    // Required fields validation
    if (!name || !email || !date || !time) {
      return new Response(
        JSON.stringify({ error: "Vul alle verplichte velden in" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // Trim and validate name
    const trimmedName = name.trim()
    if (!trimmedName || trimmedName.length < 2) {
      return new Response(
        JSON.stringify({ error: "Naam moet minimaal 2 tekens bevatten" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // Email validation
    const trimmedEmail = email.trim().toLowerCase()
    if (!validateEmail(trimmedEmail)) {
      return new Response(
        JSON.stringify({ error: "Ongeldig e-mailadres" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // Date validation
    const dateValidation = validateDate(date)
    if (!dateValidation.valid) {
      return new Response(
        JSON.stringify({ error: dateValidation.error }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // Check if date is blocked
    const { data: blockedDate } = await supabase
      .from("blocked_dates")
      .select("id, reason")
      .eq("date", date)
      .single()

    if (blockedDate) {
      const reason = blockedDate.reason ? ` (${blockedDate.reason})` : ""
      return new Response(
        JSON.stringify({ error: `Deze datum is geblokkeerd${reason}. Kies een andere datum.` }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      )
    }

    // Time slot validation
    const timeValidation = validateTimeSlot(date, time)
    if (!timeValidation.valid) {
      return new Response(
        JSON.stringify({ error: timeValidation.error }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // Phone validation (optional but if provided, should be valid)
    let trimmedPhone = phone?.trim() || ""
    if (trimmedPhone && trimmedPhone.length > 0) {
      if (!validatePhone(trimmedPhone)) {
        return new Response(
          JSON.stringify({ error: "Ongeldig telefoonnummer (minimaal 10 cijfers)" }),
          { status: 422, headers: { "Content-Type": "application/json" } }
        )
      }
    }

    // Message length validation (optional but if provided, limit length)
    const trimmedMessage = message?.trim() || ""
    if (trimmedMessage.length > 500) {
      return new Response(
        JSON.stringify({ error: "Bericht mag maximaal 500 tekens bevatten" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // Check if time slot is already booked (double-check before insert)
    const { data: existingAppointments } = await supabase
      .from("appointments")
      .select("id, status")
      .eq("date", date)
      .eq("time", time)
      .in("status", ["pending", "approved"])

    if (existingAppointments && existingAppointments.length > 0) {
      return new Response(
        JSON.stringify({ error: "Dit tijdvak is al geboekt. Kies een ander tijdstip." }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      )
    }

    // Insert appointment
    const { data, error } = await supabase
      .from("appointments")
      .insert([{ 
        name: trimmedName, 
        email: trimmedEmail, 
        phone: trimmedPhone || null, 
        date, 
        time, 
        message: trimmedMessage || null, 
        status: "pending" 
      }])
      .select()
      .single()

    if (error) {
      // Duplicate (time already reserved) - race condition fallback
      if (error.code === "23505" || error.message?.includes("duplicate")) {
        return new Response(
          JSON.stringify({ error: "Dit tijdvak is al geboekt. Kies een ander tijdstip." }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        )
      }
      console.error("Database error:", error)
      return new Response(
        JSON.stringify({ error: "Er ging iets mis bij het opslaan. Probeer het opnieuw." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    // Stuur admin-notificatie via Resend API
    try {
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
      const resendApiKey = process.env.RESEND_API_KEY
      
      if (!adminEmail) {
        console.warn("⚠️ ADMIN_NOTIFICATION_EMAIL not set, skipping admin notification")
      } else if (!resendApiKey) {
        console.warn("⚠️ RESEND_API_KEY not set, skipping admin notification")
      } else {
        console.log("📧 Sending new booking notification to admin via Resend:", adminEmail)
        
        const adminLink = `${process.env.APP_BASE_URL || "http://localhost:3000"}/admin`
        
        // HTML email template for admin notification
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe Afspraak</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    <h1 style="color: #2c3e50; margin-top: 0;">Nieuwe Afspraak Aanvraag</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <p style="font-size: 16px; margin-top: 0;">Er is een nieuwe afspraak aanvraag binnengekomen:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #e0e0e0;">Naam:</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #e0e0e0;">Email:</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #3498db;">${data.email}</a></td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #e0e0e0;">Telefoon:</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;"><a href="tel:${data.phone}" style="color: #3498db;">${data.phone}</a></td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #e0e0e0;">Datum:</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.date}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #e0e0e0;">Tijd:</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.time}</td>
      </tr>
      ${data.message ? `
      <tr>
        <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #e0e0e0; vertical-align: top;">Bericht:</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.message.replace(/\n/g, '<br>')}</td>
      </tr>
      ` : ''}
    </table>
    
    <div style="margin-top: 30px; text-align: center;">
      <a href="${adminLink}" style="display: inline-block; background-color: #3498db; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Beheer Afspraken</a>
    </div>
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 12px; color: #666;">
    <p style="margin: 0;">Dit is een automatische notificatie van het MARCOFIC boekingssysteem.</p>
  </div>
</body>
</html>
        `.trim()
        
        const subject = "Nieuwe Afspraak Aanvraag - " + data.name
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
        
        const resendPayload = {
          from: fromEmail,
          to: [adminEmail],
          subject: subject,
          html: htmlContent,
        }
        
        console.log("📧 Resend Payload:", JSON.stringify({ ...resendPayload, html: "[HTML content]" }, null, 2))
        
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(resendPayload),
        })
        
        const responseText = await emailResponse.text()
        let emailResult: any
        
        try {
          emailResult = JSON.parse(responseText)
        } catch (e) {
          emailResult = { text: responseText, raw: responseText }
        }
        
        console.log("📧 Resend Response Status:", emailResponse.status)
        console.log("📧 Resend Response:", JSON.stringify(emailResult, null, 2))
        
        if (emailResponse.ok) {
          console.log("✅ Admin notification email sent successfully via Resend")
          console.log("📧 Email ID:", emailResult?.id)
        } else {
          console.error("❌ Resend admin notification failed:", emailResponse.status, emailResult)
          if (emailResult?.message) {
            console.error("❌ Error message:", emailResult.message)
            if (emailResponse.status === 403 && emailResult?.message?.includes("testing emails")) {
              console.error("⚠️ Resend domain not verified. See RESEND_DOMAIN_SETUP.md for instructions.")
            }
          }
        }
      }
    } catch (e) {
      // Log error but don't fail booking
      console.error("❌ Resend admin notify error:", e)
    }

    return new Response(
      JSON.stringify({ success: true, appointment: data }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

