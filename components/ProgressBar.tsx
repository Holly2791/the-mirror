interface Props {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100)
  return (
    <div style={{ height: '3px', background: '#2C2318', position: 'relative' }}>
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: '#C9962B',
          transition: 'width 0.4s ease',
        }}
      />
    </div>
  )
}
