'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Incorrect password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#181410',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif',
      padding: '24px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <p style={{
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#C9962B',
          margin: '0 0 12px',
        }}>
          Holly Little | Woman to Warrior
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, Georgia, serif)',
          fontSize: 36,
          fontWeight: 400,
          color: '#FAF7F2',
          margin: 0,
          lineHeight: 1.1,
        }}>
          Lead Dashboard
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: '#FAF7F208',
        border: '1px solid #FAF7F215',
        borderRadius: 12,
        padding: '36px 40px',
        width: '100%',
        maxWidth: 360,
      }}>
        <label style={{
          display: 'block',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#FAF7F280',
          marginBottom: 8,
        }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoFocus
          placeholder="Enter admin password"
          style={{
            width: '100%',
            background: '#FAF7F20a',
            border: error ? '1px solid #c0392b' : '1px solid #FAF7F230',
            borderRadius: 8,
            color: '#FAF7F2',
            padding: '10px 14px',
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: error ? 10 : 20,
            fontFamily: 'Montserrat, sans-serif',
          }}
        />
        {error && (
          <p style={{
            color: '#c0392b',
            fontSize: 12,
            margin: '0 0 16px',
          }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#C9962B88' : '#C9962B',
            color: '#181410',
            border: 'none',
            borderRadius: 8,
            padding: '11px 0',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            transition: 'background 0.15s',
          }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
