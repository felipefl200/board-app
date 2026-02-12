'use client'

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { ButtonUi } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'

export function UserButton() {
  const { data: session, isPending } = authClient.useSession()
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
    <>
      {isPending ? (
        <button className="bg-navy-700 border-navy-500 hover:bg-navy-600 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 transition-colors duration-150">
          <Loader2Icon className="text-navy-200 size-3.5 animate-spin" />
        </button>
      ) : session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonUi variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src={session.user.image || undefined}
                  alt={session.user.name}
                />
                <AvatarFallback>
                  {session.user.name.charAt(0).toUpperCase() +
                    session.user.name.split(' ')[1].charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </ButtonUi>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
    </>
  )
}
