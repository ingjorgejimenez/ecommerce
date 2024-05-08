import { QuantitySelector, Title } from '@/components'
import Link from 'next/link'
import { initialData } from '../../../seed/seed'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const productsInCart = [initialData.products[0], initialData.products[1]]

export default function CartPage() {
  if (!productsInCart?.length) {
    redirect('/empty')
  }
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Agregar más items</span>
            <Link href={'/'} className='underline mb-5'>
              Continúa comprando
            </Link>

            {/* items */}
            {productsInCart.map(product => (
              <div key={product.slug} className='flex'>
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                    alt={product.title}
                    className='rounded mr-5'
                  />
                </Link>
                <div className='flex flex-col'>
                  <Link href={`/product/${product.slug}`}>
                    <span className='text-xl'>{product.title}</span>
                  </Link>
                  <span className='text-xl'>${product.price}</span>
                  <QuantitySelector quantity={3} />
                  <button className='underline mt-3'>Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* checkout - Resumen de orden */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'> Resumen de orden</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
              <span>No. Productos</span>
              <span className='text-right'>3 artículos</span>
              <span>Subtotal</span>
              <span className='text-right'>$100</span>
              <span>Impuestos (19%)</span>
              <span className='text-right'>$19</span>
              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>$119</span>
            </div>
            <div className='mt-5 mb-2 w-full'>
              <Link
                href={'/checkout/address'}
                className='flex btn-primary justify-center'
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
