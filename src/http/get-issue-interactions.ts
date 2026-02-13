import { IssueInteractionsResponseSchema } from '@/api/routes/schemas/issue-interactions'
import { clientEnv } from '@/lib/client-env'

interface IssueInteractionParams {
  issueIds: string[]
}

export async function getIssueInteractions({
  issueIds
}: IssueInteractionParams) {
  const url = new URL('/api/issues/interactions', clientEnv.NEXT_PUBLIC_API_URL)
  url.searchParams.set('issueIds', issueIds.join(','))

  const response = await fetch(url, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch issue interactions')
  }

  const data = await response.json()

  return IssueInteractionsResponseSchema.parse(data)
}
