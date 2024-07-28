import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const MerchSkeleton = () => {
    return (
        <Card>
            <CardHeader className="px-2 gap-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-7 flex-1" />
                <Skeleton className="h-7 flex-[0.2]" />
            </CardHeader>

            <CardContent className="flex flex-col flex-1 gap-10">
                <Skeleton className="h-80 w-full" />
                <div className="flex justify-center mt-auto">
                    <Skeleton className="h-10 w-1/2" />
                </div>
            </CardContent>
        </Card>
    )
}

export default MerchSkeleton
