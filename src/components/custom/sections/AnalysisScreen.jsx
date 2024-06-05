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

export function AnalysisScreen({ analysis, showModal }) {

  const pathname = usePathname()
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <>


      <H2 className="mb-8">
        <div className='flex justify-between'>
          Análises do Paciente
          {/* <Link href={`${pathname}/nova-analise`} replace={false}>
            <Button>
              Nova Análise
            </Button>
          </Link> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Nova Análise</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Análise</DialogTitle>
                {/* <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription> */}
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <AnalysisForm />
                </div>
              </div>
              {/* <DialogFooter className="sm:justify-between justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fechar
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter> */}
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
                        item.createdAt == null ? 'Não feita' : <> <strong>Manual: </strong>  {item.manualAge}</>
                      }

                    </Small>
                    <Small>
                      {
                        item.createdAt == null ? 'Não feita' : <> <strong>IA: </strong>  {item.iaAge}</>
                      }
                    </Small>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className='flex-col 2xl:flex-row w-full flex gap-4 '>
                    <Button>
                      Análise Manual
                    </Button>
                    <Button>
                      Análise Por IA
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>

        ))}
      </div>
    </>
  )
}
