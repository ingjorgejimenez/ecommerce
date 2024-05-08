import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  Title,
} from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface PropsPage {
  params: {
    slug: string
  }
}
export default function ProductPage({ params }: Readonly<PropsPage>) {
  const { slug } = params
  const product = initialData.products.find(p => p.slug === slug)

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
          <p className='mb-5 text-lg'>${product.price}</p>

          {/* Selector de tallas */}
          <SizeSelector selectedSize={'XS'} availableSizes={product.sizes} />

          {/* Selector de Cantidad */}
          <QuantitySelector quantity={2} />

          {/* Button */}
          <button className='my-5 btn-primary'>Agregar al carrito</button>

          {/* Descripción */}
          <h3 className='text-sm font-bold'>Descripción</h3>
          <p className='font-light'>{product.description}</p>
        </div>
      </div>
    </>
  )
}
