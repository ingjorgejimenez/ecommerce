'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  stock?: number
  quantity: number
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({
  quantity,
  stock,
  onQuantityChanged,
}: Props) => {
  // const [count, setCount] = useState(quantity)

  const onValueChanged = (value: number) => {
    if (quantity + value < 1 || (stock && quantity + value > stock)) return
    onQuantityChanged(quantity + value);
  }

  return (
    <div className='flex mt-5'>
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className='w-20 px-5 mx-3 text-center bg-gray-100 rounded'>
        {quantity}
      </span>

      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
