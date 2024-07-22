import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'
import { auth } from '@/auth/auth.config'
import { redirect } from 'next/navigation'
import { Provider } from '@/components'

export const metadata: Metadata = {
  title: {
    template: '%s - Ecommerce | Shop ',
    default: 'Home - Ecommerce | Shop ',
  },
  description: 'Una tienda virtual de productos',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
