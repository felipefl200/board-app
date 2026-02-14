import { IssueCommentForm } from '@/components/issue-comment-form'
import { Skeleton } from '@/components/ui/skeleton'
import { createComment } from '@/http/create-comment'
import { getIssue } from '@/http/get-issue'
import { authClient } from '@/lib/auth-client'
import { ArchiveIcon } from 'lucide-react'
import { updateTag } from 'next/cache'
import { headers } from 'next/headers'
import { Suspense } from 'react'
import { IssueCommentsListSkeleton } from './issue-comments/issue-comments-list-skeleton'
import IssueCommentsList from './issue-comments/issue-commets-list'
import { IssueLikeButton } from './issue-comments/issue-like-button'

interface IssueDetailsProps {
  issueId: string
}

const statusLabels = {
  backlog: 'Backlog',
  todo: 'A Fazer',
  in_progress: 'Em andamento',
  done: 'Concluído'
} as const

export async function IssueDetails({ issueId }: IssueDetailsProps) {
  const issue = await getIssue({ id: issueId })

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    }
  })

  const isAuthenticated = !!session?.user

  async function handleCreateComment(content: string) {
    'use server'
    await createComment({ issueId, content })
    updateTag('issues')
    updateTag(`comments-${issueId}`)
  }
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="bg-navy-700 flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs">
          <ArchiveIcon className="size-3" />
          {statusLabels[issue.status]}
        </span>
        <Suspense fallback={<Skeleton className="h-6 w-10" />}>
          <IssueLikeButton issueId={issue.id} />
        </Suspense>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{issue.title}</h1>
        <p className="text-navy-100 text-sm leading-relaxed">
          {issue.description}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Comentários</span>

        <IssueCommentForm
          onCreateComment={handleCreateComment}
          isAuthenticated={isAuthenticated}
        />

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsListSkeleton />}>
            <IssueCommentsList issueId={issueId} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
