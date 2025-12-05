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

    // Stuur admin-notificatie via EmailJS REST API (server-side)
    try {
      const emailPayload: any = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID_ADMIN,
        user_id: process.env.EMAILJS_USER_ID, // Public Key
        template_params: {
          to_email: process.env.ADMIN_NOTIFICATION_EMAIL,
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          date: data.date,
          time: data.time,
          message: data.message || "",
          admin_link: `${process.env.APP_BASE_URL}/admin`,
        },
      }
      
      // Add private key as accessToken for server-side API calls
      if (process.env.EMAILJS_PRIVATE_KEY) {
        emailPayload.accessToken = process.env.EMAILJS_PRIVATE_KEY
      }
      
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      })
    } catch (e) {
      // Log error but don't fail booking
      console.error("EmailJS admin notify failed:", e)
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

