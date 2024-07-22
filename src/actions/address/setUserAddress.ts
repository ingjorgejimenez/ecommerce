'use server'
import { IAddress } from '@/interfaces'
import prisma from '@/lib/prisma'

interface INewData {
  userId: string
  address: string
  address2: string | undefined
  postalCode: string
  firstName: string
  countryId: string
  lastName: string
  phone: string
}

export const setUserAddress = async (address: IAddress, userId: string) => {
  try {
    const saveAddress = await createOrReplaceAddress(address, userId)
    return {
      ok: true,
      address: saveAddress,
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: error,
    }
  }
  return {}
}

const createOrReplaceAddress = async (address: IAddress, userId: string) => {
  const { country, address2, ...rest } = address
  const newAddress = { userId, ...rest, countryId: country, address2 }

  try {
    // para buscar un elemento puede ser findFirst o findUnique
    const storeAddress = await prisma.userAddress.findFirst({
      where: { userId },
    })
    if (!storeAddress) {
      const addressData = await prisma.userAddress.create({ data: newAddress })
      return addressData
    } else {
      const addressData = await prisma.userAddress.update({
        where: { userId },
        data: newAddress,
      })
      return addressData
    }
  } catch (error) {
    console.error(error)
    throw new Error('No se puedo grabar la dirección')
  }
  return {}
}
