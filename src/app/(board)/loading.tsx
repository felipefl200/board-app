import { Section } from '@/components/section'
import { Skeleton } from '@/components/ui/skeleton'

export default function BoardLoading() {
  return (
    <main className="grid flex-1 grid-cols-4 items-stretch gap-5">
      {Array.from({ length: 4 }).map((_, columnIndex) => (
        <Section.Root key={columnIndex}>
          <Section.Header>
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-5 w-6 rounded-full" />
          </Section.Header>
          <Section.Content>
            {Array.from({ length: 5 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="bg-navy-700 border-navy-600 block space-y-4 rounded-lg border-[0.5px] p-3"
              >
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-6 w-10 rounded-full" />
                </div>
              </div>
            ))}
          </Section.Content>
        </Section.Root>
      ))}
    </main>
  )
}
