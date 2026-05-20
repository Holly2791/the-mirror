'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import LeadCapture from './LeadCapture'
import ProgressBar from './ProgressBar'
import YesNoQuestion from './questions/YesNoQuestion'
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion'
import MultiSelectQuestion from './questions/MultiSelectQuestion'
import { QUESTIONS } from '@/lib/questions'

type Answers = Record<number, string | string[]>
type AppState = 'capture' | 'quiz' | 'submitting'

export default function QuizApp() {
  const router = useRouter()
  const [appState, setAppState] = useState<AppState>('capture')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [responseId, setResponseId] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [captureError, setCaptureError] = useState('')
  const [quizError, setQuizError] = useState('')

  const totalQuestions = QUESTIONS.length

  const handleCapture = useCallback(async (fn: string, em: string) => {
    setCaptureError('')
    try {
      const res = await fetch('/api/create-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: fn, email: em }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setCaptureError(data.error || 'Failed to start. Please try again.')
        return
      }

      setFirstName(fn)
      setEmail(em)
      setResponseId(data.id)
      setAppState('quiz')
      setCurrentQuestion(0)
    } catch {
      setCaptureError('Connection error. Please check your internet and try again.')
    }
  }, [])

  const currentQ = QUESTIONS[currentQuestion]
  const currentAnswer = answers[currentQ?.id]
  const hasAnswer = currentQ?.type === 'multi-select'
    ? (currentAnswer as string[])?.length > 0
    : !!currentAnswer

  const handleAnswer = useCallback((questionId: number, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }, [])

  const handleNext = useCallback(async () => {
    setQuizError('')
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setAppState('submitting')
      try {
        const res = await fetch('/api/submit-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responseId, answers, firstName, email }),
        })
        const data = await res.json()

        if (!res.ok || data.error) {
          setQuizError(data.error || 'Failed to submit. Please try again.')
          setAppState('quiz')
          return
        }

        router.push(`/results/${responseId}`)
      } catch {
        setQuizError('Connection error. Please try again.')
        setAppState('quiz')
      }
    }
  }, [currentQuestion, totalQuestions, responseId, answers, firstName, email, router])

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }, [currentQuestion])

  if (appState === 'capture') {
    return <LeadCapture onSubmit={handleCapture} error={captureError} />
  }

  if (appState === 'submitting') {
    return (
      <div style={{ minHeight: '100vh', background: '#181410', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px', height: '56px',
            border: '2px solid rgba(201,150,43,0.2)',
            borderTop: '2px solid #C9962B',
            borderRadius: '50%',
            margin: '0 auto 28px',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ margin: 0, fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '22px', fontStyle: 'italic', color: '#E8C87A' }}>
            Preparing your results...
          </p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', display: 'flex', flexDirection: 'column' }}>
      {/* Header bar */}
      <div style={{ background: '#181410', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <p style={{ margin: 0, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '9px', letterSpacing: '3px', color: '#C9962B', textTransform: 'uppercase' }}>
            Woman to Warrior
          </p>
          <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '20px', color: '#FAF7F2', letterSpacing: '1px' }}>
            The Mirror
          </p>
        </div>
        <p style={{ margin: 0, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '11px', color: '#E8C87A', letterSpacing: '1px' }}>
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
      </div>

      {/* Progress bar */}
      <ProgressBar current={currentQuestion + 1} total={totalQuestions} />

      {/* Question area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%', padding: '60px 0' }}>

          {quizError && (
            <div style={{ marginBottom: '24px', padding: '12px 16px', background: '#FDECEA', border: '1px solid #C0392B', borderRadius: '4px', color: '#C0392B', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '13px' }}>
              {quizError}
            </div>
          )}

          {(currentQ.type === 'yes-no-positive' || currentQ.type === 'yes-no-reverse') && (
            <YesNoQuestion
              question={currentQ}
              value={answers[currentQ.id] as string || ''}
              onChange={(v) => handleAnswer(currentQ.id, v)}
            />
          )}

          {currentQ.type === 'multiple-choice' && (
            <MultipleChoiceQuestion
              question={currentQ}
              value={answers[currentQ.id] as string || ''}
              onChange={(v) => handleAnswer(currentQ.id, v)}
            />
          )}

          {currentQ.type === 'multi-select' && (
            <MultiSelectQuestion
              question={currentQ}
              value={(answers[currentQ.id] as string[]) || []}
              onChange={(v) => handleAnswer(currentQ.id, v)}
            />
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '48px', alignItems: 'center', justifyContent: 'center' }}>
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  border: '1px solid #C0B8B0',
                  color: '#4A3F32',
                  fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  textTransform: 'uppercase',
                }}
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!hasAnswer}
              style={{
                padding: '16px 48px',
                background: hasAnswer ? '#C9962B' : '#E0D0B0',
                border: 'none',
                color: 'white',
                fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '3px',
                cursor: hasAnswer ? 'pointer' : 'not-allowed',
                borderRadius: '2px',
                textTransform: 'uppercase',
                transition: 'background 0.15s ease',
              }}
            >
              {currentQuestion < totalQuestions - 1 ? 'Next →' : 'See My Results'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
