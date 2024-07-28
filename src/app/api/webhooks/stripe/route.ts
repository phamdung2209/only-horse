import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

import prisma from '~/db/prisma'
import { stripe } from '~/lib/stripe'
import WelcomeEmail from '~/emails/welcome'
import ReceiptEmail from '~/emails/receipt-email'

const resend = new Resend(process.env.RESEND_API_KEY as string)

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

                    await prisma.user.update({
                        where: { id: user.id },
                        data: { customerId },
                    })

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

                            const subscription = await prisma.subscription.upsert({
                                where: { userId: user.id },
                                update: {
                                    planId: priceId,
                                    startDate: new Date(),
                                    endDate,
                                    price: item.amount_total / 100 ?? 0,
                                },
                                create: {
                                    userId: user.id,
                                    planId: priceId,
                                    price: item.amount_total / 100 ?? 0,
                                    startDate: new Date(),
                                    endDate,
                                },
                            })

                            await prisma.user.update({
                                where: { id: user.id },
                                data: { isSubscribed: true },
                            })

                            // TODO: Send email to user
                            // resend => onboarding@resend.dev
                            await resend.emails.send({
                                from: 'Horse <onboarding@resend.dev>',
                                to: [customerDetails.email],
                                subject: 'Subscription Confirmation',
                                react: WelcomeEmail({
                                    userEmail: customerDetails.email,
                                    userName: user.name,
                                    subscriptionStartDate: subscription.startDate,
                                    subscriptionEndDate: subscription.endDate,
                                }),
                            })
                        } else {
                            // Handle one-time purchases
                            const { orderId, size } = session.metadata as {
                                orderId: string
                                size: string
                            }
                            const shippingDetails =
                                session.shipping_details as Stripe.Checkout.Session.ShippingDetails

                            const orderUpdated = await prisma.order.update({
                                where: { id: orderId },
                                data: {
                                    isPaid: true,
                                    shippingAddress: {
                                        create: {
                                            address: shippingDetails.address?.line1 ?? '',
                                            city: shippingDetails.address?.city ?? '',
                                            state: shippingDetails.address?.state ?? '',
                                            zip: shippingDetails.address?.postal_code ?? '',
                                            country: shippingDetails.address?.country ?? '',
                                        },
                                    },
                                },
                                select: {
                                    id: true,
                                    product: true,
                                    size: true,
                                    shippingAddress: true,
                                    orderDate: true,
                                },
                            })

                            // Send a success email to the user
                            await resend.emails.send({
                                from: 'Horse <onboarding@resend.dev>',
                                to: [customerDetails.email],
                                subject: 'Order Confirmation',
                                react: ReceiptEmail({
                                    orderDate: new Date(),
                                    orderNumber: orderUpdated.id,
                                    productName: orderUpdated.product.name,
                                    productImage: orderUpdated.product.image,
                                    productSize: orderUpdated.size,
                                    shippingAddress: orderUpdated.shippingAddress!,
                                    userName: user.name,
                                }),
                            })
                        }
                    }
                }
                break

            case 'customer.subscription.deleted':
                const subscription = await stripe.subscriptions.retrieve(
                    (data.object as Stripe.Subscription).id,
                )

                const user = await prisma.user.findUnique({
                    where: { customerId: subscription.customer as string },
                })

                if (!user) throw new Error('User not found for the subscription deleted event')

                await prisma.user.update({
                    where: { id: user.id },
                    data: { isSubscribed: false },
                })
                break
            default:
                console.log(`Unhandled event type ${eventType}`)
                break
        }

        return NextResponse.json({ received: true })
    } catch (error: any) {
        console.error('webhook error:', error.message)
        return new Response(`Webhook error: ${error.message}`)
    }
}
