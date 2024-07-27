'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '~/db/prisma'

export const checkProductPaidAction = async (orderId: string) => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        if (!user) throw new Error('Unauthorized - you must be logged in to perform this action')

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            select: {
                product: true,
                isPaid: true,
                size: true,
                shippingAddress: true,
            },
        })
        if (!order) throw new Error('Order not found')

        return order
    } catch (error: any) {
        console.log('Error in checkProductPaidAction (actions.ts)', error)
        throw new Error('An error occurred while checking the order status')
    }
}
