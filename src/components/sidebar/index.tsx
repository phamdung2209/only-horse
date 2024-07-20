import { memo, use } from 'react'
import { User } from 'lucide-react'
import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import config from '~/configs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ModeToggle from '../mode-toggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import LogoutButton from './logout-button'
import NavLink from './nav-link'

const Sidebar = () => {
    const { getUser } = getKindeServerSession()
    const user = use(getUser())

    const isAdmin: boolean = process.env.ADMIN_EMAIL === user?.email

    return (
        <div className="flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky left-0 top-0 h-screen">
            <Link href={config.routes.updateProfile} className="max-w-fit">
                <Avatar className="mt-4 cursor-pointer">
                    <AvatarImage
                        src={user?.picture ?? '/user-placeholder.png'}
                        className="object-cover"
                        alt={user?.family_name!}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>

            <nav className="flex flex-col gap-3">
                <NavLink isAdmin={isAdmin} />

                <ModeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal">
                        <User className="w-6 h-6" />
                        <span className="hidden lg:block">Setting</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={'#'}>
                            <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                        </Link>
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    )
}

export default memo(Sidebar)
