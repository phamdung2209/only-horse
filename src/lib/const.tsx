import { CreditCard, DollarSign, Home, Shirt, Users } from 'lucide-react'
import dynamic from 'next/dynamic'

import AnalyticsSkeleton from '~/components/skeletons/dashboard/analytics-skeleton'
import config from '~/configs'
const Analytics = dynamic(() => import('~/app/dashboard/analytics-tab'), {
    loading: () => <AnalyticsSkeleton />,
})
const ContentTab = dynamic(() => import('~/app/dashboard/content-tab'))
const StoreTab = dynamic(() => import('~/app/dashboard/store-tab'))

export type SidebarLink = typeof SIDEBAR_LINKS
export type TTabs_Dashboard = {
    id: string
    label: string
    component?: React.ComponentType
}

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

export const TABS_DASHBOARD: TTabs_Dashboard[] = [
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

export const TABS_DASHBOARD_SKELETON: TTabs_Dashboard[] = [
    ...TABS_DASHBOARD.map(({ id, label }) => ({ id, label })),
]

export const ANALYTICS_ITEMS = [
    {
        id: 'totalRevenue',
        label: 'Total Revenue',
        icon: DollarSign,
    },
    {
        id: 'totalSales',
        label: 'Sales',
        icon: CreditCard,
    },
    {
        id: 'totalSubscriptions',
        label: 'Subscriptions',
        icon: Users,
    },
]
