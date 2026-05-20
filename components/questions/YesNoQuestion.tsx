'use client'
import type { Question } from '@/lib/questions'

interface Props {
  question: Question
  value: string
  onChange: (value: string) => void
}

const CATEGORY_LABELS: Record<string, string> = {
  identity: 'Identity',
  energy: 'Energy',
  desire: 'Desire',
  boundaries: 'Boundaries',
  selftrust: 'Self-Trust',
  research: 'Reflection',
}

export default function YesNoQuestion({ question, value, onChange }: Props) {
  return (
    <div>
      <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '10px', letterSpacing: '3px', color: '#C9962B', textTransform: 'uppercase', fontWeight: '600' }}>
        {CATEGORY_LABELS[question.category] || question.category}
      </p>
      <h2 style={{ margin: '0 0 52px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '28px', lineHeight: '1.5', color: '#181410', fontWeight: '400' }}>
        {question.text}
      </h2>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {(['yes', 'no'] as const).map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={{
              width: '180px',
              padding: '22px',
              background: value === option ? '#C9962B' : 'white',
              border: value === option ? '2px solid #C9962B' : '2px solid #E0D8CE',
              color: value === option ? 'white' : '#181410',
              fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '4px',
              cursor: 'pointer',
              borderRadius: '2px',
              textTransform: 'uppercase',
              transition: 'all 0.15s ease',
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
