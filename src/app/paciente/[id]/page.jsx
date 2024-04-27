'use client'
import { CadastroDePacienteForms } from '@/components/custom/forms/CadastroDePacienteForm'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function Page() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await fetch('/api/')
        // const jsonData = await response.json()
        // setData(jsonData.result)
        setData(
          {
            id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
            nome: 'Pedro Bandeira Fenomeno',
            peso: '80.5',
            altura: '175',
            sexoBiologico: 'Masculino',
            dia: '30',
            mes: '7',
            ano: '2004'
          },
        )
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-full flex ">
        {isLoading && <div className='flex w-full justify-center'>
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
        }
        <div className='flex w-full gap-80 '>
          <div className='w-1/2'>
            {!isLoading && <CadastroDePacienteForms paciente={data} />}
          </div>
          <div className='w-1/2'>
          </div>

        </div>

      </div>
    </main>
  )
}
