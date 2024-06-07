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
import { Small } from '../typo/Small'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AnalysisForm } from '../forms/AnalysisForm'
import { useState } from 'react'
import { AnaliseManualForm } from '../forms/AnaliseManualForm'
import { AnaliseIaForm } from '../forms/AnaliseIaForm'

export function AnalysisScreen({ analysis }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
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
                  <AnalysisForm toogleModal={toogleModal} />
                </div>
              </div>
            </DialogContent>
          </Dialog>

        </div>

      </H2>

      <div className='flex flex-col gap-10'>
        {analysis.map((item, index) => (
          <Card key={index}>
            <div className='flex gap-4 flex-col md:flex-row w-full'>
              <div className='relative flex w-full md:w-1/2 justify-center items-center' style={{ height: '100%' }}>
                <Image
                  src="/teste.jpg"
                  alt="Descrição da Imagem"
                  width={500}
                  height={400}
                  layout="responsive"
                  objectFit="cover"
                  className="w-full h-full rounded-l-lg"
                />
              </div>
              <div className='w-full md:w-1/2'>
                <CardHeader>
                  <CardTitle>Análise #{index + 1}</CardTitle>
                  <CardDescription>
                    <Small>
                      {
                        item.createdAt == null ? 'Não feita' : `Feita em:  ${formatDate(item.createdAt)}`
                      }
                    </Small>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-2'>
                    <Large>Idade Óssea</Large>

                    <Small>
                      {
                        item.iaAno == null ? 'Não feita' : <> <strong>IA: </strong>  {`${item.iaAno} anos ${item.iaMes} meses`}</>
                      }

                    </Small>
                    <Small>
                      {
                        item.manualAno == null ? 'Não feita' : <> <strong>Manual: </strong>  {`${item.manualAno} anos ${item.manualMes} meses`}</>
                      }
                    </Small>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className='flex-col 2xl:flex-row flex gap-4 '>
                    <Dialog open={showManualModal} onOpenChange={toogleManualModal}>
                      <DialogTrigger asChild>
                        <Button>Análise Manual</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Análise Manual</DialogTitle>
                        </DialogHeader>
                        <AnaliseManualForm toogleManualModal={toogleManualModal} />
                      </DialogContent>
                    </Dialog>
                    <Dialog open={showIaModal} onOpenChange={toogleIaModal}>
                      <DialogTrigger asChild>
                        <Button onClick={toogleIaModal}>Análise Por IA</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md sm:max-w-lg md:max-w-4xl xl:max-w-7xl" style={{ height: '90vh' }}>
                        <AnaliseIaForm toogleIaModal={toogleIaModal} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card >

        ))
        }
      </div >
    </>
  )
}
