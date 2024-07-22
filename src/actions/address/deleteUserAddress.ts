'use server'
import prisma from '@/lib/prisma'

export const deleteUserAddress = async (userId: string) => {
  try {
    const addressDelete = await prisma.userAddress.delete({ where: { userId } })
    return {
      ok: true,
      addressDeleted: addressDelete,
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: error,
    }
  }
}
