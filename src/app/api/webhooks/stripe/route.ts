import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import prisma from '~/db/prisma'
import { stripe } from '~/lib/stripe'

const webhookSecret =
    process.env.NODE_ENV === 'development'
        ? process.env.STRIPE_WEBHOOK_SECRET_DEV_KEY
        : process.env.STRIPE_WEBHOOK_SECRET_LIVE_KEY
export const POST = async (req: NextRequest) => {
    const payload = await req.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
        return new Response('No signature', { status: 400 })
    }

    let event

    // verify the event by using the stripe webhook secret
    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret as string)
    } catch (error: any) {
        console.error('webhook error:', error.message)
        return new Response(`Webhook error: ${error.message}`, { status: 400 })
    }

    const data = event.data
    const eventType = event.type

    try {
        switch (eventType) {
            case 'checkout.session.completed':
                const session = await stripe.checkout.sessions.retrieve(
                    (data.object as Stripe.Checkout.Session).id,
                    {
                        expand: ['line_items', 'customer_details'],
                    },
                )
                const customerId = session.customer as string
                const customerDetails =
                    session.customer_details as Stripe.Checkout.Session.CustomerDetails
                const lineItems = session.line_items?.data || []

                if (customerDetails.email) {
                    const user = await prisma.user.findUnique({
                        where: { email: customerDetails.email },
                    })

                    if (!user) throw new Error('User not found')
                    if (!user.customerId) {
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { customerId },
                        })
                    }

                    for (const item of lineItems) {
                        const priceId = item.price?.id as string
                        const isSubscription = item.price?.type === 'recurring'

                        if (isSubscription) {
                            // Handle subscriptions
                            let endDate = new Date()
                            if (priceId === process.env.STRIPE_YEARLY_PLAN_PRICE_ID_) {
                                endDate.setFullYear(endDate.getFullYear() + 1) // +1 year from now
                            } else if (priceId === process.env.STRIPE_MONTHLY_PLAN_PRICE_ID_) {
                                endDate.setMonth(endDate.getMonth() + 1) // +1 month from now
                            } else {
                                throw new Error('Invalid price ID')
                            }

                            await prisma.subscription.upsert({
                                where: { userId: user.id },
                                update: {
                                    planId: priceId,
                                    startDate: new Date(),
                                    endDate,
                                    price: item.amount_total ?? 0,
                                },
                                create: {
                                    userId: user.id,
                                    planId: priceId,
                                    price: item.amount_total ?? 0,
                                    startDate: new Date(),
                                    endDate,
                                },
                            })

                            await prisma.user.update({
                                where: { id: user.id },
                                data: { isSubscribed: true },
                            })
                        } else {
                            // Handle one-time purchases
                        }
                    }
                }
                break
        }

        return NextResponse.json({ received: true })
    } catch (error: any) {
        console.error('webhook error:', error.message)
        return new Response(`Webhook error: ${error.message}`, { status: 400 })
    }
}
