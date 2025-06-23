import { formattingResponse } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('category_id')
  console.log(categoryId)
  try {
    // Tanpa filter jika category_id tidak ada
    const articles = categoryId
      ? await prisma.article.findMany({
          where: {
            "category_id": BigInt(categoryId),
          },
        })
      : await prisma.article.findMany()

    return new Response(JSON.stringify(formattingResponse(articles)), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch articles' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}
