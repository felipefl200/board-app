import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function CommentRoot({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-navy-700 border-navy-600 block space-y-4 rounded-lg border-[0.5px] p-3',
        className
      )}
      {...props}
    />
  )
}

function CommentAvatar({
  className,
  src,
  alt
}: ComponentProps<typeof Avatar> & { src: string; alt?: string }) {
  return (
    <Avatar className={cn('size-6 rounded-full', className)}>
      <AvatarImage src={src} alt={alt} className="" />
      <AvatarFallback>
        {alt
          ?.split(' ')
          .map(chunk => chunk[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'UN'}
      </AvatarFallback>
    </Avatar>
  )
}

function CommentContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-navy-700 border-navy-600 flex flex-1 flex-col gap-1 rounded-lg border-[0.5px] px-3 py-2.5',
        className
      )}
      {...props}
    />
  )
}

function CommentHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex items-center gap-1', className)} {...props} />
}

function CommentAuthor({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('text-sm font-medium', className)} {...props} />
}

function CommentTime({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('text-navy-200 text-xs', className)} {...props} />
}

function CommentText({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-navy-100 text-sm leading-relaxed', className)}
      {...props}
    />
  )
}

export const Comment = {
  Root: CommentRoot,
  Header: CommentHeader,
  Avatar: CommentAvatar,
  Content: CommentContent,
  Author: CommentAuthor,
  Time: CommentTime,
  Text: CommentText
}
