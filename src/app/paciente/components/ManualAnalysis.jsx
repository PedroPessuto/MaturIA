
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/custom/typo/H2'
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { H4 } from '@/components/custom/typo/H4'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Small } from '@/components/custom/typo/Small'

export function ManualAnalysis({ toogleIaModal, patient, analysis }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [viewType, setViewType] = useState('raiox')
  const [selecionados, setSelecionados] = useState({})

  const partes = ['radio', 'ulna']
  const letras = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
  const tipos = ['TW2', 'RUS']
  const [ages, setAges] = useState()

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isDisabledConfirmModal, setIsDisabledConfirmModal] = useState(true)

  const agesTable = {
    'meninos': {
      'table A1': {
        '26': 1.6,
        '32': 1.7,
        '38': 1.8,
        '43': 1.9,
        '49': 2,
        '55': 2.1,
        '61': 2.2,
        '65': 2.3,
        '98': 3,
        '101': 3.1,
        '132': 4

      }
    }
  }

  const values = {
    radio: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 15, RUS: 16 }, Feminino: { TW2: 17, RUS: 23 } },
      'C': { Masculino: { TW2: 17, RUS: 21 }, Feminino: { TW2: 19, RUS: 30 } },
      'D': { Masculino: { TW2: 21, RUS: 30 }, Feminino: { TW2: 25, RUS: 44 } },
      'E': { Masculino: { TW2: 27, RUS: 39 }, Feminino: { TW2: 33, RUS: 56 } },
      'F': { Masculino: { TW2: 48, RUS: 59 }, Feminino: { TW2: 54, RUS: 78 } },
      'G': { Masculino: { TW2: 77, RUS: 87 }, Feminino: { TW2: 85, RUS: 114 } },
      'H': { Masculino: { TW2: 96, RUS: 138 }, Feminino: { TW2: 99, RUS: 160 } },
      'I': { Masculino: { TW2: 106, RUS: 213 }, Feminino: { TW2: 106, RUS: 218 } }
    },
    ulna: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 22, RUS: 27 }, Feminino: { TW2: 22, RUS: 30 } },
      'C': { Masculino: { TW2: 26, RUS: 30 }, Feminino: { TW2: 26, RUS: 33 } },
      'D': { Masculino: { TW2: 30, RUS: 32 }, Feminino: { TW2: 30, RUS: 37 } },
      'E': { Masculino: { TW2: 39, RUS: 40 }, Feminino: { TW2: 39, RUS: 45 } },
      'F': { Masculino: { TW2: 56, RUS: 58 }, Feminino: { TW2: 60, RUS: 74 } },
      'G': { Masculino: { TW2: 73, RUS: 107 }, Feminino: { TW2: 73, RUS: 118 } },
      'H': { Masculino: { TW2: 84, RUS: 181 }, Feminino: { TW2: 80, RUS: 173 } },
    },
  }

  const steps = [
    {
      name: 'Etapa 1',
      parte: 'radio',
      descricao: 'Selecione o RADIO correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/radio/Radio-B.png' },
        { nome: 'C', caminho: '/xray/radio/Radio-C.png' },
        { nome: 'D', caminho: '/xray/radio/Radio-D.png' },
        { nome: 'E', caminho: '/xray/radio/Radio-E.png' },
        { nome: 'F', caminho: '/xray/radio/Radio-F.png' },
        { nome: 'G', caminho: '/xray/radio/Radio-G.png' },
        { nome: 'H', caminho: '/xray/radio/Radio-H.png' },
        { nome: 'I', caminho: '/xray/radio/Radio-I.png' }
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/radio/Radio-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/radio/Radio-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/radio/Radio-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/radio/Radio-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/radio/Radio-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/radio/Radio-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/radio/Radio-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/radio/Radio-I-Desenho.png' }
      ],
    },
    {
      name: 'Etapa 2',
      parte: 'ulna',
      descricao: 'Selecione o ULNA correspondente',
      imagensRaiox: [

        { nome: 'B', caminho: '/xray/ulna/ulna-B.png' },
        { nome: 'C', caminho: '/xray/ulna/ulna-C.png' },
        { nome: 'D', caminho: '/xray/ulna/ulna-D.png' },
        { nome: 'E', caminho: '/xray/ulna/ulna-E.png' },
        { nome: 'F', caminho: '/xray/ulna/ulna-F.png' },
        { nome: 'G', caminho: '/xray/ulna/ulna-G.png' },
        { nome: 'H', caminho: '/xray/ulna/ulna-H.png' },
      ],
      imagensDesenho: [
        { nome: 'B', caminho: '/xray/ulna/ulna-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/ulna/ulna-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/ulna/ulna-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/ulna/ulna-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/ulna/ulna-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/ulna/ulna-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/ulna/ulna-H-Desenho.png' },
      ],
    },
  ]

  const handleViewTypeChange = (type) => {
    setViewType(type)
  }

  const handleNextStep = () => {
    if (selecionados[currentStep] !== undefined) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast({
        description: 'Por favor, selecione uma imagem antes de prosseguir.',
      })
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    let totalTW2 = 0
    let totalRUS = 0

    for (let i = 0; i < Object.keys(selecionados).length; i++) {
      const x = values[partes[`${i}`]][letras[selecionados[`${i}`]]][patient.sexoBiologico]
      totalTW2 += x['TW2']
      totalRUS += x['RUS']
    }

    let y = {
      'TW2': totalTW2,
      'RUS': totalRUS,
    }

    setAges(y)
    setIsLoading(false)
    setCurrentStep(currentStep + 1)
  }

  const handleSelectImage = (stepIndex, imageIndex) => {
    let newSelecteds = (prevSelecionados) => ({
      ...prevSelecionados,
      [stepIndex]: imageIndex,
    })

    setSelecionados(newSelecteds)

    if (stepIndex === steps.length - 1) {
      setIsDisabledConfirmModal(false)
    }
  }

  const ZoomImage = ({ src, alt, width, height }) => {
    const [zoom, setZoom] = useState(false)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const handleMouseEnter = () => {
      setZoom(true)
    }

    const handleMouseMove = (e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      setOffset({ x, y })
    }

    const handleMouseLeave = () => {
      setZoom(false)
      setOffset({ x: 0, y: 0 })
    }

    return (
      <div
        className="relative overflow-hidden rounded-lg w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full transition-transform duration-300 ${zoom ? 'scale-150' : 'scale-100'}`}
          style={{ transformOrigin: `${offset.x}% ${offset.y}%` }}
        />
      </div>
    )
  }


  return (
    <div className="flex-col flex h-full w-full overflow-y-auto overflow-x-hidden">
      <div className="w-full h-full flex flex-col gap-4">
        {currentStep !== steps.length && (
          <>
            <H2 className="break-words">{steps[currentStep].name}</H2>
            <H4 className="break-words">{steps[currentStep].descricao}</H4>
            <div className="flex-col flex sm:flex-row w-full gap-8">
              <div className="w-full sm:w-2/3">
                <Tabs defaultValue={viewType} onValueChange={handleViewTypeChange}>
                  <div className='flex w-full justify-center'>
                    <div className="flex w-full justify-between">
                      {currentStep !== 0 && (
                        <Button onClick={handlePreviousStep} disabled={isLoading}>
                          Anterior
                        </Button>
                      )}
                    </div>

                    <TabsList>
                      <TabsTrigger value="raiox">Raio-X</TabsTrigger>
                      <TabsTrigger value="desenho">Desenho</TabsTrigger>
                    </TabsList>

                    <div className="flex w-full justify-end">
                      {currentStep === steps.length - 1 ? (
                        <Dialog open={showConfirmModal} onOpenChange={() => { setShowConfirmModal(!showConfirmModal) }}>
                          <DialogTrigger>
                            <Button disabled={isDisabledConfirmModal}>Finalizar</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Deseja finalizar o teste?</DialogTitle>
                            </DialogHeader>
                            <div className='flex w-full justify-between'>
                              <Button onClick={() => { setShowConfirmModal(!showConfirmModal) }} variant="secondary">Cancelar</Button>
                              <Button onClick={() => { handleSubmit() }}>Confirmar</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button onClick={handleNextStep} disabled={selecionados[currentStep] === undefined || isLoading}>
                          Próximo
                        </Button>
                      )}
                    </div>
                  </div>
                  <TabsContent value="raiox">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-full">
                    {steps[currentStep].imagensRaiox.map((image, index) => (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center justify-between h-full rounded-lg border-4 ${selecionados[currentStep] === index ? 'border-blue-500' : 'border-neutral-200'}`}
                          onClick={() => handleSelectImage(currentStep, index)}
                        >
                          <Image
                            src={image.caminho}
                            alt={image.nome}
                            width={100}
                            height={100}
                            className="w-full h-full rounded-t-lg"
                          />
                          <button className={`w-full p-2 font-medium ${selecionados[currentStep] === index ? 'bg-blue-500 text-white' : 'bg-neutral-200'}`}>
                            {selecionados[currentStep] === index ? 'Selecionado' : `Selecionar ${image.nome}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="desenho">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {steps[currentStep].imagensDesenho.map((image, index) => (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center justify-between h-full rounded-lg border-4 ${selecionados[currentStep] === index ? 'border-blue-500' : 'border-neutral-200'}`}
                          onClick={() => handleSelectImage(currentStep, index)}
                        >
                          <ZoomImage
                            src={image.caminho}
                            alt={image.nome}
                            width={100}
                            height={100}
                          />
                          <button className={`w-full p-2 font-medium ${selecionados[currentStep] === index ? 'bg-blue-500 text-white' : 'bg-neutral-200'}`}>
                            {selecionados[currentStep] === index ? 'Selecionado' : `Selecionar ${image.nome}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="w-full sm:w-1/3 h-full flex">
                <ZoomImage
                  src={decodeURIComponent(analysis)}
                  alt={'Imagem Para Comparação'}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </>
        )}
        {currentStep === steps.length && (
          <>
            <H2 className="break-words">Resultado</H2>
            <div className='flex flex-col gap-8 w-full h-full justify-center items-center'>
              <H4>O resultado da análise</H4>
              <div className='flex items-center gap-12'>
                {tipos.map((item, index) => (
                  <div key={index} className='flex flex-col justify-center items-center'>
                    <Small>{item}</Small>
                    <h3 className="italic text-6xl">{ages[tipos[index]]}</h3>
                  </div>
                ))}
              </div>
              <Button onClick={() => { toogleIaModal() }}>Retornar</Button>
            </div>
          </>
        )}
      </div>
    </div>

  )

}
