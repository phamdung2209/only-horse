import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

const RecentSubscriptionSkeleton = () => {
    return (
        <Card className="flex-1">
            <CardHeader className="px-3">
                <CardTitle>Recent Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 px-3">
                <Skeleton className="w-full h-4" />

                {Array.from({ length: 3 }).map((_, idx) => (
                    <div className="flex items-center gap-2" key={idx}>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarFallback>
                                <Skeleton className="w-full h-full" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <Skeleton className="w-20 h-4" />

                            <Skeleton className="w-20 h-4" />
                        </div>
                        <div className="ml-auto font-medium text-sm whitespace-nowrap">
                            <Skeleton className="w-20 h-4" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default RecentSubscriptionSkeleton
