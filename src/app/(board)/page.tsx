import { listIssues } from '@/http/list-issues'
import BoardContent from './board-content'

type BoardPageProps = {
  searchParams: Promise<{ q?: string }>
}
export default async function BoardPage({ searchParams }: BoardPageProps) {
  const { q } = await searchParams

  const issues = await listIssues({ search: q })

  return <BoardContent issues={issues} />
}
