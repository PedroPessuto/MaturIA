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
    email: z.string().email({
      message: 'Insira um e-mail válido!'
    }),
    senha: z.string().min(4, {
      message: 'Senha precisa ter no mínimo 4 caracteres'
    })
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      senha: ''
    }
  })

  function onSubmit(data) {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false
    })
      .then((callback) => {
        if (callback?.ok) {

          toast({
            description: 'Login realizado com sucesso',
          })
          router.push('/pacientes')
          router.refresh()
        }

        if (callback?.error) {
          toast({
            variant: 'destructive',
            title: 'Ah não! Algo deu errado...',
            description: `Erro: ${callback.error}`,
          })
        }

        setIsLoading(false)
      })
  }

  return (
    <div className='w-full md:w-1/2 flex flex-col gap-4'>
      <H2 className='text-center'>Login</H2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
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
            name='senha'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            isLoading && <>
              <Button disabled className='w-full'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              </Button>
            </>
          }
          {
            !isLoading &&
            <Button type='submit' className='w-full'>Entrar</Button>
          }

        </form>
      </Form>
      {/* <Button variant="link" onClick={onClick}>Não tenho uma conta</Button> */}
    </div>
  )
}