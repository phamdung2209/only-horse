import { Home, Shirt } from 'lucide-react'

import Analytics from '~/app/dashboard/analytics-tab'
import ContentTab from '~/app/dashboard/content-tab'
import StoreTab from '~/app/dashboard/store-tab'
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

export const TABS_DASHBOARD = [
    {
        id: 'content',
        label: 'Content',
        component: ContentTab,
    },
    {
        id: 'store',
        label: 'Store',
        component: StoreTab,
    },
    {
        id: 'analytics',
        label: 'Analytics',
        component: Analytics,
    },
]
