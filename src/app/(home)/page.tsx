import AuthScreen from '~/components/home/auth-screen'
import HomeScreen from '~/components/home/home-screen.tsx'

export default function Home() {
    const user: boolean = false

    return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>
}
