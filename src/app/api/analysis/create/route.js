import { NextResponse } from 'next/server'

export async function handler(req) {
  try {
    const newAnalysis = await req.json()
    
    const response = await fetch('http://localhost:3000/analises', {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(newAnalysis),
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

export { handler as POST }