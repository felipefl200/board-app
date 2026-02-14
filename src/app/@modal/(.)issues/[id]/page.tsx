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

interface IssuePageProps {
  params: Promise<{ id: string }>
}

export default async function IssueModalPage({ params }: IssuePageProps) {
  const { id } = await params

  const issue = await getIssue({ id })

  return (
    <IssueDrawer>
      <DrawerContent className="bg-navy-950 border-navy-800 border-l">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{issue.title}</DrawerTitle>
          <DrawerDescription>{issue.description}</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 p-6">
          <BackButton />

          <IssueDetails issueId={id} />
        </div>
      </DrawerContent>
    </IssueDrawer>
  )
}
