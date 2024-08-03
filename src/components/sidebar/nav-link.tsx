'use client'

import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import config from '~/configs'
import { SIDEBAR_LINKS } from '~/lib/const'
import { cn } from '~/lib/utils'

const NavLink = ({ isAdmin = false }: { isAdmin: boolean }) => {
    const pathname = usePathname()

    return (
        <>
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
        </>
    )
}

export default NavLink
