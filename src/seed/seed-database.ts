
import prisma from '../lib/prisma'


import { initialData } from "./seed";


async function main() {
  // 1. Borrar registros previos

  // await Promise.all([

  await prisma.product.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.category.deleteMany()

  // ])

  const { categories, products } = initialData

  // 2. Crear categorías


  const CapitalizeFirstLetter = (str: string) => {
    return str.at(0)?.toLocaleUpperCase() + str.slice(1)
  }

  // const categoriesData = categories.map(name => ({ name }))

  const categoriesData = categories.reduce((acc, name) => {
    // acc.push({ name })
    return [...acc, { name: CapitalizeFirstLetter(name) }]
  }, [] as { name: string }[])


  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce((acc, category) => {
    return {
      ...acc,
      [category.name.toLowerCase()]: category.id
    }
  }, {} as Record<string, string>)

  // 3. Crear productos

  // products.reduce((acc, product) => {
  //   const categoryId = categoriesMap[product.type.toLocaleLowerCase()]

  //   const { images, type, ...rest } = product

  //   return [...acc, {
  //     ...rest,
  //     categoryId
  //   }]
  // }, [])


  // const productMap = products.map((product) => {
  //   const categoryId = categoriesMap[product.type.toLowerCase()]
  //   const { images, type, ...rest } = product
  //   return {
  //     ...rest,
  //     categoryId
  //   }
  // })

  products.forEach(async (product) => {
    const categoryId = categoriesMap[product.type.toLowerCase()]
    const { images, type, ...rest } = product
    const productDB = await prisma.product.create({ data: { ...rest, categoryId } })
    const imagesData = images.map((url) => ({ url, productId: productDB.id }))
    await prisma.productImage.createMany({ data: imagesData })
  })

  // const productDb = await prisma.product.createMany({ data: productMap })


  console.log('Seed Ejecutado correctamente')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main();
})()