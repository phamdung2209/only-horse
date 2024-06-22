'use client'

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

const HomeScreen = () => {
    return (
        <div>
            <LogoutLink>Log Out</LogoutLink>
        </div>
    )
}

export default HomeScreen
