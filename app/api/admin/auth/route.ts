export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    if (!password) {
      return new Response(
        JSON.stringify({ error: "Wachtwoord is verplicht" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    // Get admin password from environment variable
    // Default to "admin123" if not set (change this in production!)
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Ongeldig wachtwoord" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
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

