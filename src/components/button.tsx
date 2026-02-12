import { cn } from '@/lib/utils'

function Button({
  className,
  children,
  type = 'button',
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={cn(
        'text-navy-100 bg-navy-600 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1',
        'hover:bg-navy-500 transition-colors duration-150',
        'focus-visible:ring-navy-400 focus-visible:ring-offset-navy-950 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
