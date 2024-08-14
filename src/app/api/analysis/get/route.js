import { NextResponse } from 'next/server'

export async function handler (req) {
  try {
    const { searchParams } = new URL(req.url)
    const patientId = searchParams.get('id')

    // TO DO: Verificar se usuário tem acesso a esse paciente
    
    const response = await fetch(`http://localhost:3000/analises/?patientId=${patientId}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: response.status })
    }

    const result = await response.json()

    return NextResponse.json({ result }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export { handler as GET }

