import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await queryOne("SELECT * FROM projects WHERE id = $1", [params.id])

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
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
    const requiredFields = ["title", "role_en", "role_ja", "description_en", "description_ja"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Check if project exists
    const exists = await queryOne("SELECT id FROM projects WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const result = await query(
      `
      UPDATE projects SET
        title = $1,
        role_en = $2,
        role_ja = $3,
        description_en = $4,
        description_ja = $5,
        project_url = $6,
        is_public = $7,
        sort_order = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `,
      [
        data.title,
        data.role_en,
        data.role_ja,
        data.description_en,
        data.description_ja,
        data.project_url || null,
        data.is_public !== undefined ? data.is_public : true,
        data.sort_order || 0,
        params.id,
      ],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if project exists
    const exists = await queryOne("SELECT id FROM projects WHERE id = $1", [params.id])

    if (!exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    await query("DELETE FROM projects WHERE id = $1", [params.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
