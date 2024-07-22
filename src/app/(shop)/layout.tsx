// export const dynamic = 'force-dynamic' //forzar o quitar cache para que revalide cada vez que se entre la data
// export const revalidate = 0

import { Footer, Sidebar, TopMenu } from '@/components'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <TopMenu />
      <Sidebar />
      <main className='px-4 md:px-8 flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
