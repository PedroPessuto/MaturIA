import { NextResponse } from 'next/server'

export async function handler(req) {
  try {
    const analysis = await req.json()

    const response = await fetch(`http://localhost:3000/analises/${analysis.id}`, {
      method: 'PUT',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analysis),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erro retornado pelo JSON Server:', errorText)
      return NextResponse.json({ error: response.statusText }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json({ result }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export { handler as PUT }