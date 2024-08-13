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
      ]
    }
    const result = await getData() // fetch para api externa

    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: response.status })
    }

    return NextResponse.json({ result }, { status: 200 })
  }
  catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export { handler as GET }

