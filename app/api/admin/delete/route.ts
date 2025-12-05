import { supabase } from "@/lib/supabaseServer"

export async function POST(req: Request) {
  try {
    const { id } = await req.json()
    console.log("🗑️ DELETE API called for appointment:", id)
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing id" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    }

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("❌ Delete error:", error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    console.log("✅ Appointment deleted successfully:", id)
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("❌ Delete error:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

