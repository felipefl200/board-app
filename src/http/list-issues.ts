import { IssuesListResponseSchema } from '@/api/routes/list-issues'
import { clientEnv } from '@/lib/client-env'
import { cacheTag } from 'next/cache'

type ListIssuesParams = {
  search?: string
}

export async function listIssues({ search }: ListIssuesParams) {
  'use cache'
  cacheTag('issues')

  const url = new URL('/api/issues', clientEnv.NEXT_PUBLIC_API_URL)

  if (search) url.searchParams.set('search', search)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch issues')
  }

  const data = await response.json()

  return IssuesListResponseSchema.parse(data)
}
