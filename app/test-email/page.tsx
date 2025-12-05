"use client"

import { useState } from "react"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sendTestEmail = async (type: "confirm" | "reject") => {
    if (!email) {
      setError("Voer een e-mailadres in")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, email }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`✅ ${data.message}`)
        console.log("Email sent successfully:", data)
      } else {
        // Show helpful error message for 403
        if (response.status === 403 && data.help) {
          setError(`❌ ${data.error}\n\n📋 Oplossing:\n1. ${data.help.step1}\n2. ${data.help.step2}\n3. ${data.help.step3}\n4. ${data.help.step4}\n\n📖 Zie EMAILJS_ENABLE_SERVER_SIDE.md voor details`)
        } else {
          const errorMsg = data.details?.text || data.details?.message || data.responseText || JSON.stringify(data.details, null, 2)
          setError(`❌ ${data.error}\n\nDetails: ${errorMsg}`)
        }
        console.error("Email error:", data)
        
        // Show configuration issues
        if (data.details?.hasServiceId === false || data.details?.hasTemplateId === false || data.details?.hasUserId === false) {
          setError(`❌ Configuration Error:\n\nMissing:\n${!data.details.hasServiceId ? '- EMAILJS_SERVICE_ID\n' : ''}${!data.details.hasTemplateId ? '- EMAILJS_TEMPLATE_ID\n' : ''}${!data.details.hasUserId ? '- EMAILJS_USER_ID\n' : ''}\n\nCheck your .env.local file`)
        }
      }
    } catch (err: any) {
      setError(`❌ Fout: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="luxury-card p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary-900 font-display mb-6 text-center">
          Test Email Templates
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-primary-800 mb-2">
              Test E-mailadres
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.com"
              className="input-modern w-full"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => sendTestEmail("confirm")}
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  Verzenden...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Test Bevestiging
                </>
              )}
            </button>

            <button
              onClick={() => sendTestEmail("reject")}
              disabled={loading}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-primary-600 border-t-transparent"></span>
                  Verzenden...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Test Afwijzing
                </>
              )}
            </button>
          </div>

          {result && (
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">{result}</p>
              <p className="text-sm text-green-600 mt-1">Check je inbox (en spam folder)</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-800 font-medium whitespace-pre-line">{error}</p>
              <p className="text-xs text-red-600 mt-2">
                Check de browser console (F12) voor meer details
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Deze pagina test alleen de bevestigings- en afwijzings e-mails.
              <br />
              Admin notificaties worden later getest.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

