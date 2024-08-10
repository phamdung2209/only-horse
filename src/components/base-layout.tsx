import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { memo, use } from 'react'

import config from '~/configs'
import SuggestedProducts from './suggested-products'
import Sidebar from './sidebar'

const BaseLayout = ({
    children,
    renderRightPanel = true,
}: {
    children: React.ReactNode
    renderRightPanel?: boolean
}) => {
    const { isAuthenticated } = getKindeServerSession()
    const isAuth: boolean = use(isAuthenticated()) as boolean

    if (!isAuth) return redirect(config.routes.home)

    return (
        <div className="flex max-w-2xl lg:max-w-7xl mx-auto relative">
            <Sidebar />
            <div className="w-full lg:w-3/5 flex flex-col border-r">{children}</div>
            {renderRightPanel && <SuggestedProducts />}
        </div>
    )
}

export default memo(BaseLayout)
