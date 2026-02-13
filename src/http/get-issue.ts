import { IssueSchema } from '@/api/routes/get-issue'

interface GetIssueParams {
  id: string
}

export const getIssue = async ({ id }: GetIssueParams) => {
  const url = new URL(`/api/issues/${id}`, process.env.NEXT_PUBLIC_API_URL)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch issue')
  }

  const data = await response.json()

  return IssueSchema.parse(data)
}
