import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const cookieValue = Buffer.from(adminPassword).toString('base64')

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', cookieValue, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
