export const revalidate = 60 // 60seconds

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'
// import { notFound } from 'next/navigation'

interface PropsPage {
  params: {
    gender: Category
  }
  searchParams: {
    page?: string
  }
}
export default async function CategoryPage({
  params,
  searchParams,
}: Readonly<PropsPage>) {
  const { gender } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender })

  // const products = initialData.products.filter(
  //   product => product.gender === gender,
  // )

  const labels: Record<Category, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para todos',
  }

  return (
    <div>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subtitle='Todos los productos'
        className='mb-2'
      />
      <ProductGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
