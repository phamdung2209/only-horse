import routes from './routes.config'
import stripe from './stripe.config'

const config = {
    routes,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    stripe,
}

export default config
