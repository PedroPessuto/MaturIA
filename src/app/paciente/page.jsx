'use client'

import { DadosPacienteForm } from '@/components/custom/forms/DadosPacienteForm'
import { AnalysisScreen } from './components/AnalysisScreen'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  
  const searchParams = useSearchParams()
  const patientId = searchParams.get('id')
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-full p-12 mt-12">
          <div className='flex flex-col gap-8 '>
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
                <DadosPacienteForm patientId={patientId} />
              </div>
              <div className="w-full">
                <AnalysisScreen patientId={patientId} />
              </div>
            </div>
          </div>
      </div>
    </main>
  )
}

