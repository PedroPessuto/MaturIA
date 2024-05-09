import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import Image from 'next/image'

export function InputFile({ ...props }) {
  const [imagePreview, setImagePreview] = useState(null)

  function handleFileChange(event) {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      props.onChange(reader.result) // Passa o resultado do leitor para a função onChange do props
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} {...props} />
      {/* {imagePreview && <Image src={imagePreview} alt="Image Preview" width={200} height={200} className="w-full max-h-80 rounded-sm" />} */}
    </div>
  )
}
