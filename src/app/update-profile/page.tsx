import { use } from 'react'

import UpdateProfileForm from './update-profile-form'
import { getUserAction } from './actions'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const Page = () => {
    const user = use(getUserAction())

    return (
        <div className="px-2 md:px-10 my-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Update Profile</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                    <Avatar className="w-20 h-20 flex justify-center mx-auto">
                        <AvatarImage src={user?.image!} className="object-cover" alt="" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <UpdateProfileForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default Page
