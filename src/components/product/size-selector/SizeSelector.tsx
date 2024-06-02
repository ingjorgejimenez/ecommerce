'use client'
import { Size } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  selectedSize?: Size
  availableSizes: Size[] // ['SX', 'M', 'XL', 'XXL']
  onSizeChanged: (size: Size) => void
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className='mt-5'>
      <h3 className='mb-4 font-bold'>Tallas disponibles</h3>

      <div className='flex'>
        {availableSizes?.map(size => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx('mx-2 hover:underline text-lg', {
              ' underline': size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
