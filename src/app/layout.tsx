import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  title: {
    template: '%s | Gestão do Projeto',
    default: 'Gestão do Projeto'
  },
  description: 'Acompanhe o desenvolvimento de toda a nossa plataforma'
}

const interFont = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className={interFont.className}>
      <body className="bg-navy-950 text-navy-50 antialiased">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
