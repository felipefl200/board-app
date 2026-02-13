'use client'

import { Drawer } from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'

interface IssueDrawerProps {
  children: React.ReactNode
}

export function IssueDrawer({ children }: IssueDrawerProps) {
  const router = useRouter()

  function handleOpenChange(open: boolean) {
    if (!open) {
      router.back()
    }
  }

  return (
    <Drawer
      defaultOpen
      direction="right"
      onOpenChange={handleOpenChange}
      handleOnly
      noBodyStyles
      className="overflow-y-auto"
    >
      {children}
    </Drawer>
  )
}
