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

export default function MultipleChoiceQuestion({ question, value, onChange }: Props) {
  return (
    <div>
      <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '10px', letterSpacing: '3px', color: '#C9962B', textTransform: 'uppercase', fontWeight: '600' }}>
        {CATEGORY_LABELS[question.category] || question.category}
      </p>
      <h2 style={{ margin: '0 0 36px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '28px', lineHeight: '1.5', color: '#181410', fontWeight: '400' }}>
        {question.text}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.mcOptions?.map(option => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              style={{
                padding: '18px 22px',
                background: selected ? '#F5EDD8' : 'white',
                border: selected ? '2px solid #C9962B' : '2px solid #E0D8CE',
                color: '#181410',
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: '18px',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '2px',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{
                minWidth: '30px',
                height: '30px',
                borderRadius: '50%',
                background: selected ? '#C9962B' : '#F0EAE0',
                color: selected ? 'white' : '#4A3F32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                fontSize: '11px',
                fontWeight: '700',
                flexShrink: 0,
                marginTop: '2px',
                transition: 'all 0.15s ease',
              }}>
                {option.value}
              </span>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
