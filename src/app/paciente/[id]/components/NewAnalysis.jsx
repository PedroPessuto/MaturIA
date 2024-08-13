'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AnalysisForm({ toogleModal }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const date = new Date()


  const month = date.getMonth() + 1
  const currentYear = date.getFullYear().toString()
  const currentMonth = month.toString()
  const currentDay = date.getDate().toString()

  const years = Array.from({ length: currentYear - 1899 }, (_, i) => (1900 + i).toString())
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  const formSchema = z.object({
    imageBase64: z.string().nonempty('Envie uma imagem'),
    ano: z.string().min(1, { message: 'Ano é obrigatório' }),
    mes: z.string().min(1, { message: 'Mês é obrigatório' }),
    dia: z.string().min(1, { message: 'Dia é obrigatório' }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageBase64: '',
      ano: currentYear,
      mes: currentMonth,
      dia: currentDay,
    },
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        form.setValue('imageBase64', reader.result)
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data) => {
    if (!data.imageBase64) {
      toast({
        description: 'Envie uma imagem antes de enviar.',
        status: 'error',
      })
      return
    }

    console.log(data)
    setIsLoading(true)

    setIsLoading(false)
    toast({
      description: 'Imagem enviada com sucesso!',
    })
    router.refresh()
    toogleModal()
  }

  return (
    <div className='mt-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageBase64"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Radiografia</Label>
                    <Input
                      type="file"
                      accept=".jpeg, .jpg, .png"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="Image Preview"
                        width={200}
                        height={200}
                        className="w-full max-h-80 rounded-sm"
                      />
                    )}
                  </div>
                </FormControl>
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
                        <SelectValue placeholder={currentDay} />
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
                        <SelectValue placeholder={currentMonth} />
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
                        <SelectValue placeholder={currentYear} />
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
          {isLoading && (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          )}
          {!isLoading && (
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}
