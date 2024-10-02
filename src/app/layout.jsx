import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { Toaster } from '@/components/ui/toaster'
import NextAuthProvider from '@/components/custom/providers/NextAuthProvider'
import { Header } from '@/components/custom/sections/Header'
import { Footer } from '@/components/custom/sections/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MaturIA',
  description: 'Software de previsão da idade óssea a partir de radiografias',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession()

  return (
    <html lang='pt-BR'>
      <body className={`${inter.className} overflow-x-hidden`}>
        <NextAuthProvider session={session}>
          <Toaster />
            <Header />
            {children}
            <Footer />
        </NextAuthProvider>
      </body>
    </html>
  )
}