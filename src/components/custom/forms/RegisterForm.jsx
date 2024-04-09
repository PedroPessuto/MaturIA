'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { H2 } from "@/components/custom/typo/H2"


export function RegisterForm({ onClick }) {
  return (
    <>
      <H2 className="text-center">Cadastro</H2>
      <Input type="text" placeholder="Nome" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Senha" />
      <Button>Cadastrar</Button>
      <Button variant="link" onClick={onClick}>Já tenho conta</Button>
    </>
  )
}