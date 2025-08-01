import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ message: 'Invalid email address' }, { status: 400 })
  }

  console.log(`Sending reset code to ${email}`)

  return NextResponse.json({ message: 'Verification code sent to email!' })
}
