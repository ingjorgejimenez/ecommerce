'use client'
import { useCartStore } from '@/store'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { getSummaryProducts, fetchCurrency } = useCartStore()
  const { itemsInCart, subtotal, tax, total } = getSummaryProducts()
  const [data, setData] = useState<any>()

  useEffect(() => {
    const geData = async () => {
      await fetchCurrency()
      setLoaded(true)
    }
    geData()
  }, [])
  console.log({ data })
  if (!loaded) {
    return <span>Loading...</span>
  }
  if (itemsInCart === 0) {
    redirect('/empty')
  }
  return (
    <>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
        <span>No. Productos</span>
        <span className='text-right'>{itemsInCart}</span>
        <span>Subtotal</span>
        <span className='text-right'>{subtotal}</span>
        <span>Impuestos (19%)</span>
        <span className='text-right'>{tax}</span>
        <span className='mt-5 text-2xl'>Total:</span>
        <span className='mt-5 text-2xl text-right'>{total}</span>
      </div>
    </>
  )
}
