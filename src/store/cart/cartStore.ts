import { ICartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { currencyFormat } from '../../utils/currencyFormat'
import { getCurrencyByLocation } from '@/utils/location/getCurrencyByLocation'

interface State {
  cart: ICartProduct[]
  currency: string
  getTotalItems: () => number
  addProductToCart: (product: ICartProduct) => void
  updateProductQuantity: (product: ICartProduct, quantity: number) => void
  removeProduct: (product: ICartProduct) => void
  fetchCurrency: () => Promise<void>
  getSummaryProducts: () => {
    subtotal: string
    tax: string
    total: string
    itemsInCart: number
  }
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      currency: 'USD',

      // Methods

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((acc, item) => acc + item.quantity, 0)
      },

      fetchCurrency: async () => {
        try {
          const userCurrency = await getCurrencyByLocation()
          set({ currency: userCurrency })
        } catch (error) {
          console.error('Error fetching currency:', error)
        }
      },
      getSummaryProducts: () => {
        const { cart, currency } = get()
        const subtotal = cart.reduce(
          (subtotal, product) => subtotal + product.quantity * product.price,
          0,
        )
        const tax = subtotal * 0.19
        const total = subtotal + tax
        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0)

        return {
          subtotal: currencyFormat(subtotal, currency),
          tax: currencyFormat(tax, currency),
          total: currencyFormat(total, currency),
          itemsInCart,
        }
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
      removeProduct(product: ICartProduct) {
        const { cart } = get()
        const updateCardProducts = cart.filter(
          item => item.id !== product.id || item.size !== product.size,
        )
        set({
          cart: updateCardProducts,
        })
      },
    }),
    {
      name: 'ShoppingCart',
      // skipHydration: true,
    },
  ),
)
