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

export function AnaliseManualForm({ toogleManualModal }) {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const years = Array.from({ length: 121 }, (_, i) => i.toString())
  const months = Array.from({ length: 12 }, (_, i) => (i).toString())

  const formSchema = z.object({
    ano: z.string().min(1, { message: 'Ano é obrigatório' }),
    mes: z.string().min(1, { message: 'Mês é obrigatório' }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ano: '',
      mes: '',
    },
  })

  const onSubmit = (data) => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        description: 'Dados salvos com sucesso!',
      })
      router.refresh()
    }, 2000)

    if (toogleManualModal) {
      toogleManualModal()
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4">
            <FormField
              
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Anos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
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
                <FormItem className="w-full">
                  <FormLabel>Meses</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}
