import { cn } from '@/lib/utils'

function Input({ className, children, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'bg-navy-900 border-navy-500 placeholder-navy-200 flex h-10 cursor-pointer items-center rounded-lg border-[0.5px] px-3 text-sm',
        'focus-visible:ring-navy-400 focus-visible:ring-offset-navy-950 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </input>
  )
}

export { Input }
