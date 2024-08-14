'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="h-screen">
      <div className="h-full bg-gray-100">
        <section className="flex h-full flex-col items-center justify-center text-center my-auto p-4">

          <h1 className="text-6xl font-bold">
            Bem-vindo ao <span className="text-blue-600">MaturAI</span>
          </h1>

          <p className="mt-4 text-2xl">
            Software de previsão da idade óssea a partir de radiografias.
          </p>

          <Link href="/sobre" className="mt-8">
            <Button>Saiba Mais</Button>
          </Link>

        </section>


      </div>
    </main>
  )
}
