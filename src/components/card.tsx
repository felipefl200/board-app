import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ComponentProps } from 'react'

function CardRoot({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'bg-navy-700 border-navy-600 block space-y-4 rounded-lg border-[0.5px] p-3',
        'hover:bg-navy-600/50 hover:border-navy-500 transition-colors duration-150',
        'focus-visible:ring-navy-400 focus-visible:ring-offset-navy-950 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

function CardTitle({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('text-sm font-medium', className)} {...props} />
}

function CardNumber({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('text-navy-200 text-xs', className)} {...props} />
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex items-center gap-2', className)} {...props} />
}

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Number: CardNumber,
  Footer: CardFooter
}
