import { memo, use } from 'react'
import { notFound } from 'next/navigation'

import BaseLayout from '~/components/base-layout'
import UserProfile from './user-profile'
import Posts from './posts'
import { getUserAction } from '~/app/update-profile/actions'
import { getAdminAction } from './actions'

const HomeScreen = () => {
    const admin = use(getAdminAction())
    const user = use(getUserAction())

    if (!user) return notFound()

    return (
        <BaseLayout>
            <UserProfile admin={admin!} user={user} />
            <Posts admin={admin!} isSubscribed={user?.isSubscribed} />
        </BaseLayout>
    )
}

export default memo(HomeScreen)
