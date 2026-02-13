import { CommentsListResponseSchema } from '@/api/routes/list-issue-comments'
import { setTimeout } from 'node:timers/promises'

interface ListIssueCommentsProps {
  issueId: string
}
export async function listIssueComments({ issueId }: ListIssueCommentsProps) {
  await setTimeout(2000)

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/api/issues/${issueId}/comments`
  )

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch issue comments')
  }

  const data = await response.json()

  return CommentsListResponseSchema.parse(data)
}
