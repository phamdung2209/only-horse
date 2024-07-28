const stripe = {
    secretKey: process.env.STRIPE_SECRET_KEY,
    billingPortal:
        process.env.NODE_ENV === 'production'
            ? process.env.STRIPE_BILLING_PORTAL_LINK_LIVE
            : process.env.STRIPE_BILLING_PORTAL_LINK_DEV,
    WebhookSecretKey:
        process.env.NODE_ENV === 'production'
            ? process.env.STRIPE_WEBHOOK_SECRET_LIVE_KEY
            : process.env.STRIPE_WEBHOOK_SECRET_DEV_KEY,
    monthlyUrl:
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_STRIPE_LIVE_MONTHLY_URL
            : process.env.NEXT_PUBLIC_STRIPE_DEV_MONTHLY_URL,
    yearlyUrl:
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_STRIPE_LIVE_YEARLY_URL
            : process.env.NEXT_PUBLIC_STRIPE_DEV_YEARLY_URL,
    monthlyPlanPriceId: process.env.STRIPE_MONTHLY_PLAN_PRICE_ID_,
    yearlyPlanPriceId: process.env.STRIPE_YEARLY_PLAN_PRICE_ID_,
}

export default stripe
