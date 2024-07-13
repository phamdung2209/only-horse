'use client'

import { memo } from 'react'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { LayoutDashboard, User } from 'lucide-react'
import Link from 'next/link'

import config from '~/configs'
import { SIDEBAR_LINKS } from '~/lib/const'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import ModeToggle from './mode-toggle'
import { user } from '~/dummy_data/db'
import { usePathname } from 'next/navigation'
import { cn } from '~/lib/utils'

const Sidebar = () => {
    const isAdmin: boolean = true
    const pathname = usePathname()

    return (
        <div className="flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky left-0 top-0 h-screen">
            <Link href={config.routes.updateProfile} className="max-w-fit">
                <Avatar className="mt-4 cursor-pointer">
                    <AvatarImage
                        src={user.image ?? '/user-placeholder.png'}
                        className="object-cover "
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>

            <nav className="flex flex-col gap-3">
                {SIDEBAR_LINKS.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.href}
                        className={cn(
                            'flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal',
                            { 'bg-primary-foreground text-primary': pathname === link.href },
                        )}
                    >
                        <link.icon className="w-6 h-6" />
                        <span className="hidden lg:block">{link.label}</span>
                    </Link>
                ))}

                {isAdmin && (
                    <Link
                        href={config.routes.dashboard}
                        className={cn(
                            'flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal',
                            {
                                'bg-primary-foreground text-primary':
                                    pathname === config.routes.dashboard,
                            },
                        )}
                    >
                        <LayoutDashboard />
                        <span className="hidden lg:block">Dashboard</span>
                    </Link>
                )}

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
                        <LogoutLink>
                            <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
                        </LogoutLink>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    )
}

export default memo(Sidebar)
