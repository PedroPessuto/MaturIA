'use client'
import { LoginForm } from '@/components/custom/forms/LoginForm'
import { RegisterForm } from '@/components/custom/forms/RegisterForm'
import { useState } from 'react'

export default function Login() {

  const pacientes = [
    {
      identificador: '123.456.789-00',
      nome: 'Alberto Fernandes',
      dataDeNascimento: '30/07/1999',
      sexoBiologico: 'M',
      comorbidades: ''  
    },
    {
      identificador: '121.456.789-00',
      nome: 'Liza Fernandes',
      dataDeNascimento: '30/07/2000',
      sexoBiologico: 'F',
      comorbidades: ''  
    },
    {
      identificador: '122.456.789-00',
      nome: 'Jade Fernandes',
      dataDeNascimento: '30/07/2005',
      sexoBiologico: 'f',
      comorbidades: ''  
    }
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-1/2 h-full flex flex-col gap-8 my-auto">

      </div>
    </main>
  )
}