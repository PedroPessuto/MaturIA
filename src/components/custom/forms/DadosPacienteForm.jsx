'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/custom/typo/H2'
import { Loader2 } from 'lucide-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function DadosPacienteForm({ paciente, toogleModal }) {

  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const date = new Date()

  const currentYear = date.getFullYear().toString()
  const month = date.getMonth() + 1
  const currentMonth = month.toString()
  const currentDay = date.getDate().toString()

  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)


  const formSchema = z.object({
    nome: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }),
    peso: z.string().regex(/^\d+(\.\d+)?$/, 'Peso deve ser um número').transform(Number),
    altura: z.string().regex(/^\d+(\.\d+)?$/, 'Altura deve ser um número').transform(Number),
    ano: z.string().min(4, { message: 'Ano é obrigatório' }),
    mes: z.string().min(1, { message: 'Mês é obrigatório' }),
    dia: z.string().min(1, { message: 'Dia é obrigatório' }),
    sexoBiologico: z.string({ message: 'Selecione um sexo biológico' }),
    comorbidades: z.string().optional(),
  })


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: paciente != null ? paciente.nome : '',
      peso: paciente != null ? paciente.peso : '',
      altura: paciente != null ? paciente.altura : '',
      ano: paciente != null ? paciente.ano : currentYear,
      mes: paciente != null ? paciente.mes : currentMonth,
      dia: paciente != null ? paciente.dia : currentDay,
      sexoBiologico: paciente != null ? paciente.sexoBiologico : 'Feminino',
      comorbidades: paciente != null ? paciente.comorbidades : ''
    }
  })

  function onSubmit(data) {
    setIsLoading(true)

    if (paciente != null) {
      toast({
        description:  'Dados atualizado com sucesso',
      })
      router.refresh()
    }
    else {
      toast({
        description:  'Paciente Adicionado Com Sucesso',
      })
      
      router.push('/pacientes')
      router.refresh()
      
    }
   
    setIsLoading(false)
    if (toogleModal) {
      toogleModal()
    }
  }


  return (
    <div className='w-full'>
      <H2 className="mb-8">{paciente != null ? 'Dados do Paciente' : 'Cadastro de Paciente'}</H2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="peso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sexoBiologico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo Biológico</FormLabel>
                <Select onValueChange={field.onValueChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Feminino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between'>

            <FormField
              control={form.control}
              name="dia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia</FormLabel>
                  <Select onValueChange={field.onValueChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={paciente != null ? paciente.dia : currentDay} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mês</FormLabel>
                  <Select onValueChange={field.onValueChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={paciente != null ? paciente.mes : currentMonth} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <Select onValueChange={field.onValueChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={paciente != null ? paciente.ano : currentYear} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <FormField
            control={form.control}
            name="comorbidades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comorbidades</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreva as comorbidades aqui..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {
            isLoading && <>
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            </>
          }
          {
            !isLoading &&
            <Button type="submit" className="w-full">{paciente != null ? 'Salvar' : 'Cadastrar'}</Button>
          }

        </form>
      </Form>
    </div>
  )
}