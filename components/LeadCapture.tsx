'use client'
import { useState, FormEvent } from 'react'

interface Props {
  onSubmit: (firstName: string, email: string) => void
  error: string
}

export default function LeadCapture({ onSubmit, error }: Props) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !email.trim()) return
    setLoading(true)
    await onSubmit(firstName.trim(), email.trim())
    setLoading(false)
  }

  const isReady = firstName.trim().length > 0 && email.trim().length > 0 && !loading

  return (
    <div style={{ minHeight: '100vh', background: '#181410', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      {/* Wordmark */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <p style={{ margin: '0 0 10px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', letterSpacing: '5px', color: '#C9962B', textTransform: 'uppercase' }}>
          Holly Little | Woman to Warrior
        </p>
        <h1 style={{ margin: '0 0 28px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '64px', color: '#FAF7F2', fontWeight: '300', letterSpacing: '4px', lineHeight: '1' }}>
          The Mirror
        </h1>
        <div style={{ width: '60px', height: '1px', background: '#C9962B', margin: '0 auto 28px' }} />
        <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '20px', fontStyle: 'italic', color: '#E8C87A', maxWidth: '520px', lineHeight: '1.6' }}>
          A 37-question assessment to reveal exactly where you are in your journey back to yourself.
        </p>
      </div>

      {/* Form card */}
      <div style={{ background: '#FAF7F2', padding: '52px 48px', maxWidth: '480px', width: '100%', borderRadius: '2px' }}>
        <h2 style={{ margin: '0 0 6px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', color: '#181410', fontWeight: '600' }}>
          Begin Your Assessment
        </h2>
        <p style={{ margin: '0 0 36px', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '17px', color: '#4A3F32', lineHeight: '1.6' }}>
          Enter your details below. Your full personalised report will be emailed to you on completion.
        </p>

        {error && (
          <div style={{ marginBottom: '20px', padding: '12px 16px', background: '#FDECEA', border: '1px solid #C0392B', borderRadius: '4px', color: '#C0392B', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#4A3F32', marginBottom: '8px', fontWeight: '600' }}>
              First Name *
            </label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              placeholder="Your first name"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #D0C8BE',
                background: 'white',
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: '17px',
                color: '#181410',
                outline: 'none',
                boxSizing: 'border-box',
                borderRadius: '2px',
              }}
            />
          </div>

          <div style={{ marginBottom: '36px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#4A3F32', marginBottom: '8px', fontWeight: '600' }}>
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #D0C8BE',
                background: 'white',
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: '17px',
                color: '#181410',
                outline: 'none',
                boxSizing: 'border-box',
                borderRadius: '2px',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!isReady}
            style={{
              width: '100%',
              padding: '18px',
              background: isReady ? '#C9962B' : '#D0B87A',
              border: 'none',
              color: 'white',
              fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: isReady ? 'pointer' : 'not-allowed',
              borderRadius: '2px',
              transition: 'background 0.2s ease',
            }}
          >
            {loading ? 'Starting...' : 'Start The Assessment →'}
          </button>
        </form>
      </div>

      <p style={{ marginTop: '28px', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '10px', color: '#4A3F32', letterSpacing: '1px', textAlign: 'center' }}>
        37 questions · Takes 8–12 minutes · Full report emailed to you
      </p>
    </div>
  )
}
