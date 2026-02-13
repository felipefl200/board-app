'use client'
import { Loader2Icon, MessageCircleIcon } from 'lucide-react'
import { Input } from './input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { cn } from '@/lib/utils'

const createCommentSchema = z.object({
  content: z.string().min(1, 'Comentário não pode ser vazio')
})

type CreateCommentSchema = z.infer<typeof createCommentSchema>

interface IssueCommentFormProps {
  onCreateComment: (content: CreateCommentSchema['content']) => Promise<void>
  isAuthenticated: boolean
}

export function IssueCommentForm({
  onCreateComment,
  isAuthenticated
}: IssueCommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema)
  })

  async function onSubmit(data: CreateCommentSchema) {
    await onCreateComment(data.content)
    reset()
  }

  return (
    <>
      <form
        action=""
        className="relative w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          disabled={!isAuthenticated}
          {...register('content')}
          className="bg-navy-900 h-11 w-full pr-24"
          placeholder={
            isAuthenticated
              ? 'Adicione um comentário...'
              : 'Faça login para comentar'
          }
        />

        <button
          disabled={isSubmitting || !isAuthenticated}
          type="submit"
          className={cn(
            'absolute top-1/2 right-1 flex -translate-y-1/2 cursor-pointer items-center justify-center gap-2 rounded-lg bg-sky-700 px-3 py-1.5 hover:bg-sky-600',
            {
              'opacity-50': !isAuthenticated,
              'cursor-not-allowed': !isAuthenticated,
              'cursor-pointer': isAuthenticated,
              group: isAuthenticated
            }
          )}
        >
          <span className="text-sm font-semibold">Publicar</span>
          {isSubmitting ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <MessageCircleIcon className="size-4 transition-transform duration-200 ease-in group-hover:scale-115 group-hover:delay-100" />
          )}
        </button>
      </form>
      {errors.content?.message && (
        <span className="text-xs text-red-400">{errors.content.message}</span>
      )}
    </>
  )
}
