import { supabase } from "@/lib/supabaseServer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { date, reason } = body

    if (!date) {
      return NextResponse.json(
        { error: "Date is required" },
        { status: 400 }
      )
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      )
    }

    // Check if date is already blocked
    const { data: existing } = await supabase
      .from("blocked_dates")
      .select("id")
      .eq("date", date)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "Date is already blocked" },
        { status: 409 }
      )
    }

    // Insert blocked date
    const { data, error } = await supabase
      .from("blocked_dates")
      .insert([{ date, reason: reason || null }])
      .select()
      .single()

    if (error) {
      console.error("Error blocking date:", error)
      return NextResponse.json(
        { error: "Failed to block date" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Block date error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json(
        { error: "Date is required" },
        { status: 400 }
      )
    }

    // Delete blocked date
    const { error } = await supabase
      .from("blocked_dates")
      .delete()
      .eq("date", date)

    if (error) {
      console.error("Error unblocking date:", error)
      return NextResponse.json(
        { error: "Failed to unblock date" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Unblock date error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from("blocked_dates")
      .select("*")
      .order("date", { ascending: true })

    if (error) {
      console.error("Error fetching blocked dates:", error)
      return NextResponse.json(
        { error: "Failed to fetch blocked dates" },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error("Get blocked dates error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

