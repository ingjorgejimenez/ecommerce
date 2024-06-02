'use client'

import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  stock: number
  slug: string
}

export const StockLabel = ({ stock, slug }: Props) => {
  const [stockResponse, setStockResponse] = useState(stock)
  const [loading, setLoading] = useState(false)
  const getStock = async () => {
    try {
      setLoading(true)
      const stockData = await getStockBySlug(slug)
      setStockResponse(stockData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStock()
  }, [])

  return loading ? (
    <h3
      className={` ${titleFont.className} antialiased font-bold text-xl animate-pulse bg-gray-200`}
    >
      &nbsp;&nbsp;
    </h3>
  ) : (
    <h3 className={` ${titleFont.className} antialiased font-bold text-xl`}>
      Stock: {stockResponse}
    </h3>
  )
}
