import { Skeleton } from '@/components/ui/skeleton'

export function IssueCommentsListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <div
            key={i}
            className="bg-navy-700 border-navy-600 block space-y-4 rounded-lg border-[0.5px] p-3"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>

            <div className="bg-navy-700 border-navy-600 flex flex-1 flex-col gap-1 rounded-lg border-[0.5px] px-3 py-2.5">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
