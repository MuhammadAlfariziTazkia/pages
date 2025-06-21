import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const workExperience = await queryOne("SELECT * FROM work_experiences WHERE id = $1", [params.id])

    if (!workExperience) {
      return NextResponse.json({ error: "Work experience not found" }, { status: 404 })
    }

    return NextResponse.json(workExperience)
  } catch (error) {
    console.error("Error fetching work experience:", error)
    return NextResponse.json({ error: "Failed to fetch work experience" }, { status: 500 })
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
    const requiredFields = ["company", "position_en", "position_ja", "period", "type_en", "type_ja"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Check if work experience exists
    const exists = await queryOne("SELECT id FROM work_experiences WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Work experience not found" }, { status: 404 })
    }

    const result = await query(
      `
      UPDATE work_experiences SET
        company = $1,
        position_en = $2,
        position_ja = $3,
        period = $4,
        type_en = $5,
        type_ja = $6,
        logo_url = $7,
        description_en = $8,
        description_ja = $9,
        key_achievements_en = $10,
        key_achievements_ja = $11,
        full_description_en = $12,
        full_description_ja = $13,
        detailed_achievements_en = $14,
        detailed_achievements_ja = $15,
        sort_order = $16,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $17
      RETURNING *
    `,
      [
        data.company,
        data.position_en,
        data.position_ja,
        data.period,
        data.type_en,
        data.type_ja,
        data.logo_url || null,
        data.description_en || null,
        data.description_ja || null,
        data.key_achievements_en || [],
        data.key_achievements_ja || [],
        data.full_description_en || null,
        data.full_description_ja || null,
        data.detailed_achievements_en || [],
        data.detailed_achievements_ja || [],
        data.sort_order || 0,
        params.id,
      ],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating work experience:", error)
    return NextResponse.json({ error: "Failed to update work experience" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if work experience exists
    const exists = await queryOne("SELECT id FROM work_experiences WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Work experience not found" }, { status: 404 })
    }

    await query("DELETE FROM work_experiences WHERE id = $1", [params.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting work experience:", error)
    return NextResponse.json({ error: "Failed to delete work experience" }, { status: 500 })
  }
}
