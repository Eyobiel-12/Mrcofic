import { google } from 'googleapis'

/**
 * Initialize Gmail API client using service account credentials
 */
export async function getGmailClient() {
  // Service account credentials from environment variable
  // Try base64 encoded version first, then fallback to direct JSON
  let credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_B64
  let isBase64 = true
  
  if (!credentialsJson) {
    // Fallback to direct JSON
    credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
    isBase64 = false
  }
  
  if (!credentialsJson) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS or GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_B64 not set in environment variables')
  }

  let credentials
  try {
    let jsonString: string
    
    if (isBase64) {
      // Decode from base64
      jsonString = Buffer.from(credentialsJson, 'base64').toString('utf-8')
    } else {
      // Remove surrounding quotes if present and unescape
      let cleanedJson = credentialsJson.trim()
      // Remove outer quotes
      if ((cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) || 
          (cleanedJson.startsWith("'") && cleanedJson.endsWith("'"))) {
        cleanedJson = cleanedJson.slice(1, -1)
      }
      // Unescape: first unescape backslashes, then quotes
      cleanedJson = cleanedJson.replace(/\\\\/g, '\\').replace(/\\"/g, '"')
      jsonString = cleanedJson
    }
    
    credentials = JSON.parse(jsonString)
  } catch (e: any) {
    console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS:', e.message)
    console.error('📋 Using base64:', isBase64)
    if (!isBase64) {
      console.error('📋 First 200 chars:', credentialsJson.substring(0, 200))
    }
    throw new Error(`GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is not valid JSON: ${e.message}`)
  }

  // Get user to impersonate (for domain-wide delegation)
  const impersonateUser = process.env.GMAIL_IMPERSONATE_USER || process.env.GMAIL_FROM_EMAIL || 'marcoficweb@gmail.com'

  // Create JWT client for service account with domain-wide delegation
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      'https://www.googleapis.com/auth/gmail.send',
    ],
    subject: impersonateUser, // Impersonate this user (requires domain-wide delegation)
  })

  // Authenticate
  await auth.authorize()

  // Create Gmail client
  const gmail = google.gmail({ version: 'v1', auth })

  return { gmail, userId: impersonateUser }
}

/**
 * Send email using Gmail API
 */
export async function sendEmailViaGmail(
  to: string,
  subject: string,
  htmlBody: string,
  fromEmail?: string
) {
  const { gmail, userId } = await getGmailClient()
  
  // Use provided from email or default
  const from = fromEmail || process.env.GMAIL_FROM_EMAIL || userId || 'marcoficweb@gmail.com'
  
  // Create email message in RFC 2822 format
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/html; charset=utf-8`,
    '',
    htmlBody,
  ].join('\n')

  // Encode message in base64url format
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  // Send email using the impersonated user
  const response = await gmail.users.messages.send({
    userId: userId, // Use the impersonated user
    requestBody: {
      raw: encodedMessage,
    },
  })

  return response.data
}

