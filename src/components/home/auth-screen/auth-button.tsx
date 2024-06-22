'use client'

import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { memo, useState } from 'react'
import Loading from '~/components/loading'

import { Button } from '~/components/ui/button'

const AuthButton = () => {
    const [loading, setLoading] = useState<{
        login: boolean
        signup: boolean
    }>({
        login: false,
        signup: false,
    })

    return (
        <div className="flex gap-3 flex-1 md:flex-row flex-col">
            <RegisterLink
                className="flex-1"
                onClick={() =>
                    setLoading((prev) => ({
                        ...prev,
                        signup: true,
                    }))
                }
            >
                <Button className="w-full" variant={'outline'} disabled={loading.signup}>
                    {loading.signup ? <Loading /> : 'Sign Up'}
                </Button>
            </RegisterLink>

            <LoginLink
                className="flex-1"
                onClick={() =>
                    setLoading((prev) => ({
                        ...prev,
                        login: true,
                    }))
                }
            >
                <Button className="w-full text-white" disabled={loading.login}>
                    {loading.login ? <Loading className="border-white" /> : 'Log In'}
                </Button>
            </LoginLink>
        </div>
    )
}

export default memo(AuthButton)
