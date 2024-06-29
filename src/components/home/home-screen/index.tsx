import BaseLayout from '~/components/base-layout'
import UserProfile from './user-profile'
import { memo } from 'react'

const HomeScreen = () => {
    return (
        <BaseLayout>
            <UserProfile />
        </BaseLayout>
    )
}

export default memo(HomeScreen)
