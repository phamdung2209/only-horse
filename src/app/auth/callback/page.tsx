'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import { checkAuthStatus } from './actions'
import config from '~/configs'

const Page = () => {
    const router = useRouter()
    const { user, isLoading: checkingAuth } = useKindeBrowserClient()
    const { data } = useQuery({
        queryKey: ['authCheck'],
        queryFn: async () => await checkAuthStatus(),
    })

    useEffect(() => {
        const stripeUrl = localStorage.getItem('stripeRedirectUrl')
        if (stripeUrl && user?.email && !checkingAuth) {
            localStorage.removeItem('stripeRedirectUrl')
            window.location.href = stripeUrl + '?email=' + user.email
        } else if (!user && !checkingAuth) {
            router.push(config.routes.home)
        }
    }, [data, router, user, checkingAuth])

    if (!checkingAuth && data?.message) return router.push(config.routes.home)

    return (
        <div className="mt-20 w-full flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader className="w-10 h-10 animate-spin text-muted-foreground" />
                <h3 className="text-xl font-bold">Redirecting...</h3>
                <p>Please wait...</p>
            </div>
        </div>
    )
}

export default Page
