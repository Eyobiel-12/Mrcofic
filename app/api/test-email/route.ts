import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { type, email } = await req.json()

    if (!type || !email) {
      return NextResponse.json(
        { error: "Missing type or email" },
        { status: 400 }
      )
    }

    const testData = {
      to_email: email,
      name: "Test Klant",
      date: "2025-12-15",
      time: "10:00-10:30",
      link: process.env.APP_BASE_URL || "http://localhost:3000",
    }

    let templateId: string
    let templateParams: Record<string, string>

    if (type === "confirm") {
      templateId = process.env.EMAILJS_TEMPLATE_ID_USER_CONFIRM || ""
      templateParams = {
        email: testData.to_email, // Template uses {{email}}
        to_email: testData.to_email, // Also send to_email for compatibility
        to_name: testData.name, // Some templates use to_name
        name: testData.name,
        date: testData.date,
        time: testData.time,
        link: testData.link,
        reply_to: testData.to_email, // Some services need this
      }
    } else if (type === "reject") {
      templateId = process.env.EMAILJS_TEMPLATE_ID_USER_REJECT || ""
      templateParams = {
        email: testData.to_email, // Template uses {{email}}
        to_email: testData.to_email, // Also send to_email for compatibility
        to_name: testData.name, // Some templates use to_name
        name: testData.name,
        date: testData.date,
        time: testData.time,
        reply_to: testData.to_email, // Some services need this
      }
    } else {
      return NextResponse.json(
        { error: "Invalid type. Use 'confirm' or 'reject'" },
        { status: 400 }
      )
    }

    if (!templateId) {
      return NextResponse.json(
        { error: `Template ID for ${type} not configured` },
        { status: 500 }
      )
    }

    // Log what we're sending (for debugging)
    // EmailJS requires: user_id = Public Key, accessToken = Private Key (for server-side)
    const emailPayload: any = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: process.env.EMAILJS_USER_ID, // Public Key
      template_params: templateParams,
    }
    
    // Add private key as accessToken for server-side API calls in strict mode
    if (process.env.EMAILJS_PRIVATE_KEY) {
      emailPayload.accessToken = process.env.EMAILJS_PRIVATE_KEY
    }

    console.log("EmailJS Payload:", JSON.stringify(emailPayload, null, 2))

    // Check if all required env vars are set
    if (!process.env.EMAILJS_SERVICE_ID || !templateId || !process.env.EMAILJS_USER_ID) {
      return NextResponse.json(
        {
          error: "EmailJS configuration missing",
          details: {
            hasServiceId: !!process.env.EMAILJS_SERVICE_ID,
            hasTemplateId: !!templateId,
            hasUserId: !!process.env.EMAILJS_USER_ID,
            templateId: templateId,
          },
        },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    })

    // Get response text first
    const responseText = await response.text()
    let result: any
    
    // Try to parse as JSON
    try {
      result = JSON.parse(responseText)
    } catch (e) {
      // If not JSON, create error object
      result = { 
        text: responseText,
        error: "Invalid JSON response",
        raw: responseText 
      }
    }

    console.log("EmailJS Response Status:", response.status)
    console.log("EmailJS Response Text:", responseText)
    console.log("EmailJS Response Parsed:", result)

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `${type === "confirm" ? "Confirmation" : "Rejection"} email sent successfully`,
        result: result,
        payload: emailPayload, // Include payload for debugging
      })
    } else {
      // Provide helpful error message for 403
      let errorMessage = "Failed to send email"
      if (response.status === 403) {
        errorMessage = "Server-side API calls are disabled. Enable in EmailJS Dashboard → Account → Security → 'Allow EmailJS API for non-browser applications'"
      }
      
      return NextResponse.json(
        {
          error: errorMessage,
          details: result,
          responseText: responseText,
          status: response.status,
          payload: emailPayload, // Include payload for debugging
          help: response.status === 403 ? {
            step1: "Go to EmailJS Dashboard → Account → Security",
            step2: "Enable 'Allow EmailJS API for non-browser applications'",
            step3: "Or use Private Key instead of Public Key",
            step4: "Restart dev server after changes"
          } : undefined
        },
        { status: response.status }
      )
    }
  } catch (error: any) {
    console.error("Email test error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

