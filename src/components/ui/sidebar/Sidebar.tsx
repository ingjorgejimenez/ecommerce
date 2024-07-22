'use client'

import { logout } from '@/actions'
import { useUIStore } from '@/store'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5'

export const Sidebar = () => {
  const { closeSideMenu, isSideMenuOpen } = useUIStore()
  const router = useRouter()

  // Session hook not provider with server actions

  // const { status, user } = useGetSession()
  // console.log(user)

  // session hook with provider

  const { data: session } = useSession()

  return (
    <div>
      {/* Background */}

      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-30' />
      )}

      {/* Blur */}

      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 z-10 w-screen h-screen fade-in backdrop-filter backdrop-blur-sm' />
      )}

      {/* Sidemenu */}
      <nav
        // TODO: efecto de slide
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          },
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute cursor-pointer top-5 right-5'
          onClick={closeSideMenu}
        />

        {/* Input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full py-1 pl-10 pr-10 text-xl border-b-2 border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-blue-500'
          />
        </div>

        <Link
          href='/profile'
          onClick={closeSideMenu}
          className='flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100'
        >
          <IoPersonOutline size={30} />
          <span className='ml-3 text-xl'>Perfil</span>
        </Link>
        <Link
          href='/'
          className='flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100'
        >
          <IoTicketOutline size={30} />
          <span className='ml-3 text-xl'>Ordenes</span>
        </Link>
        {!session?.user && (
          <Link
            href='/auth/login'
            className='flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100'
          >
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>
        )}
        {!!session?.user && (
          <button
            className='flex items-center w-full p-2 mt-10 transition-all rounded hover:bg-gray-100'
            onClick={() => {
              // router.refresh()
              logout()
              closeSideMenu()
              window.location.replace('/')
            }}
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl'>Salir</span>
          </button>
        )}

        {/* Line Separator */}

        <div className='w-full h-px my-10 bg-gray-200' />
        {session?.user.role === 'admin' && (
          <>
            <Link
              href='/'
              className='flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100'
            >
              <IoShirtOutline size={30} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>

            <Link
              href='/'
              className='flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>

            <Link
              href='/'
              className='flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100'
            >
              <IoPeopleOutline size={30} />
              <span className='ml-3 text-xl'>User</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}
