import { Button } from '@/components/button'
import { getIssue } from '@/http/get-issue'
import {
  ArchiveIcon,
  MessageCircleIcon,
  MoveLeftIcon,
  ThumbsUpIcon
} from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import IssueCommentsList from './issue-comments/issue-commets-list'
import { Suspense } from 'react'
import { IssueCommentsListSkeleton } from './issue-comments/issue-comments-list-skeleton'
import { Input } from '@/components/input'
import { IssueLikeButton } from './issue-comments/issue-like-button'
import { Skeleton } from '@/components/ui/skeleton'

interface IssuePageProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params
}: IssuePageProps): Promise<Metadata> => {
  const { id } = await params
  const issue = await getIssue({ id })
  return {
    title: `Issue: ${issue.title}`,
    description: issue.description
  }
}

const statusLabels = {
  backlog: 'Backlog',
  todo: 'A Fazer',
  in_progress: 'Em andamento',
  done: 'Concluído'
} as const
export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params

  const issue = await getIssue({ id })
  return (
    <main className="bg-navy-800 border-navy-500 mx-auto flex w-full max-w-[900px] flex-col gap-4 rounded-xl border-[0.5px] p-6">
      <Link
        href="/"
        className="text-navy-200 hover:text-navy-100 flex items-center gap-2"
      >
        <MoveLeftIcon className="size-4" />
        <span className="text-xs">Voltar para o Board</span>
      </Link>

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

        <form action="" className="relative w-full">
          <Input
            className="bg-navy-900 h-11 w-full pr-24"
            placeholder="Adicione um comentário..."
          />
          <button
            type="submit"
            className="group absolute top-1/2 right-1 flex -translate-y-1/2 cursor-pointer items-center justify-center gap-2 rounded-lg bg-sky-700 px-3 py-1.5 hover:bg-sky-600"
          >
            <span className="text-sm font-semibold">Publicar</span>
            <MessageCircleIcon className="size-4 transition-transform duration-200 ease-in group-hover:scale-115 group-hover:delay-100" />
          </button>
        </form>

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsListSkeleton />}>
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
