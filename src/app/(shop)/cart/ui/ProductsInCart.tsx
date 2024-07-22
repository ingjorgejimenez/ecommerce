'use client'

import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ProductsInCart = () => {
  const { updateProductQuantity, removeProduct } = useCartStore()
  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartStore(state => state.cart)
  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <span>Loading...</span>
  }

  return (
    <>
      {productsInCart.map(product => (
        <div key={`${product.slug}-${product.size}`} className='flex'>
          <Link href={`/product/${product.slug}`}>
            <Image
              src={`/products/${product.image}`}
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
            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
              <span className='text-xl'>{product.title}</span>
            </Link>
            <span className="text-xl">{`Size: ${product.size}`}</span>
            <span className='text-xl'>${product.price}</span>
            <QuantitySelector quantity={product.quantity} onQuantityChanged={(value) => {
              updateProductQuantity(product, value)
            }} />
            <button onClick={() => { removeProduct(product) }} className='underline mt-3'>Remover</button>
          </div>
        </div>
      ))}
    </>
  )
}
