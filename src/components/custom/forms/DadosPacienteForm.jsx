'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/custom/typo/H2'
import { Coins, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { P } from '../typo/P'

export function DadosPacienteForm({ toggleModal, fetchData, patient }) {
  const [paciente, setPaciente] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const date = new Date()

  const currentYear = date.getFullYear().toString()
  const month = date.getMonth() + 1
  const currentMonth = month.toString()
  const currentDay = date.getDate().toString()

  const years = Array.from({ length: currentYear - 1899 }, (_, i) => (1900 + i).toString())
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  const formSchema = z.object({
    nome: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }),
    peso: z.string().transform(String),
    altura: z.string().transform(String),
    ano: z.string().min(4, { message: 'Ano é obrigatório' }).transform(String),
    mes: z.string().min(1, { message: 'Mês é obrigatório' }).transform(String),
    dia: z.string().min(1, { message: 'Dia é obrigatório' }).transform(String),
    sexoBiologico: z.string({ message: 'Selecione um sexo biológico' }),
    comorbidades: z.string().optional(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: patient !== undefined ? patient.nome : '',
      peso: patient !== undefined ? patient.peso : '',
      altura: patient !== undefined ? patient.altura : '',
      ano: patient !== undefined ? patient.ano : `${currentYear}`,
      mes: patient !== undefined ? patient.mes : `${currentMonth}`,
      dia: patient !== undefined ? patient.dia : `${currentDay}`,
      sexoBiologico: patient !== undefined ? patient.sexoBiologico :  'Feminino',
      comorbidades: patient !== undefined ? patient.comorbidades :  ''
    }
  })


  // useEffect(() => {
  //   async function fetchPatient() {
  //     if (!patient) {
  //       return
  //     }

  //     setIsLoading(true)

  //     try {
  //       // const patient = await getPatient()
  //       // setPatient(patient)
  //       if (patient) {
  //         form.setValue('nome', patient.nome)
  //         form.setValue('peso', `${patient.peso}`)
  //         form.setValue('altura', `${patient.altura}`)
  //         form.setValue('ano', `${patient.ano}`)
  //         form.setValue('mes', `${patient.mes}`)
  //         form.setValue('dia', `${patient.dia}`)
  //         form.setValue('sexoBiologico', patient.sexoBiologico)
  //         form.setValue('comorbidades', patient.comorbidades)
  //       }
  //     } catch (error) {
  //       toast({
  //         variant: 'destructive',
  //         description: `Erro ao buscar por paciente: ${error.message}`,
  //       })
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchPatient()
  // }, [form, toast])

  async function addPatient(newPatient) {
    try {
      await fetch('/api/patients/create', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(newPatient),
      })

      toast({
        description: 'Paciente Adicionado Com Sucesso',
      })

      fetchData()
      toggleModal()

    }
    catch (error) {
      toast({
        variant: 'destructive',
        description: `Erro ao adicionar paciente: ${error.message}`,
      })
    }
  }

  async function updatePatient(newPatient) {
    try {
      let completePatient = { ...newPatient, id: patient.id }
     
      await fetch(`/api/patients/update/?id=${patient.id}`, {
        method: 'PUT',
        cache: 'no-store',
        body: JSON.stringify(completePatient),
      })

      toast({
        description: 'Dados Atualizados Com Sucesso',
      })

    } catch (error) {
      toast({
        variant: 'destructive',
        description: `Erro ao atualizar paciente: ${error.message}`,
      })
    }
  }

  function onSubmit(data) {
    setIsLoading(true)

    if (patient != null) {
      updatePatient(data)
    } else {
      addPatient(data)
    }

    setIsLoading(false)
  }

  return (
    <div className='w-full overflow-y-auto px-2'>
      <H2 className="mb-8">{paciente != null ? 'Dados do Paciente' : 'Cadastro de Paciente'}</H2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                  <Select value={field.value}  onValueChange={field.onChange}>
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                  <Textarea placeholder="Escreva as comorbidades aqui" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className='w-full'><Coins className="mr-2 h-4 w-4" /> Salvar</Button>
        </form>
      </Form>
    </div>
  )
}
    