import { SearchInput } from './search-input'
import { UserButton } from './user-button'

export function Header() {
  return (
    <div className="mx-auto flex w-full max-w-[900px] items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Product Roadmap</h1>
        <p className="text-navy-100 text-sm">Follow the development of our entire platform</p>
      </div>
      <div className="flex items-center gap-4">
        <SearchInput />
        <UserButton />
      </div>
    </div>
  )
}
