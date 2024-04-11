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
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

export function LoginForm({ onClick }) {

  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    nome: z.string().min(4, {
      message: 'Nome precisa ter no mínimo 3 caracteres'
    }),
    dataDeNascimento: z.string().datetime({
      message: 'Selecione uma data'
    }),
    sexoBiologico: z.string({
      message: 'Selecione um sexo biológico'
    }),
    comorbidades: z.string().min(1), //Opcional (texto)
    imagemBase64: z.string({
      message: 'Selecione uma imagem!'
    }), 
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      dataDeNascimento: '',
      sexoBiologico: '',
      comorbidades: ''
    }
  })

  function onSubmit(data) {
    setIsLoading(true)

    setIsLoading(false)
  }

  return (
    <>
      <H2 className="text-center">Login</H2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
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
            <Button type="submit" className="w-full">Entrar</Button>
          }

        </form>
      </Form>
      <Button variant="link" onClick={onClick}>Não tenho uma conta</Button>
    </>
  )
}