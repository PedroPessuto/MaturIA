'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/custom/typo/H2'
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function AnaliseIaForm({ toogleIaModal }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [viewType, setViewType] = useState('raiox')
  const [selecionados, setSelecionados] = useState({})

  const steps = [
    {
      name: 'Etapa 1',
      descricao: 'Essa é a primeira etapa. A descrição deve ser quebrada corretamente para caber no espaço disponível.',
      imagensRaiox: [{ nome: 'Imagem 1', caminho: '/teste.jpg' }, { nome: 'Imagem 2', caminho: '/teste.jpg' }, { nome: 'Imagem 2', caminho: '/teste.jpg' }, { nome: 'Imagem 2', caminho: '/teste.jpg' }, { nome: 'Imagem 2', caminho: '/teste.jpg' }, { nome: 'Imagem 2', caminho: '/teste.jpg' }, { nome: 'Imagem 2', caminho: '/teste.jpg' }, { nome: 'Imagem 2', caminho: '/teste.jpg' }],
      imagensDesenho: [{ nome: 'Imagem 1 Desenho', caminho: '/teste.jpg' }, { nome: 'Imagem 2 Desenho', caminho: '/teste.jpg' }],
    },
    {
      name: 'Etapa 2',
      descricao: 'Essa é a segunda etapa. A descrição deve ser quebrada corretamente para caber no espaço disponível.',
      imagensRaiox: [{ nome: 'Imagem 3 RaioX', caminho: '/imagem1raiox2.jpg' }, { nome: 'Imagem 4 RaioX', caminho: '/imagem2raiox2.jpg' }],
      imagensDesenho: [{ nome: 'Imagem 3 Desenho', caminho: '/imagem1desenho2.jpg' }, { nome: 'Imagem 4 Desenho', caminho: '/imagem2desenho2.jpg' }],
    },
  ]

  const handleViewTypeChange = (type) => {
    setViewType(type)
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        description: 'Dados salvos com sucesso!',
      })
      router.refresh()
    }, 2000)

    if (toogleIaModal) {
      toogleIaModal()
    }
  }

  const handleSelectImage = (stepIndex, imageIndex) => {
    setSelecionados((prevSelecionados) => ({
      ...prevSelecionados,
      [stepIndex]: imageIndex,
    }))
  }

  const images = viewType === 'raiox' ? steps[currentStep].imagensRaiox : steps[currentStep].imagensDesenho

  return (
    <div className="w-full flex flex-col justify-between gap-4">
      <H2 className="break-words">{steps[currentStep].descricao}</H2>
      <div className="flex h-full w-full gap-8">
        <div className="w-2/3">
          <Tabs defaultValue="raiox">
            <TabsContent value="raiox">
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg ${selecionados[currentStep] === index ? 'border-4 border-blue-500' : ''}`}
                  >
                    <Image
                      src={image.caminho}
                      alt={image.nome}
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      className="w-full h-full rounded-lg"
                    />
                    <Button onClick={() => handleSelectImage(currentStep, index)} className="w-full">
                      {selecionados[currentStep] === index ? 'Selecionado' : `Selecionar ${image.nome}`}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="desenho">
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg border-4 ${selecionados[currentStep] === index ? 'border-primary' : 'border-neutral-200'}`}
                  >
                    <Image
                      src={image.caminho}
                      alt={image.nome}
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      className="w-full h-full"
                    />

                   
                    <button onClick={() => handleSelectImage(currentStep, index)} className={`w-full p-2 font-medium  ${selecionados[currentStep] === index ? 'bg-primary text-white' : 'bg-neutral-200'}`}>
                      {selecionados[currentStep] === index ? 'Selecionado' : `Selecionar ${image.nome}`}
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <div className="w-full flex justify-center mt-8">
              <TabsList>
                <TabsTrigger value="raiox">Raio-X</TabsTrigger>
                <TabsTrigger value="desenho">Desenho</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        <div className="w-1/3 flex">
          <Image
            src={'/teste.jpg'}
            alt={'Imagem Para Comparação'}
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="flex w-full">
          {currentStep !== 0 && (
            <Button onClick={handlePreviousStep} disabled={isLoading}>
              Anterior
            </Button>
          )}
        </div>
        <div className="flex w-full justify-end">
          {currentStep !== steps.length - 1 && (
            <Button onClick={handleNextStep} disabled={currentStep === steps.length - 1 || isLoading}>
              Próximo
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <>
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Salvar
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
