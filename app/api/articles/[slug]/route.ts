import { type NextRequest, NextResponse } from "next/server"
import { formattingResponse } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    })
    if (!article) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    return new Response(JSON.stringify(formattingResponse(article)), {
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
