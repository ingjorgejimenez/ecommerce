'use server'
import prisma from '@/lib/prisma'
import { sleep } from '@/utils'

export const getStockBySlug = async (slug: string) => {
  try {
    // await sleep(2) //esperar 2 segundos
    const stock = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug,
      },
    })
    return stock?.inStock ?? 0
  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener el stock por el slug')
  }
}
