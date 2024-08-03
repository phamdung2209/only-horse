import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { ANALYTICS_ITEMS } from '~/lib/const'
import RecentSubscriptionSkeleton from './recent-subscription-skeleton'
import RecentSaleSkeleton from './recent-sale-skeleton'

const AnalyticsSkeleton = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                {ANALYTICS_ITEMS.map((item) => (
                    <Card key={item.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent className="flex flex-col gap-2">
                            <Skeleton className="w-28 h-4" />
                            <Skeleton className="w-16 h-4" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex flex-wrap gap-5 my-5`">
                <RecentSubscriptionSkeleton />
                <RecentSaleSkeleton />
            </div>
        </>
    )
}

export default AnalyticsSkeleton
