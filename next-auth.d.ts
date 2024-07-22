import { IUser } from '@/interfaces'
import { DefaultSession } from 'next-auth'
import type { AdapterUser } from './adapters.js'
import { JWT } from 'next-auth/jwt'

interface User extends DefaultSession['user'], IUser {}

declare module 'next-auth' {
  // interface User extends UserI {}

  interface Session {
    user: User
  }
}

// declare module 'next-auth/jwt' {
//   interface User extends UserI {}
//   interface JWT {
//     data: User
//   }
// }
