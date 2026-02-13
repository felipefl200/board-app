'use client'

import { IssuesListResponseSchema } from '@/api/routes/list-issues'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { LikeButton } from '@/components/like-button'
import { Section } from '@/components/section'
import { getIssueInteractions } from '@/http/get-issue-interactions'
import { useQuery } from '@tanstack/react-query'
import { MessageCircleIcon, ThumbsUpIcon } from 'lucide-react'
import { useMemo } from 'react'
import type z from 'zod'

interface BoardContentProps {
  issues: z.infer<typeof IssuesListResponseSchema>
}

type InteractionsMap = Map<string, { isLiked: boolean; likesCount: number }>

export default function BoardContent({ issues }: BoardContentProps) {
  const allIssuesIds = [
    ...issues.backlog.map(issue => issue.id),
    ...issues.todo.map(issue => issue.id),
    ...issues.in_progress.map(issue => issue.id),
    ...issues.done.map(issue => issue.id)
  ]
  const { data: interactionsData, isLoading: interactionsLoading } = useQuery({
    queryKey: ['issues-likes', allIssuesIds.sort().join(',')],
    queryFn: () => getIssueInteractions({ issueIds: allIssuesIds })
  })

  const interactions = useMemo(() => {
    if (!interactionsData) return new Map() as InteractionsMap

    return new Map(
      interactionsData.interactions.map(interaction => [
        interaction.issueId,
        {
          isLiked: interaction.isLiked,
          likesCount: interaction.likesCount
        }
      ])
    )
  }, [interactionsData]) as InteractionsMap

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
              const interaction = interactions.get(issue.id)
              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikesCount={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button
                      type="button"
                      className="text-navy-100 bg-navy-600 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1"
                    >
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
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
              const interaction = interactions.get(issue.id)
              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikesCount={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button
                      type="button"
                      className="text-navy-100 bg-navy-600 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1"
                    >
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
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
              const interaction = interactions.get(issue.id)
              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikesCount={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button
                      type="button"
                      className="text-navy-100 bg-navy-600 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1"
                    >
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
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
              const interaction = interactions.get(issue.id)
              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikesCount={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button
                      type="button"
                      className="text-navy-100 bg-navy-600 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1"
                    >
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
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
