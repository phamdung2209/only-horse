import { Home, Shirt } from 'lucide-react'
import config from '~/configs'

export type SidebarLink = typeof SIDEBAR_LINKS

export const SIDEBAR_LINKS = [
    {
        icon: Home,
        label: 'Home',
        href: config.routes.home,
    },
    {
        icon: Shirt,
        label: 'Merch',
        href: config.routes.merch,
    },
]
