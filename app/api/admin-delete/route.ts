import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

function isAuthenticated(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const cookie = req.cookies.get('admin_session')
  try {
    return cookie?.value === Buffer.from(password).toString('base64')
  } catch {
    return false
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { error } = await supabase
    .from('responses')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
