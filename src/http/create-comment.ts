import { CommentSchema } from '@/api/routes/create-comment'
import { clientEnv } from '@/lib/client-env'
import { headers } from 'next/headers'
import { getCookieFromHeaders } from './utils/get-cookies-from-headers'

interface CreateCommentParams {
  issueId: string
  content: string
}

export async function createComment({ issueId, content }: CreateCommentParams) {
  const url = new URL(
    `/api/issues/${issueId}/comments`,
    clientEnv.NEXT_PUBLIC_API_URL
  )

  const incomingHeaders = await headers()

  const response = await fetch(url, {
    method: 'POST',
    headers: getCookieFromHeaders(incomingHeaders),
    body: JSON.stringify({
      text: content
    })
  })

  if (!response.ok) {
    throw new Error('Failed to create comment')
  }

  const data = await response.json()

  return CommentSchema.parse(data)
}
