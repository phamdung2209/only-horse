import routes from './routes.config'
import stripe from './stripe.config'

const config = {
    routes,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    stripe,
    socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL!,
    ablyKey: process.env.NEXT_PUBLIC_ABLY_KEY!,
}

export default config
