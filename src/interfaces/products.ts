export interface IProduct {
  id: string
  title: string
  description: string
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  gender: Category
  images: string[]
  // type: Type;
}

export interface ICartProduct {
  id: string
  slug: string
  title: string
  price: number
  quantity: number
  size: Size
  image: string
}
export interface IUser {
  id: string
  name: string
  email: string
  emailVerified: Date | null
  role: 'admin' | 'user'
  image?: string | null
}

export type Category = 'men' | 'women' | 'kid' | 'unisex'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'
