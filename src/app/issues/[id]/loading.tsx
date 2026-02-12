import { Skeleton } from '@/components/ui/skeleton'
import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { IssueCommentsListSkeleton } from './issue-comments/issue-comments-list-skeleton'

export default function IssueLoading() {
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
        <Skeleton className="h-7 w-24 rounded-lg" />
        <Skeleton className="h-7 w-16 rounded-md" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-8 w-2/3" />

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-24" />
        <div className="mt-3">
          <IssueCommentsListSkeleton />
        </div>
      </div>
    </main>
  )
}
