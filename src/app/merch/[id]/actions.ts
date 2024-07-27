'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import config from '~/configs'
import prisma from '~/db/prisma'
import { stripe } from '~/lib/stripe'

export const createCheckoutAction = async ({
    productId,
    size,
}: {
    productId: string
    size: string
}) => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        if (!user) throw new Error('Unauthorized - you must be logged in to perform this action')

        const product = await prisma.product.findUnique({ where: { id: productId } })
        if (!product) throw new Error('Product not found')

        const order = await prisma.order.create({
            data: {
                userId: user.id,
                productId: product.id,
                price: product.price,
                size,
            },
        })

        // It's gonna prefill the email for the user
        const customer = await stripe.customers.create({ email: user.email! })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: product?.name!,
                            images: [product?.image!],
                        },
                        unit_amount: product?.price,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                orderId: order.id,
                size,
            },
            mode: 'payment',
            success_url: `${config.baseUrl}/purchase?orderId=${order.id}`,
            cancel_url: `${config.baseUrl}/merch?${product?.id}`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'VN'],
            },
            customer: customer.id,
            expires_at: Math.floor(Date.now() / 1000) + 60 * 30, // 30 minutes
        })

        return { url: session.url }
    } catch (error: any) {
        console.log('Error in createCheckoutAction (actions.ts):', error.message)
        throw new Error('Something went wrong. Please try again later.')
    }
}
