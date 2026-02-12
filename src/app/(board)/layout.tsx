import { Metadata } from 'next'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Board'
}

export default function BoardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-[1620px] flex-col gap-8 p-10">
      <Header />
      {children}
    </div>
  )
}
