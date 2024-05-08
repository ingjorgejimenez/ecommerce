import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'

const products = initialData.products

export default function Home() {
  return (
    <div className=''>
      <Title className='mb-2' title={'Tienda'} subtitle='Todos los productos' />
      <ProductGrid products={products} />
    </div>
  )
}
