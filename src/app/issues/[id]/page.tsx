import { getIssue } from '@/http/get-issue'
import { MoveLeftIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { IssueDetails } from './issue-details'

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

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params

  return (
    <main className="bg-navy-800 border-navy-500 mx-auto flex w-full max-w-[900px] flex-col gap-4 rounded-xl border-[0.5px] p-6">
      <Link
        href="/"
        className="text-navy-200 hover:text-navy-100 flex items-center gap-2"
      >
        <MoveLeftIcon className="size-4" />
        <span className="text-xs">Voltar para o Board</span>
      </Link>

      <IssueDetails issueId={id} />
    </main>
  )
}
