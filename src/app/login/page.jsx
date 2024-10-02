'use client'
import { useState } from 'react'
import { LoginForm } from './components/LoginForm'
// import { RegisterForm } from './components/RegisterForm'

export default function Page() {

  const [onLogin, setOnLogin] = useState(true)

  function handleOnLogin() {
    setOnLogin(!onLogin)
  }

  return (
    <main className='h-screen'>
      <div className='flex flex-col items-center justify-center w-full h-full gap-8 p-8'>
        {
          onLogin && <LoginForm onClick={handleOnLogin} />
        }
        {/* {
          !onLogin && <RegisterForm onClick={handleOnLogin} />
        } */}
      </div>
    </main>
  )
}