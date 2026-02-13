'use client'

import { LikeButton } from '@/components/like-button'
import { Skeleton } from '@/components/ui/skeleton'
import { getIssueInteractions } from '@/http/get-issue-interactions'
import { useQuery } from '@tanstack/react-query'

interface IssueLikeButtonProps {
  issueId: string
}

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['issue-interactions', issueId],
    queryFn: () => getIssueInteractions({ issueIds: [issueId] })
  })

  if (isLoading) {
    return <Skeleton className="h-6 w-10" />
  }

  const interaction = data?.interactions[0]

  return (
    <LikeButton
      issueId={issueId}
      initialLikesCount={interaction?.likesCount ?? 0}
      initialLiked={interaction?.isLiked ?? false}
    />
  )
}
