import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { sendRespondentEmail } from '@/lib/email'
import type { ScoreResults, Tier, OverallTier } from '@/lib/scoring'

const TIER_NAMES: Record<string, string> = {
  dimmed: 'The Dimmed Woman',
  stirring: 'The Stirring',
  rising: 'The Rising Warrior',
}

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

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('id', id)
    .eq('status', 'completed')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  }

  const scores: ScoreResults = {
    identity: {
      score: data.identity_score ?? 0,
      pct: data.identity_pct ?? 0,
      tier: (data.identity_tier ?? 'low') as Tier,
    },
    energy: {
      score: data.energy_score ?? 0,
      pct: data.energy_pct ?? 0,
      tier: (data.energy_tier ?? 'low') as Tier,
    },
    desire: {
      score: data.desire_score ?? 0,
      pct: data.desire_pct ?? 0,
      tier: (data.desire_tier ?? 'low') as Tier,
    },
    boundaries: {
      score: data.boundaries_score ?? 0,
      pct: data.boundaries_pct ?? 0,
      tier: (data.boundaries_tier ?? 'low') as Tier,
    },
    selftrust: {
      score: data.selftrust_score ?? 0,
      pct: data.selftrust_pct ?? 0,
      tier: (data.selftrust_tier ?? 'low') as Tier,
    },
    totalScore: data.total_score ?? 0,
    totalPct: data.total_pct ?? 0,
    overallTier: (data.tier ?? 'dimmed') as OverallTier,
  }

  const tierName = TIER_NAMES[data.tier] ?? data.tier ?? 'Unknown'

  const result = await sendRespondentEmail({
    firstName: data.first_name,
    email: data.email,
    scores,
    tierName,
    responseId: data.id,
    answers: data.answers ?? undefined,
  })

  if (result?.status >= 400) {
    return NextResponse.json({ error: 'Email send failed', detail: result }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
