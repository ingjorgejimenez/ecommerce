'use client'
import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {
  const { openSideMenu } = useUIStore()
  return (
    <nav className='flex items-center justify-between w-full px-5'>
      {/* Logo */}
      <div className='flex items-center'>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Ecommerce
          </span>
          <span>| Shop</span>
        </Link>
      </div>

      {/* options  menu*/}
      <div className='hidden sm:block'>
        <Link
          className='p-2 m-2 transition-all rounded-md hover:bg-gray-100'
          href='/category/men'
        >
          Hombres
        </Link>
        <Link
          className='p-2 m-2 transition-all rounded-md hover:bg-gray-100'
          href='/category/women'
        >
          Mujeres
        </Link>
        <Link
          className='p-2 m-2 transition-all rounded-md hover:bg-gray-100'
          href='/category/kid'
        >
          Niños
        </Link>
      </div>

      {/* search, Cart Menu */}
      <div className='flex items-center gap-2'>
        <Link href={'/search'}>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link href={'/cart'}>
          <div className='relative'>
            <span className='absolute px-1 text-xs font-bold text-white bg-blue-700 rounded-full -top-2 -right-2'>
              3
            </span>
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>
        <button
          className='p-2 mr-2 transition-all rounded-md hover:bg-gray-100'
          onClick={openSideMenu}
        >
          Menú
        </button>
      </div>

      {/* <div className='flex items-center'>
        <button className='px-4 py-2 text-white bg-red-500 rounded-full'>
          Login
        </button>
        <button className='px-4 py-2 text-white bg-red-500 rounded-full'>
          Sign Up
        </button>
      </div> */}
    </nav>
  )
}