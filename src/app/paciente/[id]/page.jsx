'use client'

import { Loader2 } from 'lucide-react'
import { DadosPacienteForm } from '@/components/custom/forms/DadosPacienteForm'
import { AnalysisScreen } from '@/components/custom/sections/AnalysisScreen'
import { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'


export default function Page() {
  const [data, setData] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      try {
        setData({
          id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
          nome: 'Pedro Bandeira Fenomeno',
          peso: '80.5',
          altura: '175',
          sexoBiologico: 'Masculino',
          dia: '30',
          mes: '7',
          ano: '2004',
          analisesId: [],
        })
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error)
      }
      setIsLoading(false)
    }

    async function getAnalysis() {
      setIsLoading(true)
      try {
        setAnalysis([
          {
            id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
            createdAt: '2024-05-04T00:00:00.000Z',
            imageBase64: '',
            iaDia: '23',
            iaMes: '1',
            iaAno: '71',
            manualDia: '10',
            manualMes: '4',
            manualAno: '70',
          },
        ])
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error)
      }
      setIsLoading(false)
    }

    getData()
    getAnalysis()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24">
      <div className="w-full h-full">
        {isLoading && (
          <div className="flex w-full justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        )}


        {!isLoading &&
          <div className='flex flex-col gap-8'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/pacientes">Pacientes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Informações do Paciente</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex w-full gap-5 md:gap-20 flex-col lg:flex-row">
              <div className="w-full">
                {!isLoading && <DadosPacienteForm paciente={data} />}
              </div>
              <div className="w-full">
                {!isLoading && <AnalysisScreen analysis={analysis} />}
              </div>
            </div>
          </div>
        }



      </div>
    </main>
  )
}

