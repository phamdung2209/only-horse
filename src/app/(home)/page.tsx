import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { lazy, use } from 'react'

const HomeScreen = lazy(() => import('~/components/home/home-screen'))
const AuthScreen = lazy(() => import('~/components/home/auth-screen'))

export default function Home() {
    const { getUser } = getKindeServerSession()
    const user = use(Promise.resolve(getUser()))

    return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>
}
