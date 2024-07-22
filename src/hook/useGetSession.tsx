'use client'

import { useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { authSession } from '@/actions/auth/authSession'
type Status = 'authenticated' | 'loading' | 'unauthenticated'

export const useGetSession = () => {
  const [data, setData] = useState<Session | null>()
  const [status, setStatus] = useState<Status>('loading')
  const getData = async () => {
    try {
      setStatus('loading')
      const { session } = await authSession()
      if (!!session?.user) {
        setStatus('authenticated')
      } else {
        setStatus('unauthenticated')
      }
      setData(session)
    } catch (error) {
      console.error(error)
      setStatus('unauthenticated')
      throw error
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { ...data, status }
}
