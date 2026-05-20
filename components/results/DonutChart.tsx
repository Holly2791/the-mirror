'use client'
import { PieChart, Pie, Cell } from 'recharts'

const GOLD_COLORS = ['#C9962B', '#D4A63A', '#E8C87A', '#F0D89A', '#F5EDD8']

interface Category {
  name: string
  score: number
}

interface Props {
  categories: Category[]
  totalPct: number
}

export default function DonutChart({ categories, totalPct }: Props) {
  const data = categories.map(cat => ({ name: cat.name, value: Math.max(cat.score, 0.5) }))

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx={120}
          cy={120}
          innerRadius={75}
          outerRadius={108}
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={GOLD_COLORS[index % GOLD_COLORS.length]} stroke="none" />
          ))}
        </Pie>
      </PieChart>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        width: '130px',
      }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '9px', letterSpacing: '1px', color: '#4A3F32', textTransform: 'uppercase', lineHeight: '1.4' }}>
          Your Overall<br />Score
        </p>
        <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '28px', fontWeight: '700', color: '#C9962B', lineHeight: 1 }}>
          {totalPct}%
        </p>
      </div>
    </div>
  )
}
