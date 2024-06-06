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

export function AnalysisForm({toogleModal}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const formSchema = z.object({
    imageBase64: z.string().nonempty('Envie uma imagem'),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageBase64: '',
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageBase64"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
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
    </>
  )
}
