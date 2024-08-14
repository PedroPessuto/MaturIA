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
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export default function Page() {

  const { toast } = useToast()
  const searchParams = useSearchParams()
  const patientId = searchParams.get('id')
  const [patient, setPatient] = useState()


  const getPatient = useCallback(async () => {
    try {
      const response = await fetch(`/api/patients/getOne/?id=${patient.patientId}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const patient = await response.json()
      return patient.result

    } catch (error) {
      toast({
        variant: 'destructive',
        description: `Erro ao buscar por paciente: ${error.message}`,
      })
    }
  }, [toast])


  useEffect(() => {
    async function fetchPatient() {
      setIsLoading(true)

      try {
        const patient = await getPatient()
        setPatient(patient)

      }
      catch (error) {
        toast({
          variant: 'destructive',
          description: `Erro ao buscar por paciente: ${error.message}`,
        })
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchPatient()
  }, [getPatient, toast])

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
              <DadosPacienteForm patientId={patientId} setPatient={setPatient} />
            </div>
            <div className="w-full">
              <AnalysisScreen patientId={patientId} patient={patient} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
