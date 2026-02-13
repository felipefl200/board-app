import { LikeResponseSchema } from '@/api/routes/schemas/issue-likes'
import { clientEnv } from '@/lib/client-env'

export async function toggleLike({ issueId }: { issueId: string }) {
  const url = new URL(
    `/api/issues/${issueId}/like`,
    clientEnv.NEXT_PUBLIC_API_URL
  )

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Failed to toggle like')
  }

  const data = await response.json()

  return LikeResponseSchema.parse(data)
}
