'use client'
import { H1 } from '@/components/custom/typo/H1'
import { Button } from '@/components/ui/button'
import { Small } from '@/components/custom/typo/Small'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='flex w-full fixed z-50 bg-white items-center justify-between p-4 md:py-4 md:px-12 shadow-sm'>
      <Link href='/'>
        <H1>MaturAI</H1>
      </Link>

      <div className='hidden md:flex gap-4'>
        <Link href='/'>
          <Button className='gap-4 items-center justify-center' variant='secondary' onClick={() => { toggleMenu() }}>
            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 576 512' height='1rem' width='1rem' xmlns='http://www.w3.org/2000/svg'><path d='M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z'></path></svg>
            <Small>Home</Small>
          </Button>
        </Link>

        <Link href='/sobre'>
          <Button className='gap-4 items-center justify-center' variant='secondary' onClick={() => { toggleMenu() }}>
            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1rem' width='1rem' xmlns='http://www.w3.org/2000/svg'><path d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z'></path></svg>
            <Small>Sobre</Small>
          </Button>
        </Link>
        {
          session && <Link href='/pacientes'>
            <Button className='gap-4 items-center justify-center' variant='secondary' onClick={() => { toggleMenu() }}>
              <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1rem' width='1rem' xmlns='http://www.w3.org/2000/svg'><circle cx='152' cy='184' r='72'></circle><path d='M234 296c-28.16-14.3-59.24-20-82-20-44.58 0-136 27.34-136 82v42h150v-16.07c0-19 8-38.05 22-53.93 11.17-12.68 26.81-24.45 46-34z'></path><path d='M340 288c-52.07 0-156 32.16-156 96v48h312v-48c0-63.84-103.93-96-156-96z'></path><circle cx='340' cy='168' r='88'></circle></svg>
              <Small>Pacientes</Small>
            </Button>
          </Link>
        }

      </div>

      {
        session ?
          <Button className='hidden md:flex gap-4 items-center justify-center' onClick={() => { signOut(); toggleMenu() }}>
            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1rem' width='1rem' xmlns='http://www.w3.org/2000/svg'><path d='M336 376V272H191a16 16 0 0 1 0-32h145V136a56.06 56.06 0 0 0-56-56H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h192a56.06 56.06 0 0 0 56-56zm89.37-104-52.68 52.69a16 16 0 0 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62l-80-80a16 16 0 0 0-22.62 22.62L425.37 240H336v32z'></path></svg>
            <Small>Sair</Small>
          </Button>
          :
          <Link href='/login'>
            <Button className='hidden md:flex gap-4 items-center justify-center' onClick={() => { toggleMenu() }}>
              <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1rem' width='1rem' xmlns='http://www.w3.org/2000/svg'><path d='M336 376V272H191a16 16 0 0 1 0-32h145V136a56.06 56.06 0 0 0-56-56H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h192a56.06 56.06 0 0 0 56-56zm89.37-104-52.68 52.69a16 16 0 0 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62l-80-80a16 16 0 0 0-22.62 22.62L425.37 240H336v32z'></path></svg>
              <Small>Entrar</Small>
            </Button>
          </Link>
      }


    </header>
  )
}
