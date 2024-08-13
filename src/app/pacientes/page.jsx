'use client'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import PacientesTable from './components/PatientsTable'

export default function Page() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/ver-pacientes')
        const jsonData = await response.json()
        setData(jsonData.result)
      } catch (error) {
        console.error('Erro ao buscar os dados:', error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-full flex flex-col gap-4 p-12 mt-12">

        {isLoading && <div className='flex w-full justify-center'>
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
        }

        {!isLoading && <>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pacientes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <PacientesTable data={data} />
        </>}
      </div>
    </main>
  )
}
