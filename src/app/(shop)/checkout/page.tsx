import { QuantitySelector, Title } from '@/components'
import Link from 'next/link'
import { initialData } from '../../../seed/seed'
import Image from 'next/image'

const productsInCart = [initialData.products[0], initialData.products[1]]

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar Orden' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar Elementos</span>
            <Link href={'/cart'} className='underline mb-5'>
              Editar carrito
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
                  <span className='text-xl'>${product.price} x 3</span>
                  <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                  {/* <QuantitySelector quantity={3} /> */}
                  <button className='underline mt-3'>Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* checkout - Resumen de orden */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>Jorge Jimenez</p>
              <p>Av.San Francisco 123</p>
              <p>Col. Centro</p>
              <p>Edificio centro aventura</p>
              <p>Ciudad Colombia</p>
              <p>CP 1212</p>
              <p>C12.12.12</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

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
              <p className='mb-5'>
                {/* Disclaimer */}
                <span className='text-xs'>
                  Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros
                  <a href='#' className='underline'>
                    términos y condiciones
                  </a>
                  y
                  <a href='#' className='underline'>
                    políticas de privacidad
                  </a>
                </span>
              </p>
              <Link
                href={'/orders/123'}
                className='flex btn-primary justify-center'
              >
                Color orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
