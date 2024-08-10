import { use } from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import AuthScreen from '~/components/home/auth-screen'
import HomeScreen from '~/components/home/home-screen'

export default function Home() {
    const { isAuthenticated } = getKindeServerSession()
    const isLoggedIn = use(isAuthenticated())

    return <main>{isLoggedIn ? <HomeScreen /> : <AuthScreen />}</main>
}
