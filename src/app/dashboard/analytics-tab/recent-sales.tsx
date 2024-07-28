import { use } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getDashboardDataAction } from '../actions'

const RecentSales = () => {
    // const recentSales = [
    //     {
    //         user: {
    //             name: 'John Doe',
    //             email: 'john@email.com',
    //             image: '',
    //         },
    //         price: 10_00,
    //     },
    //     {
    //         user: {
    //             name: 'Jane Doe',
    //             email: 'jane@email.com',
    //             image: '',
    //         },
    //         price: 200_0 + 1,
    //     },
    // ]
    const { recentSales } = use(getDashboardDataAction())

    return (
        <Card className="flex-1">
            <CardHeader className="px-3">
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 px-3">
                {recentSales.length === 0 && (
                    <p className="text-sm text-muted-foreground">No recent sales</p>
                )}
                {recentSales.map((order) => (
                    <div className="flex items-center gap-2" key={order.user.email}>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage
                                src={order.user.image || '/user-placeholder.png'}
                                alt="Avatar"
                            />
                            <AvatarFallback>
                                <p>{order?.user?.name![0] || ''}</p>
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-xs font-medium leading-none">{order.user.name}</p>
                            <p className="text-xs text-muted-foreground">{order.user.email}</p>
                        </div>
                        <div className="ml-auto font-medium text-sm">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(order.price)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default RecentSales
