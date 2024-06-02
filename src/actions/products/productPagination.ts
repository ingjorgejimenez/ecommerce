'use server'

import { Category } from "@/interfaces"
import prisma from "@/lib/prisma"

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Category
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: { ProductImage: { take: 2, select: { url: true } }, category: {} },
      where: gender ? { gender } : undefined
    })
    const productsMap = products.map(product => {
      const { categoryId, ProductImage, category, ...rest } = product
      return {
        ...rest,
        images: ProductImage.map((image) => image.url),
        type: category.name.toLowerCase()
      }
    })

    // 2. Obtener el total de paginas
    const totalCount = await prisma.product.count({ where: gender ? { gender } : undefined })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      products: productsMap
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}