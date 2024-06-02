'use client'
import { QuantitySelector, SizeSelector } from '@/components'
import { ICartProduct, IProduct, Size } from '@/interfaces'
import { useCartStore } from '@/store'
import { stat } from 'fs'
import { useState } from 'react'

interface Props {
  product: IProduct
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)
  const { addProductToCart } = useCartStore()

  const addToCart = () => {
    if (!size) return setPosted(true)
    // console.log({ size, quantity, product })
    const cartProduct: ICartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    }
    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }
  return (
    <>
      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {posted && !size && (
        <span className='mb-4 text-red-500 fade-in'>
          Debes seleccionar una talla*
        </span>
      )}
      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
        stock={product.inStock}
      />
      {/* Button */}
      <button onClick={addToCart} className='my-5 btn-primary'>
        Agregar al carrito
      </button>
    </>
  )
}
