'use client'
import type { Question } from '@/lib/questions'

interface Props {
  question: Question
  value: string[]
  onChange: (value: string[]) => void
}

export default function MultiSelectQuestion({ question, value, onChange }: Props) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div>
      <p style={{ margin: '0 0 8px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '10px', letterSpacing: '3px', color: '#C9962B', textTransform: 'uppercase', fontWeight: '600' }}>
        Select all that apply
      </p>
      <h2 style={{ margin: '0 0 36px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '28px', lineHeight: '1.5', color: '#181410', fontWeight: '400' }}>
        {question.text}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.multiOptions?.map(option => {
          const selected = value.includes(option)
          return (
            <button
              key={option}
              onClick={() => toggle(option)}
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
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{
                width: '22px',
                height: '22px',
                border: selected ? '2px solid #C9962B' : '2px solid #C0B8B0',
                borderRadius: '3px',
                background: selected ? '#C9962B' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}>
                {selected && (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
