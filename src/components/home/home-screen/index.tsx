import BaseLayout from '~/components/base-layout'
import UserProfile from './user-profile'
import { memo } from 'react'
import Posts from './posts'

const HomeScreen = () => {
    return (
        <BaseLayout>
            <UserProfile />
            <Posts />
        </BaseLayout>
    )
}

export default memo(HomeScreen)
