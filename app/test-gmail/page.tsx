"use client"

import { useState } from "react"

export default function TestGmailPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testGmail = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/test-gmail", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || "Failed to send test email")
        setResult(data)
      }
    } catch (err: any) {
      setError(err.message || "Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Test Gmail API</h1>
      
      <button
        onClick={testGmail}
        disabled={loading}
        style={{
          padding: "12px 24px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        {loading ? "Verzenden..." : "Verstuur Test Email via Gmail API"}
      </button>

      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "5px",
            marginBottom: "20px",
            color: "#c33",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div
          style={{
            padding: "15px",
            backgroundColor: result.success ? "#efe" : "#fff",
            border: `1px solid ${result.success ? "#cfc" : "#ccc"}`,
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3>{result.success ? "✅ Success!" : "❌ Failed"}</h3>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
              fontSize: "12px",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
        <h3>Checklist:</h3>
        <ul>
          <li>✅ Check je terminal/console voor gedetailleerde logs</li>
          <li>✅ Check je email inbox (marcofic2010@gmail.com)</li>
          <li>✅ Check of Gmail API is enabled in Google Cloud Console</li>
          <li>⚠️ Service accounts werken alleen met domain-wide delegation (Google Workspace)</li>
        </ul>
      </div>
    </div>
  )
}


