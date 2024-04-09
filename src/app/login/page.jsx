'use client'
import { LoginForm } from '@/components/custom/forms/LoginForm'
import { RegisterForm } from '@/components/custom/forms/RegisterForm'
import { useState } from 'react'

export default function Login() {

  const [onLogin, setOnLogin] = useState(true)

  function handleOnLogin() {
    setOnLogin(!onLogin)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-1/2 h-full flex flex-col gap-8 my-auto">
        {
          onLogin && <LoginForm onClick={handleOnLogin} />
        }
        {
          !onLogin && <RegisterForm onClick={handleOnLogin} />
        }
      </div>
    </main>
  )
}