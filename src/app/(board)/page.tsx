import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Section } from '@/components/section'
import { MessageCircleIcon, ThumbsUpIcon } from 'lucide-react'

type BoardPageProps = {
  searchParams: Promise<{ q?: string }>
}
export default async function BoardPage({ searchParams }: BoardPageProps) {
  const { q } = await searchParams

  console.log(q)

  return (
    <main className="grid flex-1 grid-cols-4 items-stretch gap-5">
      <Section.Root>
        <Section.Header>
          <Section.Title>Backlog</Section.Title>
          <Section.IssueCount>2</Section.IssueCount>
        </Section.Header>
        <Section.Content>
          <Card.Root href="/">
            <Card.Header>
              <Card.Number>ECO-002</Card.Number>
              <Card.Title>Implementar cartão de crédito</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Button
                type="button"
                className="text-navy-100 bg-navy-600 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1"
              >
                <ThumbsUpIcon className="size-3" />
                <span className="text-sm">12</span>
              </Button>
              <Button
                type="button"
                className="text-navy-100 bg-navy-600 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1"
              >
                <MessageCircleIcon className="size-3" />
                <span className="text-sm">6</span>
              </Button>
            </Card.Footer>
          </Card.Root>
        </Section.Content>
      </Section.Root>
    </main>
  )
}
