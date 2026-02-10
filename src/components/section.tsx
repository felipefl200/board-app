import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

function SectionRoot({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-navy-800 border-navy-500 relative flex flex-col gap-1 overflow-hidden rounded-xl border-[0.5px] pt-3',
        className
      )}
      {...props}
    />
  )
}

function SectionHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex items-center justify-between px-3', className)} {...props} />
}

function SectionTitle({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span className={cn('bg-navy-700 flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs', className)} {...props} />
  )
}

function SectionIssueCount({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('text-navy-200 text-xs', className)} {...props} />
}

function SectionContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('navy-scrollbar absolute inset-0 top-13 flex flex-col gap-2.5 overflow-y-auto p-3 pr-2', className)}
      {...props}
    />
  )
}

export const Section = {
  Root: SectionRoot,
  Header: SectionHeader,
  Title: SectionTitle,
  IssueCount: SectionIssueCount,
  Content: SectionContent
}
