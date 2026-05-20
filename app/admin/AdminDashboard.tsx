'use client'

import { useState, useMemo, useCallback } from 'react'

export interface AdminRow {
  id: string
  first_name: string
  email: string
  status: string
  tier: string | null
  total_score: number | null
  total_pct: number | null
  identity_tier: string | null
  energy_tier: string | null
  desire_tier: string | null
  boundaries_tier: string | null
  selftrust_tier: string | null
  created_at: string
}

type SortKey = 'created_at' | 'total_score' | 'first_name'
type SortDir = 'asc' | 'desc'
type TierFilter = 'all' | 'dimmed' | 'stirring' | 'rising' | 'started'

const TIER_LABELS: Record<string, string> = {
  dimmed: 'The Dimmed Woman',
  stirring: 'The Stirring',
  rising: 'The Rising Warrior',
}

const TIER_COLOURS: Record<string, string> = {
  dimmed: '#7c6a5a',
  stirring: '#b8860b',
  rising: '#C9962B',
}

const CAT_TIER_COLOURS: Record<string, string> = {
  low: '#7c6a5a',
  medium: '#b8860b',
  high: '#4a7c59',
}

function TierPill({ tier }: { tier: string | null }) {
  if (!tier) return <span style={{ opacity: 0.35, fontSize: 12 }}>—</span>
  const colour = TIER_COLOURS[tier] ?? '#888'
  const label = TIER_LABELS[tier] ?? tier
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 99,
      border: `1px solid ${colour}`,
      color: colour,
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

function CatDot({ tier }: { tier: string | null }) {
  if (!tier) return <span style={{ opacity: 0.3, fontSize: 11 }}>—</span>
  const colour = CAT_TIER_COLOURS[tier] ?? '#888'
  return (
    <span style={{
      display: 'inline-block',
      padding: '1px 7px',
      borderRadius: 99,
      background: colour + '22',
      color: colour,
      fontSize: 11,
      fontFamily: 'Montserrat, sans-serif',
      letterSpacing: '0.04em',
      textTransform: 'capitalize',
      border: `1px solid ${colour}55`,
    }}>
      {tier}
    </span>
  )
}

export default function AdminDashboard({ rows }: { rows: AdminRow[] }) {
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [sortKey, setSortKey] = useState<SortKey>('created_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch] = useState('')
  const [exporting, setExporting] = useState(false)
  const [resending, setResending] = useState<string | null>(null)
  const [resendResult, setResendResult] = useState<Record<string, 'ok' | 'error'>>({})
  const [resendingResp, setResendingResp] = useState<string | null>(null)
  const [resendRespResult, setResendRespResult] = useState<Record<string, 'ok' | 'error'>>({})
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleResend = useCallback(async (id: string) => {
    setResending(id)
    setResendResult(prev => { const n = { ...prev }; delete n[id]; return n })
    try {
      const res = await fetch('/api/admin-resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setResendResult(prev => ({ ...prev, [id]: res.ok ? 'ok' : 'error' }))
    } catch {
      setResendResult(prev => ({ ...prev, [id]: 'error' }))
    } finally {
      setResending(null)
    }
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    setDeleting(id)
    setConfirmDelete(null)
    try {
      await fetch('/api/admin-delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      // Reload to reflect the removed row
      window.location.reload()
    } catch {
      setDeleting(null)
    }
  }, [])

  const handleResendRespondent = useCallback(async (id: string) => {
    setResendingResp(id)
    setResendRespResult(prev => { const n = { ...prev }; delete n[id]; return n })
    try {
      const res = await fetch('/api/admin-resend-respondent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setResendRespResult(prev => ({ ...prev, [id]: res.ok ? 'ok' : 'error' }))
    } catch {
      setResendRespResult(prev => ({ ...prev, [id]: 'error' }))
    } finally {
      setResendingResp(null)
    }
  }, [])

  const handleExport = useCallback(async () => {
    setExporting(true)
    try {
      const res = await fetch('/api/admin-export')
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const date = new Date().toISOString().slice(0, 10)
      a.href = url
      a.download = `the-mirror-leads-${date}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert('Export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }, [])

  const filtered = useMemo(() => {
    let result = rows

    if (tierFilter === 'started') {
      result = result.filter(r => r.status === 'started')
    } else if (tierFilter !== 'all') {
      result = result.filter(r => r.tier === tierFilter)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(r =>
        r.first_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
      )
    }

    return [...result].sort((a, b) => {
      let av: string | number | null = null
      let bv: string | number | null = null
      if (sortKey === 'created_at') {
        av = a.created_at; bv = b.created_at
      } else if (sortKey === 'total_score') {
        av = a.total_score ?? -1; bv = b.total_score ?? -1
      } else if (sortKey === 'first_name') {
        av = a.first_name.toLowerCase(); bv = b.first_name.toLowerCase()
      }
      if (av === null) av = ''
      if (bv === null) bv = ''
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [rows, tierFilter, sortKey, sortDir, search])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(key === 'first_name' ? 'asc' : 'desc')
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span style={{ opacity: 0.3, marginLeft: 4 }}>⇅</span>
    return <span style={{ marginLeft: 4, color: '#C9962B' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const completed = rows.filter(r => r.status === 'completed').length
  const started = rows.filter(r => r.status === 'started').length
  const dimmedCount = rows.filter(r => r.tier === 'dimmed').length
  const stirringCount = rows.filter(r => r.tier === 'stirring').length
  const risingCount = rows.filter(r => r.tier === 'rising').length

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#181410',
      color: '#FAF7F2',
      fontFamily: 'Montserrat, sans-serif',
      padding: '40px 24px',
    } as React.CSSProperties,
    inner: {
      maxWidth: 1100,
      margin: '0 auto',
    } as React.CSSProperties,
    header: {
      marginBottom: 32,
    } as React.CSSProperties,
    eyebrow: {
      fontSize: 11,
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      color: '#C9962B',
      marginBottom: 8,
    },
    title: {
      fontFamily: 'var(--font-cormorant, Georgia, serif)',
      fontSize: 36,
      fontWeight: 400,
      margin: '0 0 4px',
      lineHeight: 1.1,
    } as React.CSSProperties,
    subtitle: {
      fontSize: 13,
      opacity: 0.5,
      margin: 0,
    } as React.CSSProperties,
    statRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 28,
      flexWrap: 'wrap' as const,
    },
    stat: {
      background: '#FAF7F211',
      border: '1px solid #FAF7F215',
      borderRadius: 10,
      padding: '14px 20px',
      minWidth: 120,
    } as React.CSSProperties,
    statNum: {
      fontSize: 28,
      fontFamily: 'var(--font-cormorant, Georgia, serif)',
      fontWeight: 600,
      color: '#C9962B',
      lineHeight: 1,
    } as React.CSSProperties,
    statLabel: {
      fontSize: 11,
      opacity: 0.5,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      marginTop: 4,
    },
    controls: {
      display: 'flex',
      gap: 10,
      marginBottom: 20,
      flexWrap: 'wrap' as const,
      alignItems: 'center',
    } as React.CSSProperties,
    filterBtn: (active: boolean): React.CSSProperties => ({
      padding: '6px 14px',
      borderRadius: 99,
      border: active ? '1px solid #C9962B' : '1px solid #FAF7F225',
      background: active ? '#C9962B22' : 'transparent',
      color: active ? '#C9962B' : '#FAF7F280',
      fontSize: 12,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'all 0.15s',
    }),
    searchInput: {
      marginLeft: 'auto',
      background: '#FAF7F20a',
      border: '1px solid #FAF7F220',
      borderRadius: 8,
      color: '#FAF7F2',
      padding: '6px 12px',
      fontSize: 13,
      outline: 'none',
      width: 200,
    } as React.CSSProperties,
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      fontSize: 13,
    },
    th: {
      textAlign: 'left' as const,
      padding: '10px 12px',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: '#FAF7F260',
      borderBottom: '1px solid #FAF7F215',
      fontWeight: 500,
      whiteSpace: 'nowrap' as const,
      cursor: 'pointer',
      userSelect: 'none' as const,
    },
    thNoSort: {
      textAlign: 'left' as const,
      padding: '10px 12px',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: '#FAF7F260',
      borderBottom: '1px solid #FAF7F215',
      fontWeight: 500,
      whiteSpace: 'nowrap' as const,
    },
    td: {
      padding: '11px 12px',
      borderBottom: '1px solid #FAF7F20a',
      verticalAlign: 'middle' as const,
    },
    resultsLink: {
      color: '#C9962B',
      textDecoration: 'none',
      fontSize: 12,
      opacity: 0.8,
    } as React.CSSProperties,
    empty: {
      textAlign: 'center' as const,
      padding: '48px 0',
      opacity: 0.4,
      fontSize: 14,
    },
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>Holly Little | Woman to Warrior</p>
          <h1 style={styles.title}>Lead Dashboard</h1>
          <p style={styles.subtitle}>All quiz submissions — refreshes on page load</p>
        </div>

        <div style={styles.statRow}>
          <div style={styles.stat}>
            <div style={styles.statNum}>{rows.length}</div>
            <div style={styles.statLabel}>Total submissions</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>{completed}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>{started}</div>
            <div style={styles.statLabel}>Started only</div>
          </div>
          <div style={{ ...styles.stat, borderColor: TIER_COLOURS.dimmed + '44' }}>
            <div style={{ ...styles.statNum, color: TIER_COLOURS.dimmed }}>{dimmedCount}</div>
            <div style={styles.statLabel}>Dimmed</div>
          </div>
          <div style={{ ...styles.stat, borderColor: TIER_COLOURS.stirring + '44' }}>
            <div style={{ ...styles.statNum, color: TIER_COLOURS.stirring }}>{stirringCount}</div>
            <div style={styles.statLabel}>Stirring</div>
          </div>
          <div style={{ ...styles.stat, borderColor: TIER_COLOURS.rising + '44' }}>
            <div style={{ ...styles.statNum, color: TIER_COLOURS.rising }}>{risingCount}</div>
            <div style={styles.statLabel}>Rising</div>
          </div>
        </div>

        <div style={styles.controls}>
          {(['all', 'dimmed', 'stirring', 'rising', 'started'] as TierFilter[]).map(f => (
            <button
              key={f}
              style={styles.filterBtn(tierFilter === f)}
              onClick={() => setTierFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'started' ? 'Started only' : TIER_LABELS[f]}
            </button>
          ))}
          <button
            onClick={handleExport}
            disabled={exporting || rows.length === 0}
            style={{
              marginLeft: 'auto',
              padding: '6px 16px',
              borderRadius: 8,
              border: '1px solid #C9962B',
              background: exporting ? '#C9962B22' : 'transparent',
              color: '#C9962B',
              fontSize: 12,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: exporting || rows.length === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              opacity: rows.length === 0 ? 0.4 : 1,
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {exporting ? 'Exporting…' : '↓ Export CSV'}
          </button>
          <input
            style={{ ...styles.searchInput, marginLeft: 0 }}
            placeholder="Search name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th} onClick={() => toggleSort('first_name')}>
                  Name <SortIcon col="first_name" />
                </th>
                <th style={styles.thNoSort}>Email</th>
                <th style={styles.thNoSort}>Status</th>
                <th style={styles.th} onClick={() => toggleSort('total_score')}>
                  Score <SortIcon col="total_score" />
                </th>
                <th style={styles.thNoSort}>Tier</th>
                <th style={styles.thNoSort}>Identity</th>
                <th style={styles.thNoSort}>Energy</th>
                <th style={styles.thNoSort}>Desire</th>
                <th style={styles.thNoSort}>Boundaries</th>
                <th style={styles.thNoSort}>Self-Trust</th>
                <th style={styles.th} onClick={() => toggleSort('created_at')}>
                  Date <SortIcon col="created_at" />
                </th>
                <th style={styles.thNoSort}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={12} style={styles.empty}>No submissions match this filter.</td>
                </tr>
              )}
              {filtered.map(row => (
                <tr key={row.id} style={{ transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAF7F205')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={styles.td}>
                    <span style={{ fontWeight: 500 }}>{row.first_name}</span>
                  </td>
                  <td style={styles.td}>
                    <a href={`mailto:${row.email}`} style={{ color: '#FAF7F2', textDecoration: 'none', opacity: 0.7 }}>
                      {row.email}
                    </a>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: row.status === 'completed' ? '#4a7c59' : '#7c6a5a',
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {row.total_score != null
                      ? <span>{row.total_score}<span style={{ opacity: 0.4, fontSize: 11 }}>/90</span></span>
                      : <span style={{ opacity: 0.3 }}>—</span>
                    }
                  </td>
                  <td style={styles.td}>
                    <TierPill tier={row.tier} />
                  </td>
                  <td style={styles.td}><CatDot tier={row.identity_tier} /></td>
                  <td style={styles.td}><CatDot tier={row.energy_tier} /></td>
                  <td style={styles.td}><CatDot tier={row.desire_tier} /></td>
                  <td style={styles.td}><CatDot tier={row.boundaries_tier} /></td>
                  <td style={styles.td}><CatDot tier={row.selftrust_tier} /></td>
                  <td style={{ ...styles.td, whiteSpace: 'nowrap', opacity: 0.5, fontSize: 12 }}>
                    {new Date(row.created_at).toLocaleDateString('en-AU', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                    <br />
                    <span style={{ fontSize: 11 }}>
                      {new Date(row.created_at).toLocaleTimeString('en-AU', {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </td>
                  <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                    {row.status === 'completed' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <a
                          href={`/results/${row.id}`}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.resultsLink}
                        >
                          View results →
                        </a>
                        <button
                          onClick={() => handleResend(row.id)}
                          disabled={resending === row.id}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: resending === row.id ? 'not-allowed' : 'pointer',
                            fontSize: 12,
                            fontFamily: 'Montserrat, sans-serif',
                            color: resendResult[row.id] === 'ok'
                              ? '#4a7c59'
                              : resendResult[row.id] === 'error'
                                ? '#c0392b'
                                : '#FAF7F250',
                            textAlign: 'left',
                            transition: 'color 0.15s',
                          }}
                        >
                          {resending === row.id
                            ? 'Sending…'
                            : resendResult[row.id] === 'ok'
                              ? '✓ Sent to Holly'
                              : resendResult[row.id] === 'error'
                                ? '✗ Failed — retry'
                                : 'Resend to Holly'}
                        </button>
                        <button
                          onClick={() => handleResendRespondent(row.id)}
                          disabled={resendingResp === row.id}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: resendingResp === row.id ? 'not-allowed' : 'pointer',
                            fontSize: 12,
                            fontFamily: 'Montserrat, sans-serif',
                            color: resendRespResult[row.id] === 'ok'
                              ? '#4a7c59'
                              : resendRespResult[row.id] === 'error'
                                ? '#c0392b'
                                : '#FAF7F250',
                            textAlign: 'left',
                            transition: 'color 0.15s',
                          }}
                        >
                          {resendingResp === row.id
                            ? 'Sending…'
                            : resendRespResult[row.id] === 'ok'
                              ? '✓ Sent to respondent'
                              : resendRespResult[row.id] === 'error'
                                ? '✗ Failed — retry'
                                : 'Resend to respondent'}
                        </button>

                        <div style={{ borderTop: '1px solid #FAF7F210', paddingTop: 6, marginTop: 2 }}>
                          {confirmDelete === row.id ? (
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <span style={{ fontSize: 11, color: '#c0392b', opacity: 0.9 }}>Delete?</span>
                              <button
                                onClick={() => handleDelete(row.id)}
                                disabled={deleting === row.id}
                                style={{
                                  background: '#c0392b22',
                                  border: '1px solid #c0392b88',
                                  borderRadius: 4,
                                  color: '#c0392b',
                                  fontSize: 11,
                                  padding: '1px 7px',
                                  cursor: 'pointer',
                                  fontFamily: 'Montserrat, sans-serif',
                                }}
                              >
                                {deleting === row.id ? '…' : 'Yes, delete'}
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                style={{
                                  background: 'none',
                                  border: '1px solid #FAF7F230',
                                  borderRadius: 4,
                                  color: '#FAF7F260',
                                  fontSize: 11,
                                  padding: '1px 7px',
                                  cursor: 'pointer',
                                  fontFamily: 'Montserrat, sans-serif',
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(row.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                fontSize: 12,
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#FAF7F230',
                                textAlign: 'left',
                                transition: 'color 0.15s',
                              }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#FAF7F230')}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 24, fontSize: 12, opacity: 0.3, textAlign: 'center' }}>
          {filtered.length} of {rows.length} submission{rows.length !== 1 ? 's' : ''} shown
        </p>
      </div>
    </div>
  )
}
