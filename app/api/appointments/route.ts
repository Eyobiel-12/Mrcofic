import { supabase } from "@/lib/supabaseServer"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")

    if (!date) {
      return new Response(
        JSON.stringify({ error: "date parameter required" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("date", date)
      .order("time", { ascending: true })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify(data || []),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

