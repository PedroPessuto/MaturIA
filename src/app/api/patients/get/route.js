import { NextResponse } from 'next/server'

export async function handler(req) {
  try {
    const response = await fetch('http://localhost:3000/pacientes', {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: response.status })
    }

    const result = await response.json()

    return NextResponse.json({ result }, { status: 201 })
  } 
  catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export { handler as GET }
