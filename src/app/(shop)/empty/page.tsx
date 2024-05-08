import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default function Empty() {
  return (
    <div className='flex justify-center items-center h-[800px]'>
      <IoCartOutline size={80} className='mx-5' />
      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-semibold'>Tu carrito esta vació</h1>
        <Link href={'/'} className='underline text-blue-500 text-4xl'>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
