'use client'

import { MoveLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="text-navy-200 hover:text-navy-100 flex cursor-pointer items-center gap-2"
    >
      <MoveLeftIcon className="size-4" />
      <span className="text-xs">Back to board</span>
    </button>
  )
}
