import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { calculateScores } from '@/lib/scoring'
import { sendRespondentEmail, sendHollyEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { responseId, answers, firstName, email } = await req.json()

    if (!responseId || !answers || !firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const scores = calculateScores(answers)

    const supabase = createServerClient()
    const { error } = await supabase
      .from('responses')
      .update({
        answers,
        total_score: scores.totalScore,
        total_pct: scores.totalPct,
        tier: scores.overallTier,
        identity_score: scores.identity.score,
        identity_pct: scores.identity.pct,
        identity_tier: scores.identity.tier,
        energy_score: scores.energy.score,
        energy_pct: scores.energy.pct,
        energy_tier: scores.energy.tier,
        desire_score: scores.desire.score,
        desire_pct: scores.desire.pct,
        desire_tier: scores.desire.tier,
        boundaries_score: scores.boundaries.score,
        boundaries_pct: scores.boundaries.pct,
        boundaries_tier: scores.boundaries.tier,
        selftrust_score: scores.selftrust.score,
        selftrust_pct: scores.selftrust.pct,
        selftrust_tier: scores.selftrust.tier,
        research_q36: answers[36] || [],
        research_q37: answers[37] || [],
        status: 'completed',
      })
      .eq('id', responseId)

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send emails (fire and forget — don't fail the request if emails fail)
    const tierName =
      scores.overallTier === 'dimmed' ? 'The Dimmed Woman'
      : scores.overallTier === 'stirring' ? 'The Stirring'
      : 'The Rising Warrior'

    try {
  const [r1, r2] = await Promise.all([
    sendRespondentEmail({ firstName, email, scores, tierName, responseId }),
    sendHollyEmail({ firstName, email, scores, tierName, responseId, answers }),
  ])
  console.log('Email results:', JSON.stringify(r1), JSON.stringify(r2))
} catch (err) {
  console.error('Email error:', err)
}

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Error submitting quiz:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
