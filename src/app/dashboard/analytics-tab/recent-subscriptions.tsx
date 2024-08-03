import { use } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getDashboardDataAction } from '../actions'

const RecentSubscriptions = () => {
    const { recentSubscriptions } = use(getDashboardDataAction())

    return (
        <Card className="flex-1">
            <CardHeader className="px-3">
                <CardTitle>Recent Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 px-3">
                {recentSubscriptions.length === 0 && (
                    <p className="text-sm text-muted-foreground">No recent subscriptions</p>
                )}

                {recentSubscriptions.map((subscription) => (
                    <div className="flex items-center gap-2" key={subscription.user.email}>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage
                                src={subscription.user.image || '/user-placeholder.png'}
                                alt="Avatar"
                            />
                            <AvatarFallback>
                                {subscription.user.name[0].toUpperCase() ?? 'CN'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-xs font-medium leading-none truncate">
                                {subscription.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {subscription.user.email}
                            </p>
                        </div>
                        <div className="ml-auto font-medium text-sm whitespace-nowrap">
                            +{' '}
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(subscription.price)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default RecentSubscriptions
