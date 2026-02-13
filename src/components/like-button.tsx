'use client'

import { IssueInteractionsResponseSchema } from '@/api/routes/schemas/issue-interactions'
import { Button } from '@/components/button'
import { toggleLike } from '@/http/toggle-like'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ThumbsUpIcon } from 'lucide-react'
import React from 'react'
import z from 'zod'

interface LikeButtonProps extends React.ComponentProps<'button'> {
  issueId: string
  initialLikesCount: number
  initialLiked?: boolean
}

type IssueInteractionsResponse = z.infer<typeof IssueInteractionsResponseSchema>

export function LikeButton({
  issueId,
  initialLikesCount,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient()
  const { mutate: handleToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['issue-interactions', issueId]
      })

      const previousData = queryClient.getQueryData<IssueInteractionsResponse>([
        'issue-interactions',
        issueId
      ])

      queryClient.setQueryData<IssueInteractionsResponse>(
        ['issue-interactions', issueId],
        oldData => {
          if (!oldData) {
            return undefined
          }

          return {
            ...oldData,
            interactions: oldData.interactions.map(interaction => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                  isLiked: !interaction.isLiked
                }
              }

              return interaction
            })
          }
        }
      )

      return { previousData }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<IssueInteractionsResponse>(
          ['issue-interactions', issueId],
          context.previousData
        )
      }
    }
  })

  const liked = initialLiked

  return (
    <Button
      onClick={() => handleToggleLike()}
      data-liked={liked}
      disabled={isPending}
      className="data-[liked=true]:text-navy-50 data-[liked=true]:bg-sky-600"
      aria-label={liked ? 'Descurtir' : 'Curtir'}
      {...props}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikesCount}</span>
    </Button>
  )
}
