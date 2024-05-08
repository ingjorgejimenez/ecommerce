import { ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'
// import { notFound } from 'next/navigation'

interface PropsPage {
  params: {
    id: Category
  }
}
export default function CategoryPage({ params }: Readonly<PropsPage>) {
  const { id } = params

  const products = initialData.products.filter(product => product.gender === id)

  const labels: Record<Category, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para todos',
  }
  // if (id != 'kid' || id != 'women' || id != 'men') {
  //   notFound()
  // }

  return (
    <div>
      <Title
        title={`Artículos de ${labels[id]}`}
        subtitle='Todos los productos'
        className='mb-2'
      />
      <ProductGrid products={products} />
    </div>
  )
}
