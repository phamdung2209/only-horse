import { Suspense, use } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import RecentSubscriptions from './recent-subscriptions'
import RecentSales from './recent-sales'
import { getDashboardDataAction } from '../actions'
import { ANALYTICS_ITEMS } from '~/lib/const'
import AnalyticsSkeleton from '~/components/skeletons/dashboard/analytics-skeleton'

const Analytics = () => {
    const { totalRevenue, totalSales, totalSubscriptions } = use(getDashboardDataAction())

    return (
        <Suspense fallback={<AnalyticsSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                {ANALYTICS_ITEMS.map((item, idx) => (
                    <Card key={idx}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent className="flex flex-col gap-2">
                            <div className="text-2xl font-bold">
                                {item.id === 'totalRevenue'
                                    ? new Intl.NumberFormat('en-US', {
                                          style: 'currency',
                                          currency: 'USD',
                                      }).format(totalRevenue)
                                    : item.id === 'totalSales'
                                    ? `+${totalSales}`
                                    : `+${totalSubscriptions}`}
                            </div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                <RecentSubscriptions />
                <RecentSales />
            </div>
        </Suspense>
    )
}

export default Analytics
