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
import { getUserAction } from '~/app/update-profile/actions'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const Sidebar = () => {
    const { getUser } = getKindeServerSession()
    const user = use(getUser())
    const userProfile = use(getUserAction())

    const isAdmin: boolean = config.adminEmail === user?.email

    return (
        <div className="flex lg:w-1/5 sm:flex-col gap-4 sm:px-2 border-r sm:sticky fixed left-0 sm:top-0 sm:h-screen z-10 right-0 justify-center sm:justify-start bottom-0 p-3 bg-background">
            <Link href={config.routes.updateProfile} className="max-w-fit">
                <Avatar className="sm:mt-4 cursor-pointer">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <AvatarImage
                                    src={userProfile?.image!}
                                    className="object-cover"
                                    alt={user?.family_name!}
                                />
                            </TooltipTrigger>
                            <TooltipContent className="text-xs">
                                {userProfile?.name ??
                                    `${user?.family_name + ' ' + user?.given_name}`}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>

            <nav className="flex sm:flex-col gap-3">
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
                        <Link
                            href={
                                (config.stripe.billingPortal as string) +
                                `?prefilled_email=${user?.email}`
                            }
                            target="_blank"
                        >
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
