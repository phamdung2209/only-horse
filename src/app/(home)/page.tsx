import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { lazy, use } from 'react'

const AuthScreen = lazy(() => import('~/components/home/auth-screen'))
const HomeScreen = lazy(() => import('~/components/home/home-screen'))

export default function Home() {
    const { getUser } = getKindeServerSession()
    const user = use(Promise.resolve(getUser()))

    return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>
}
