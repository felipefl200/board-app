import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { IssueDrawer } from './issue-drawer'
import { getIssue } from '@/http/get-issue'
import { BackButton } from './back-button'
import { IssueDetails } from '@/app/issues/[id]/issue-details'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { connection } from 'next/server'

interface IssuePageProps {
  params: Promise<{ id: string }>
}

async function IssueModalHeader({ id }: { id: string }) {
  'use cache'
  const issue = await getIssue({ id })

  return (
    <DrawerHeader className="sr-only">
      <DrawerTitle>{issue.title}</DrawerTitle>
      <DrawerDescription>{issue.description}</DrawerDescription>
    </DrawerHeader>
  )
}

async function IssueModalContent({
  params
}: {
  params: Promise<{ id: string }>
}) {
  await connection()
  const { id } = await params

  return (
    <IssueDrawer>
      <DrawerContent className="bg-navy-950 border-navy-800 border-l">
        <Suspense fallback={null}>
          <IssueModalHeader id={id} />
        </Suspense>

        <div className="flex flex-col gap-4 p-6">
          <BackButton />

          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            }
          >
            <IssueDetails issueId={id} />
          </Suspense>
        </div>
      </DrawerContent>
    </IssueDrawer>
  )
}

export default function IssueModalPage({ params }: IssuePageProps) {
  return (
    <Suspense
      fallback={
        <IssueDrawer>
          <DrawerContent className="bg-navy-950 border-navy-800 border-l">
            <div className="flex flex-col gap-4 p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </DrawerContent>
        </IssueDrawer>
      }
    >
      <IssueModalContent params={params} />
    </Suspense>
  )
}
