import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Section } from '@/components/section'
import { listIssues } from '@/http/list-issues'
import { MessageCircleIcon, ThumbsUpIcon } from 'lucide-react'

type BoardPageProps = {
  searchParams: Promise<{ q?: string }>
}
export default async function BoardPage({ searchParams }: BoardPageProps) {
  const { q } = await searchParams

  const issues = await listIssues({ search: q })

  return (
    <main className="grid flex-1 grid-cols-4 items-stretch gap-5">
      {/* Backlog */}
      <Section.Root>
        <Section.Header>
          <Section.Title>Backlog</Section.Title>
          <Section.IssueCount>{issues.backlog.length}</Section.IssueCount>
        </Section.Header>
        <Section.Content>
          {issues.backlog.length === 0 ? (
            <div className="text-navy-200 flex items-center justify-center py-8 text-center text-sm">
              <p>Nenhuma issue encontrada.</p>
            </div>
          ) : (
            issues.backlog.map(issue => {
              return (
                <Card.Root href="/" key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
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
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      {/* Todo */}
      <Section.Root>
        <Section.Header>
          <Section.Title>To-Do</Section.Title>
          <Section.IssueCount>{issues.todo.length}</Section.IssueCount>
        </Section.Header>
        <Section.Content>
          {issues.todo.length === 0 ? (
            <div className="text-navy-200 flex items-center justify-center py-8 text-center text-sm">
              <p>Nenhum to-do encontrado.</p>
            </div>
          ) : (
            issues.todo.map(issue => {
              return (
                <Card.Root href="/" key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
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
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      {/* In Progress */}
      <Section.Root>
        <Section.Header>
          <Section.Title>In Progress</Section.Title>
          <Section.IssueCount>{issues.in_progress.length}</Section.IssueCount>
        </Section.Header>
        <Section.Content>
          {issues.in_progress.length === 0 ? (
            <div className="text-navy-200 flex items-center justify-center py-8 text-center text-sm">
              <p>Nenhum in progress encontrado.</p>
            </div>
          ) : (
            issues.in_progress.map(issue => {
              return (
                <Card.Root href="/" key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
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
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      {/* Done */}
      <Section.Root>
        <Section.Header>
          <Section.Title>Done</Section.Title>
          <Section.IssueCount>{issues.done.length}</Section.IssueCount>
        </Section.Header>
        <Section.Content>
          {issues.done.length === 0 ? (
            <div className="text-navy-200 flex items-center justify-center py-8 text-center text-sm">
              <p>Nenhum done encontrado.</p>
            </div>
          ) : (
            issues.done.map(issue => {
              return (
                <Card.Root href="/" key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
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
              )
            })
          )}
        </Section.Content>
      </Section.Root>
    </main>
  )
}
