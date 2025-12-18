import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL || "marcoficweb@gmail.com"

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY not set in environment variables" },
        { status: 500 }
      )
    }

    if (!adminEmail) {
      return NextResponse.json(
        { error: "ADMIN_NOTIFICATION_EMAIL not set in environment variables" },
        { status: 500 }
      )
    }

    console.log("🧪 Testing Resend API...")
    console.log("📧 From:", fromEmail)
    console.log("📧 To:", adminEmail)
    console.log("📧 API Key:", resendApiKey.substring(0, 10) + "...")

    const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test Email</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h1>Test Email van Resend</h1>
  <p>Als je deze email ontvangt, werkt de Resend integratie correct!</p>
  <p>Dit is een test email verzonden op ${new Date().toLocaleString('nl-NL')}</p>
</body>
</html>
    `.trim()

    const resendPayload = {
      from: fromEmail,
      to: [adminEmail],
      subject: "Test Email - Resend API",
      html: testHtml,
    }

    console.log("📧 Sending test email with payload:", JSON.stringify(resendPayload, null, 2))

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
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully!",
        emailId: emailResult?.id,
        details: emailResult,
      })
    } else {
      return NextResponse.json(
        {
          error: "Failed to send test email",
          status: emailResponse.status,
          details: emailResult,
          message: emailResult?.message || "Unknown error",
        },
        { status: emailResponse.status }
      )
    }
  } catch (error: any) {
    console.error("❌ Test Resend error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}


