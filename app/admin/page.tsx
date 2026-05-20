import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import AdminDashboard, { type AdminRow } from './AdminDashboard'

export const dynamic = 'force-dynamic'

function isAuthenticated(sessionValue: string | undefined): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password || !sessionValue) return false
  try {
    return sessionValue === Buffer.from(password).toString('base64')
  } catch {
    return false
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!isAuthenticated(session?.value)) {
    redirect('/admin/login')
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('responses')
    .select(
      'id, first_name, email, status, tier, total_score, total_pct, ' +
      'identity_tier, energy_tier, desire_tier, boundaries_tier, selftrust_tier, ' +
      'created_at'
    )
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#181410', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FAF7F2', fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>
          <p style={{ color: '#C9962B', marginBottom: 8 }}>Error loading data</p>
          <p style={{ fontSize: 14, opacity: 0.6 }}>{error.message}</p>
        </div>
      </div>
    )
  }

  return <AdminDashboard rows={(data ?? []) as unknown as AdminRow[]} />
}
