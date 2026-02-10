'use client'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonUi } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { BadgeCheckIcon, BellIcon, CreditCardIcon, Loader2Icon, LogInIcon, LogOutIcon, SearchIcon } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'

export function Header() {
  const { data: session, isPending } = authClient.useSession()
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''))

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value, {
      limitUrlUpdates: e.target.value.length > 2 ? debounce(500) : undefined
    })
  }

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/'
    })
  }

  async function handleSignOut() {
    await authClient.signOut()
  }

  return (
    <div className="mx-auto flex w-full max-w-[900px] items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Product Roadmap</h1>
        <p className="text-navy-100 text-sm">Follow the development of our entire platform</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
          <Input value={search} onChange={handleSearchChange} placeholder="Search" className="w-[270px] pl-10" />
        </div>
        {isPending ? (
          <button className="bg-navy-700 border-navy-500 hover:bg-navy-600 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 transition-colors duration-150">
            <Loader2Icon className="text-navy-200 size-3.5 animate-spin" />
          </button>
        ) : session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonUi variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                  <AvatarFallback>
                    {session.user.name.charAt(0).toUpperCase() +
                      session.user.name.split(' ')[1].charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </ButtonUi>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-navy-700 border-navy-500 text-navy-200 cursor-pointer py-0.5"
            >
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOutIcon />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-navy-700 border-navy-500 hover:bg-navy-600 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 transition-colors duration-150"
          >
            <LogInIcon className="text-navy-200 size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
