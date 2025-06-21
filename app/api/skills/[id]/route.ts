import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const skill = await queryOne("SELECT * FROM skills WHERE id = $1", [params.id])

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json(skill)
  } catch (error) {
    console.error("Error fetching skill:", error)
    return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    // Check if skill exists
    const exists = await queryOne("SELECT id FROM skills WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    const result = await query(
      `
      UPDATE skills SET
        name = $1,
        icon = $2,
        color = $3,
        sort_order = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `,
      [data.name, data.icon || null, data.color || null, data.sort_order || 0, params.id],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating skill:", error)
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if skill exists
    const exists = await queryOne("SELECT id FROM skills WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    await query("DELETE FROM skills WHERE id = $1", [params.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting skill:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
