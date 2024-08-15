'use client'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/custom/typo/H2'
import { Large } from '@/components/custom/typo/Large'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Small } from '@/components/custom/typo/Small'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { NewAnalysis } from './NewAnalysis'
import { useCallback, useEffect, useState } from 'react'
import { ManualAnalysis } from './ManualAnalysis'
import { useToast } from '@/components/ui/use-toast'

export function AnalysisScreen({ patient }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState([])
  const [selectedAnalysis, setSelectedAnalysis] = useState()

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp))
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const formatAge = (timestamp) => {
    const now = new Date()
    const date = new Date(parseInt(timestamp))
    let years = now.getFullYear() - date.getFullYear()
    let months = now.getMonth() - date.getMonth()

    if (months < 0) {
      years--
      months += 12
    }

    return `${years} anos e ${months} meses`
  }

  const [showModal, setShowModal] = useState(false)
  const toogleModal = () => {
    setShowModal(!showModal)
  }

  const [showManualModal, setShowManualModal] = useState(false)
  const toogleManualModal = () => {
    setShowManualModal(!showManualModal)
  }

  const [showIaModal, setShowIaModal] = useState(false)
  const toogleIaModal = () => {
    setShowIaModal(!showIaModal)
  }

  const getAnalysis = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/analysis/get/?id=${patient.id}`, {
        method: 'GET',
        cache: 'no-store',
      })
      const analysis = await response.json()
      setAnalysis(analysis.result)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: `Erro ao buscar por paciente: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }, [patient, toast])

  useEffect(() => {
    if (patient) {
      getAnalysis()
    }
  }, [patient, getAnalysis])

  return (
    <>
      <H2 className="mb-8">
        <div className='flex flex-col sm:flex-row justify-between gap-8'>
          Análises do Paciente
          <Dialog open={showModal} onOpenChange={toogleModal}>
            <DialogTrigger asChild>
              <Button>Nova Análise</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Análise</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  {!isLoading && patient && <NewAnalysis patientId={patient.id} getAnalysis={getAnalysis} toogleModal={toogleModal} />}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </H2>

      <div className='flex flex-col gap-10'>
        {!isLoading && analysis.slice().reverse().map((item, index) => (
          <Card key={index}>
            <div className='flex gap-4 flex-col md:flex-row w-full'>
              <div className='relative flex w-full md:w-3/5 justify-center items-center bg-neutral-100'>
                <Image
                  src={decodeURIComponent(item.imageBase64)}
                  alt="Descrição da Imagem"
                  fill
                  className="w-full h-full absolute rounded-l-lg"
                  unoptimized
                />
              </div>
              <div className='w-full md:w-1/2'>
                <CardHeader>
                  <CardTitle>Análise #{analysis.length - index}</CardTitle>
                  <CardDescription>
                    <Small>
                      {
                        `Radiografia realizada em: ${formatDate(item.doneAt)}`
                      }
                    </Small>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-4'>
                    <Large>Idade óssea por IA</Large>
                    <Small>
                      {
                        item.iaAge === undefined ? 'Não feita' : `${formatAge(item.iaAge)}`
                      }
                    </Small>

                    <Large>Idade óssea por análise manual</Large>
                    <Small>
                      {
                        item.manualAge === undefined ? 'Não feita' : `${formatAge(item.manualAge)}`
                      }
                    </Small>
                  </div>
                </CardContent>

                <CardFooter>
                  <div className='flex-col 2xl:flex-row flex gap-4 '>
                    <Dialog open={showIaModal} onOpenChange={toogleIaModal}>
                      <DialogTrigger asChild>
                        <Button onClick={() => {toogleIaModal(); setSelectedAnalysis(item)}}>Análise Manual</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md sm:max-w-lg md:max-w-4xl xl:max-w-7xl" style={{ height: '90vh' }}>
                        {
                          selectedAnalysis && patient && <ManualAnalysis toogleIaModal={toogleIaModal} patient={patient} analysis={selectedAnalysis.imageBase64} />
                        }
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>

              </div>
            </div>
          </Card >
        ))
        }
        {
          !isLoading && analysis.length === 0 && <><Small>Nenhuma análise feita</Small></>
        }
      </div >
    </>
  )
}
