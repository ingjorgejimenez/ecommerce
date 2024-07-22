'use server'

import { auth } from '@/auth/auth.config'
import { IAddress } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getUserAddress = async (): Promise<IAddress | null> => {
  const session = await auth()
  try {
    const userAddress = await prisma.userAddress.findFirst({
      where: { userId: session?.user.id },
    })
    if (!userAddress) return null
    const { countryId, address2, ...rest } = userAddress
    return { ...rest, country: countryId, address2: address2 ?? '' }
  } catch (error) {
    console.error(error)
    throw new Error('Not address found')
  }
}
