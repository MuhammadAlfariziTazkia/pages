import { formattingResponse } from '@/lib/utils';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    return new Response(JSON.stringify(formattingResponse(await prisma.articleCategory.findMany())), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}
