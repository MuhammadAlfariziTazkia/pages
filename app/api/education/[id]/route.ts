import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const education = await queryOne("SELECT * FROM education WHERE id = $1", [params.id])

    if (!education) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }

    return NextResponse.json(education)
  } catch (error) {
    console.error("Error fetching education:", error)
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 })
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
    const requiredFields = ["institution_name", "degree_en", "degree_ja", "period"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Check if education exists
    const exists = await queryOne("SELECT id FROM education WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }

    const result = await query(
      `
      UPDATE education SET
        institution_name = $1,
        degree_en = $2,
        degree_ja = $3,
        period = $4,
        gpa = $5,
        description_en = $6,
        description_ja = $7,
        certificate_url = $8,
        transcript_url = $9,
        icon = $10,
        sort_order = $11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *
    `,
      [
        data.institution_name,
        data.degree_en,
        data.degree_ja,
        data.period,
        data.gpa || null,
        data.description_en || null,
        data.description_ja || null,
        data.certificate_url || null,
        data.transcript_url || null,
        data.icon || null,
        data.sort_order || 0,
        params.id,
      ],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating education:", error)
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if education exists
    const exists = await queryOne("SELECT id FROM education WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }

    await query("DELETE FROM education WHERE id = $1", [params.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting education:", error)
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 })
  }
}
