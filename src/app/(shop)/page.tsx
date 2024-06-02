export const revalidate = 60 // 60seconds

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'

// const products = initialData.products
interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page })

  if (!products.length) {
    return <div>No hay productos</div>
  }
  return (
    <div className=''>
      <Title className='mb-2' title={'Tienda'} subtitle='Todos los productos' />
      <ProductGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
