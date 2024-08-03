import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

const SuggestProductsSkeleton = () => {
    return (
        <div className="lg:w-2/5 hidden lg:flex flex-col gap-3 px-2 sticky top-0 right-0 h-screen mt-20">
            <div className="flex flex-col gap-2">
                <p className="uppercase text-muted-foreground font-semibold tracking-tight">
                    Recommended for you
                </p>

                <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Card className="flex flex-col" key={idx}>
                            <CardHeader className="px-2 flex flex-row items-center justify-between space-y-0 pb-0">
                                <CardTitle className="text-sm font-medium">
                                    <Skeleton className="w-28 h-4" />
                                </CardTitle>
                                <Skeleton className="w-16 h-4" />
                            </CardHeader>

                            <CardContent className="flex flex-col flex-1 gap-2 p-2">
                                <Skeleton className="h-48" />

                                <Button asChild>
                                    <Skeleton className="w-full h-10" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuggestProductsSkeleton
