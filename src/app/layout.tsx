import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Ecommerce | Shop ',
    default: 'Home - Ecommerce | Shop ',
  },
  description: 'Una tienda virtual de productos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
