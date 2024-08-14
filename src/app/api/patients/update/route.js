
import { NextResponse } from 'next/server'

export async function handler(req) {
  try {
    const patient = await req.json()
    console.log(patient)

    const response = await fetch(`http://localhost:3000/pacientes/${patient.id}`, {
      method: 'PUT',
      cache: 'no-store',
      body: JSON.stringify(patient),
    })

    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: response.status })
    }

    const result = await response.json()

    return NextResponse.json({ result }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export { handler as PUT }