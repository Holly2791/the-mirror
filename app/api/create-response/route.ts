import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { firstName, email } = await req.json()

    if (!firstName || !email) {
      return NextResponse.json({ error: 'First name and email are required' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('responses')
      .insert({ first_name: firstName, email, status: 'started' })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (e) {
    console.error('Error creating response:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
