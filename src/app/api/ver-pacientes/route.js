
import { NextResponse } from 'next/server'

export async function handler(req, res) {
  try {
    async function getData() {
      return [
        {
          id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
          nome: 'Pedro Bandeira Fenomeno',
          peso: '80.5',
          altura: '175',
          sexoBiologico: 'Masculino',
          dia: '30',
          mes: '7',
          ano: '2004'
        },
        {
          id: '2f3e5d17-8117-47c6-9810-461c0036f3de',
          nome: 'Ana Clara Lopes',
          peso: '65.2',
          altura: '168',
          sexoBiologico: 'Feminino',
          dia: '15',
          mes: '10',
          ano: '1992'
        },
        {
          id: '8db85547-1e6b-4aaf-94e3-5a3b2d1cfc8e',
          nome: 'José Ricardo Almeida',
          peso: '72.4',
          altura: '182',
          sexoBiologico: 'Masculino',
          dia: '22',
          mes: '3',
          ano: '1988'
        },
        {
          id: 'aac9c3a1-df83-4c67-9da0-c11c0f98e6da',
          nome: 'Mariana Sousa Queirós',
          peso: '54.6',
          altura: '159',
          sexoBiologico: 'Feminino',
          dia: '7',
          mes: '8',
          ano: '1995'
        },
        {
          id: 'cde5b93a-6384-4217-bdcf-00f3ce3e71a6',
          nome: 'Carlos Henrique Oliveira',
          peso: '84.1',
          altura: '174',
          sexoBiologico: 'Masculino',
          dia: '3',
          mes: '12',
          ano: '1979'
        }
      ]

    }

    const result = await getData()
    return NextResponse.json({ result }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export { handler as GET }

