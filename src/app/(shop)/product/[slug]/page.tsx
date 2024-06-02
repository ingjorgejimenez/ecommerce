export const revalidate = 60 // 60seconds

import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
  Title,
} from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/actions'
import { Metadata, ResolvingMetadata } from 'next'
import { AddToCart } from './ui/AddToCart'

interface PropsPage {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: PropsPage,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  return {
    title: product?.title ?? '',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? '',
      description: product?.description ?? '',
      images: [`/product/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({ params }: Readonly<PropsPage>) {
  const { slug } = params
  const product = await getProductBySlug(slug)
  // const product = initialData.products.find(p => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Title
        title={`Artículos de ${slug}`}
        subtitle='Todos los productos'
        className='mb-2'
      />
      <div className='grid gap-3 mt-5 mb-20 md:grid-cols-3'>
        {/* Slideshow */}
        <div className='col-span-1 md:col-span-2'>
          {/* Slideshow */}
          <div className='col-span-1 md:col-span-2 '>
            {/* Mobile Slideshow */}
            <ProductMobileSlideshow
              title={product.title}
              images={product.images}
              className='block md:hidden'
            />

            {/* Desktop Slideshow */}
            <ProductSlideshow
              title={product.title}
              images={product.images}
              className='hidden md:block'
            />
          </div>
        </div>

        {/* Detalles */}
        <div className='col-span-1 px-5'>
          <h1
            className={` ${titleFont.className} antialiased font-bold text-xl`}
          >
            {product.title}
          </h1>
          <StockLabel stock={product.inStock} slug={product.slug} />
          <p className='mb-5 text-lg'>${product.price}</p>

          <AddToCart product={product} />
          {/* Descripción */}
          <h3 className='text-sm font-bold'>Descripción</h3>
          <p className='font-light'>{product.description}</p>
        </div>
      </div>
    </>
  )
}
