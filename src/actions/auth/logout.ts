'use server'

import { signOut } from '@/auth/auth.config'

export const logout = async () => {
  try {
    await signOut()
  } catch (error) {
    console.error(error)
  }
}
