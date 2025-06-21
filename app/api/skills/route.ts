import { PrismaClient } from '@prisma/client'
import { formattingResponse } from '@/lib/utils'

const prisma = new PrismaClient()


export async function GET() {
  try {

    return new Response(JSON.stringify(formattingResponse(await prisma.skill.findMany())), {
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
