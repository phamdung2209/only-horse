import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { use } from 'react'

import AuthScreen from '~/components/home/auth-screen'
import HomeScreen from '~/components/home/home-screen'

export default function Home() {
    const { getUser } = getKindeServerSession()
    const user = use(Promise.resolve(getUser()))

    return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>
}
