'use client'
import { Input } from '@/components/input'
import { SearchIcon } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'

export function SearchInput() {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault('').withOptions({ shallow: false }))

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value, {
      limitUrlUpdates: e.target.value.length > 2 ? debounce(500) : undefined
    })
  }
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search"
        type="search"
        className="w-[270px] pl-10"
      />
    </div>
  )
}
