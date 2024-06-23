import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { memo, use } from 'react'
import config from '~/configs'

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
        <div className="flex max-w-2xl">
            <p>sideBar</p>
            {children}
            {renderRightPanel && <p>rightPanel</p>}
        </div>
    )
}

export default memo(BaseLayout)
