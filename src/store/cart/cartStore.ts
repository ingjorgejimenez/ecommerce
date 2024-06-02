import { ICartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: ICartProduct[]
  getTotalItems: () => number
  addProductToCart: (product: ICartProduct) => void
  updateProductQuantity: (product: ICartProduct, quantity: number) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((acc, item) => acc + item.quantity, 0)
      },

      addProductToCart: (product: ICartProduct) => {
        const { cart } = get()

        // 1. revisar si el producto exists con la talla seleccionada
        const productInCart = cart.some(
          item => item.id === product.id && item.size === product.size,
        )
        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }
        // 2. si existe revisar si la talla existe

        const productSize = cart.map(item => {
          if (item.size === product.size && item.id === product.id) {
            return { ...item, quantity: item.quantity + product.quantity }
          }
          return item
        })
        set({ cart: productSize })
      },
      updateProductQuantity(product: ICartProduct, quantity: number) {
        const { cart } = get()
        const productSizeChanged = cart.map(item => {
          if (item.size === product.size && item.id === product.id) {
            return { ...item, quantity }
          }
          return item
        })
        set({ cart: productSizeChanged })
      },
    }),
    {
      name: 'ShoppingCart',
      // skipHydration: true,
    },
  ),
)
