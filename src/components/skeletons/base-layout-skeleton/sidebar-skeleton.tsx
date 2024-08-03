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

const SidebarSkeleton = () => {
    return (
        <div className="flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky left-0 top-0 h-screen z-10">
            <Avatar className="mt-4 cursor-pointer">
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <nav className="flex flex-col gap-3">
                <NavLink isAdmin={true} />

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
