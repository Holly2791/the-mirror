export type Tier = 'low' | 'medium' | 'high'
export type OverallTier = 'dimmed' | 'stirring' | 'rising'

export interface CategoryResult {
  score: number
  pct: number
  tier: Tier
}

export interface ScoreResults {
  identity: CategoryResult
  energy: CategoryResult
  desire: CategoryResult
  boundaries: CategoryResult
  selftrust: CategoryResult
  totalScore: number
  totalPct: number
  overallTier: OverallTier
}

function getCategoryTier(score: number): Tier {
  if (score <= 6) return 'low'
  if (score <= 12) return 'medium'
  return 'high'
}

function getOverallTier(score: number): OverallTier {
  if (score <= 30) return 'dimmed'
  if (score <= 60) return 'stirring'
  return 'rising'
}

function scoreYesNo(answer: string | string[] | undefined, type: 'yes-no-positive' | 'yes-no-reverse'): number {
  if (!answer || typeof answer !== 'string') return 0
  if (type === 'yes-no-positive') return answer === 'yes' ? 2 : 0
  return answer === 'no' ? 2 : 0
}

function scoreMC(answer: string | string[] | undefined): number {
  if (!answer || typeof answer !== 'string') return 0
  const map: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 }
  return map[answer] ?? 0
}

export function calculateScores(answers: Record<number, string | string[]>): ScoreResults {
  const identityScore =
    scoreYesNo(answers[1], 'yes-no-positive') +
    scoreYesNo(answers[2], 'yes-no-reverse') +
    scoreYesNo(answers[3], 'yes-no-reverse') +
    scoreYesNo(answers[4], 'yes-no-reverse') +
    scoreYesNo(answers[5], 'yes-no-positive') +
    scoreMC(answers[6]) +
    scoreMC(answers[7])

  const energyScore =
    scoreYesNo(answers[8], 'yes-no-reverse') +
    scoreYesNo(answers[9], 'yes-no-reverse') +
    scoreYesNo(answers[10], 'yes-no-positive') +
    scoreYesNo(answers[11], 'yes-no-positive') +
    scoreYesNo(answers[12], 'yes-no-positive') +
    scoreMC(answers[13]) +
    scoreMC(answers[14])

  const desireScore =
    scoreYesNo(answers[15], 'yes-no-reverse') +
    scoreYesNo(answers[16], 'yes-no-reverse') +
    scoreYesNo(answers[17], 'yes-no-positive') +
    scoreYesNo(answers[18], 'yes-no-positive') +
    scoreYesNo(answers[19], 'yes-no-positive') +
    scoreMC(answers[20]) +
    scoreMC(answers[21])

  const boundariesScore =
    scoreYesNo(answers[22], 'yes-no-reverse') +
    scoreYesNo(answers[23], 'yes-no-reverse') +
    scoreYesNo(answers[24], 'yes-no-positive') +
    scoreYesNo(answers[25], 'yes-no-positive') +
    scoreYesNo(answers[26], 'yes-no-positive') +
    scoreMC(answers[27]) +
    scoreMC(answers[28])

  const selftrustScore =
    scoreYesNo(answers[29], 'yes-no-reverse') +
    scoreYesNo(answers[30], 'yes-no-reverse') +
    scoreYesNo(answers[31], 'yes-no-positive') +
    scoreYesNo(answers[32], 'yes-no-positive') +
    scoreYesNo(answers[33], 'yes-no-reverse') +
    scoreMC(answers[34]) +
    scoreMC(answers[35])

  const totalScore = identityScore + energyScore + desireScore + boundariesScore + selftrustScore

  return {
    identity: { score: identityScore, pct: Math.round((identityScore / 18) * 100), tier: getCategoryTier(identityScore) },
    energy: { score: energyScore, pct: Math.round((energyScore / 18) * 100), tier: getCategoryTier(energyScore) },
    desire: { score: desireScore, pct: Math.round((desireScore / 18) * 100), tier: getCategoryTier(desireScore) },
    boundaries: { score: boundariesScore, pct: Math.round((boundariesScore / 18) * 100), tier: getCategoryTier(boundariesScore) },
    selftrust: { score: selftrustScore, pct: Math.round((selftrustScore / 18) * 100), tier: getCategoryTier(selftrustScore) },
    totalScore,
    totalPct: Math.round((totalScore / 90) * 100),
    overallTier: getOverallTier(totalScore),
  }
}
