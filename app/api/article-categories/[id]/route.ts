import { type NextRequest, NextResponse } from "next/server"
import { formattingResponse } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: bigint } }) {
  const id = params.id
  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  try {
    const category = await prisma.articleCategory.findUnique({
      where: { id },
    })

    if (!category) {
      return new Response(JSON.stringify({ error: 'category not found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    return new Response(JSON.stringify(formattingResponse(category)), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch article' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}
