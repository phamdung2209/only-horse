import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

import { Button } from '~/components/ui/button'

const AuthButton = () => {
    return (
        <div className="flex gap-3 flex-1 md:flex-row flex-col">
            <RegisterLink className="flex-1">
                <Button className="w-full" variant={'outline'}>
                    Sign up
                </Button>
            </RegisterLink>

            <LoginLink className="flex-1">
                <Button className="w-full">Log In</Button>
            </LoginLink>
        </div>
    )
}

export default AuthButton
