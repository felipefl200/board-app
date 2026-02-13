import { ThumbsUpIcon } from 'lucide-react'
import type { ComponentProps, MouseEvent } from 'react'
import { Button } from './button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleLike } from '@/http/toggle-like'
import type { IssueInteractionsResponseSchema } from '@/api/routes/schemas/issue-interactions'
import type { z } from 'zod'
interface LikeButtonProps extends ComponentProps<'button'> {
  issueId: string
  initialLikesCount: number
  initialLiked?: boolean
}

type IssueInteractionResponse = z.infer<typeof IssueInteractionsResponseSchema>

export function LikeButton({
  issueId,
  initialLikesCount,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient()

  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['issues-likes'] })
      await queryClient.cancelQueries({ queryKey: ['issue-interactions'] })

      const previousBoardData =
        queryClient.getQueriesData<IssueInteractionResponse>({
          queryKey: ['issues-likes']
        })

      const previousIssueData =
        queryClient.getQueriesData<IssueInteractionResponse>({
          queryKey: ['issue-interactions']
        })

      const updater = (old: IssueInteractionResponse | undefined) => {
        if (!old) return undefined

        return {
          ...old,
          interactions: old.interactions.map(interaction => {
            if (interaction.issueId === issueId) {
              return {
                ...interaction,
                isLiked: !interaction.isLiked,
                likesCount: interaction.isLiked
                  ? interaction.likesCount - 1
                  : interaction.likesCount + 1
              }
            }

            return interaction
          })
        }
      }

      queryClient.setQueriesData<IssueInteractionResponse>(
        { queryKey: ['issues-likes'] },
        updater
      )

      queryClient.setQueriesData<IssueInteractionResponse>(
        { queryKey: ['issue-interactions'] },
        updater
      )

      return { previousData: [...previousBoardData, ...previousIssueData] }
    },
    onError: async (_err, _params, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData<IssueInteractionResponse>(queryKey, data)
        }
      }
    }
  })

  function handleToggleLike(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    onToggleLike()
  }

  const liked = initialLiked

  return (
    <Button
      {...props}
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500"
      aria-label={liked ? 'Unlike' : 'Like'}
      disabled={isPending}
      onClick={handleToggleLike}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikesCount}</span>
    </Button>
  )
}
