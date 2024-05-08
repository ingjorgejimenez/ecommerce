import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex justify-center text-xs mb-10'>
      <Link href='/'>
        <span className={`${titleFont.className} antialiased font-bold`}>
          Ecommerce
        </span>
        <span>| shop</span>
        <span>©{new Date().getFullYear()}</span>
      </Link>
      <Link href='/' className='mx-3'>
        Ubicaciones
      </Link>
    </div>
  )
}
