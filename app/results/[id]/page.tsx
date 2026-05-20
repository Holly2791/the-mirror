import { createServerClient } from '@/lib/supabase-server'
import ResultsPage from '@/components/results/ResultsPage'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ResultsPageRoute({ params }: Props) {
  const { id } = await params
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('id', id)
    .eq('status', 'completed')
    .single()

  if (error || !data) {
    notFound()
  }

  return <ResultsPage data={data} />
}
