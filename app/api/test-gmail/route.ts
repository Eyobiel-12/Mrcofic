import { NextResponse } from "next/server"
import { sendEmailViaGmail } from "@/lib/gmailClient"

export async function POST(req: Request) {
  try {
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "marcofic2010@gmail.com"
    const fromEmail = process.env.GMAIL_FROM_EMAIL || "marcoficweb@gmail.com"

    console.log("🧪 Testing Gmail API...")
    console.log("📧 From:", fromEmail)
    console.log("📧 To:", adminEmail)
    console.log("📧 Has B64 credentials:", !!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_B64)
    console.log("📧 Has JSON credentials:", !!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS)

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_B64 && !process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
      return NextResponse.json(
        { 
          error: "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS or GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_B64 not set in environment variables",
          hint: "Use GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_B64 (base64 encoded) for better reliability"
        },
        { status: 500 }
      )
    }

    const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test Email</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h1>Test Email van Gmail API</h1>
  <p>Als je deze email ontvangt, werkt de Gmail API integratie correct!</p>
  <p>Dit is een test email verzonden op ${new Date().toLocaleString('nl-NL')}</p>
</body>
</html>
    `.trim()

    console.log("📧 Attempting to send test email via Gmail API...")

    const result = await sendEmailViaGmail(
      adminEmail,
      "Test Email - Gmail API",
      testHtml,
      fromEmail
    )

    console.log("✅ Gmail API test successful!")
    console.log("📧 Result:", JSON.stringify(result, null, 2))

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully via Gmail API!",
      messageId: result.id,
      details: result,
    })
  } catch (error: any) {
    console.error("❌ Gmail API test error:", error)
    return NextResponse.json(
      {
        error: "Failed to send test email via Gmail API",
        message: error.message,
        details: error.stack,
      },
      { status: 500 }
    )
  }
}

