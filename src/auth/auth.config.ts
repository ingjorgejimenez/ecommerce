import prisma from '@/lib/prisma'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { IUser } from '@/interfaces'

const providers = [
  GitHub,
  Google,
  Credentials({
    name: 'Credentials',
    async authorize(credentials): Promise<IUser | null> {
      try {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)
        if (!parsedCredentials.success) return null
        const { email, password } = parsedCredentials.data
        // buscar correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })
        if (!user) return null
        // Comparar contraseña
        if (!bcryptjs.compareSync(password, user.password)) return null
        // Regresar el usuario sin el password
        const { password: _, ...rest } = user
        return rest
      } catch (error) {
        return null
      }
    },
  }),
]

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
    signOut: '/auth/login',
    error: '/auth/login',
    verifyRequest: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //no sirve
      console.log({ auth })
      // const isLoggedIn = !!auth?.user
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true
      //   return false // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl))
      // }
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.data = user
      }
      return token
    },

    async session({ session, token }) {
      console.log(session.user)
      if (token) {
        session.user = token.data as any
      }
      return session
    },
  },
  providers,
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
