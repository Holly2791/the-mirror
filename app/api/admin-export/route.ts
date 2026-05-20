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

function escapeCSV(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

const TIER_LABELS: Record<string, string> = {
  dimmed: 'The Dimmed Woman',
  stirring: 'The Stirring',
  rising: 'The Rising Warrior',
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const headers = [
    'First Name',
    'Email',
    'Status',
    'Overall Tier',
    'Total Score',
    'Total %',
    'Identity Tier',
    'Identity Score',
    'Identity %',
    'Energy Tier',
    'Energy Score',
    'Energy %',
    'Desire Tier',
    'Desire Score',
    'Desire %',
    'Boundaries Tier',
    'Boundaries Score',
    'Boundaries %',
    'Self-Trust Tier',
    'Self-Trust Score',
    'Self-Trust %',
    'Submitted At',
    'Results URL',
  ]

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

  const rows = (data ?? []).map(r => [
    escapeCSV(r.first_name),
    escapeCSV(r.email),
    escapeCSV(r.status),
    escapeCSV(r.tier ? TIER_LABELS[r.tier] ?? r.tier : ''),
    escapeCSV(r.total_score),
    escapeCSV(r.total_pct != null ? `${r.total_pct}%` : ''),
    escapeCSV(r.identity_tier),
    escapeCSV(r.identity_score),
    escapeCSV(r.identity_pct != null ? `${r.identity_pct}%` : ''),
    escapeCSV(r.energy_tier),
    escapeCSV(r.energy_score),
    escapeCSV(r.energy_pct != null ? `${r.energy_pct}%` : ''),
    escapeCSV(r.desire_tier),
    escapeCSV(r.desire_score),
    escapeCSV(r.desire_pct != null ? `${r.desire_pct}%` : ''),
    escapeCSV(r.boundaries_tier),
    escapeCSV(r.boundaries_score),
    escapeCSV(r.boundaries_pct != null ? `${r.boundaries_pct}%` : ''),
    escapeCSV(r.selftrust_tier),
    escapeCSV(r.selftrust_score),
    escapeCSV(r.selftrust_pct != null ? `${r.selftrust_pct}%` : ''),
    escapeCSV(r.created_at ? new Date(r.created_at).toLocaleString('en-AU') : ''),
    escapeCSV(r.status === 'completed' && appUrl ? `${appUrl}/results/${r.id}` : ''),
  ].join(','))

  const csv = [headers.join(','), ...rows].join('\r\n')
  const date = new Date().toISOString().slice(0, 10)

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="the-mirror-leads-${date}.csv"`,
    },
  })
}
