'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { H2 } from "@/components/custom/typo/H2"


export function LoginForm({ onClick }) {
  return (
    <>
      <H2 className="text-center">Login</H2>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Senha" />
      <Button>Entrar</Button>
      <Button variant="link" onClick={onClick}>Não tenho conta</Button>
    </>
  )
}