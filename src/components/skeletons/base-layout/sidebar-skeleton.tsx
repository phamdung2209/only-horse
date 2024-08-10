import { User } from 'lucide-react'

import ModeToggle from '~/components/mode-toggle'
import LogoutButton from '~/components/sidebar/logout-button'
import NavLink from '~/components/sidebar/nav-link'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Skeleton } from '~/components/ui/skeleton'

const SidebarSkeleton = () => {
    return (
        <div className="flex lg:w-1/5 sm:flex-col gap-4 sm:px-2 border-r sm:sticky fixed left-0 sm:top-0 sm:h-screen z-10 right-0 justify-center sm:justify-start bottom-0 p-3 bg-background">
            <Avatar className="sm:mt-4 cursor-pointer">
                <AvatarFallback>
                    <Skeleton className="w-full h-full" />
                </AvatarFallback>
            </Avatar>

            <nav className="flex sm:flex-col gap-3">
                <NavLink isAdmin={false} />

                <ModeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal">
                        <User className="w-6 h-6" />
                        <span className="hidden lg:block">Setting</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    )
}

export default SidebarSkeleton
