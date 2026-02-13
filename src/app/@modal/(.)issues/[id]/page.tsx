import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { IssueDrawer } from './issue-drawer'
import { IssueCommentForm } from '@/components/issue-comment-form'
import { Skeleton } from '@/components/ui/skeleton'
import { getIssue } from '@/http/get-issue'
import { createComment } from '@/http/create-comment'
import { authClient } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { ArchiveIcon } from 'lucide-react'
import { Suspense } from 'react'
import { IssueLikeButton } from '@/app/issues/[id]/issue-comments/issue-like-button'
import IssueCommentsList from '@/app/issues/[id]/issue-comments/issue-commets-list'
import { IssueCommentsListSkeleton } from '@/app/issues/[id]/issue-comments/issue-comments-list-skeleton'
import { BackButton } from './back-button'

interface IssuePageProps {
  params: Promise<{ id: string }>
}

const statusLabels = {
  backlog: 'Backlog',
  todo: 'A Fazer',
  in_progress: 'Em andamento',
  done: 'Concluído'
} as const

export default async function IssueModalPage({ params }: IssuePageProps) {
  const { id } = await params

  const issue = await getIssue({ id })

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    }
  })

  const isAuthenticated = !!session?.user

  async function handleCreateComment(content: string) {
    'use server'
    await createComment({ issueId: id, content })
  }

  return (
    <IssueDrawer>
      <DrawerContent className="bg-navy-950 border-navy-800 border-l">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{issue.title}</DrawerTitle>
          <DrawerDescription>{issue.description}</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 p-6">
          <BackButton />

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
                <IssueCommentsList issueId={id} />
              </Suspense>
            </div>
          </div>
        </div>
      </DrawerContent>
    </IssueDrawer>
  )
}
