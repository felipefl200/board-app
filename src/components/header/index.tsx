import { Suspense } from 'react'
import { SearchInput } from './search-input'
import { UserButton } from './user-button'

export function Header() {
  return (
    <div className="mx-auto flex w-full max-w-[900px] items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Gestão do Projeto</h1>
        <p className="text-navy-100 text-sm">
          Acompanhe o desenvolvimento de toda a nossa plataforma
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
        <UserButton />
      </div>
    </div>
  )
}
