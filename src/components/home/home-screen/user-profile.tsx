import React from 'react'
import CoverImage from './cover-image'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import Link from 'next/link'
import config from '~/configs'
import Separate from '~/components/decorators/separate'
import { admin, user } from '~/dummy_data/db'

const UserProfile = () => {
    return (
        <div className="flex flex-col">
            <CoverImage />

            <div className="flex flex-col p-4">
                <div className="flex flex-col min-[450px]:flex-row gap-4 justify-between">
                    <Avatar className="w-20 h-20 border-2 -mt-10">
                        <AvatarImage
                            src={admin.image ?? '/user-placeholder.png'}
                            alt={admin.name}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex">
                        {!user.isSubscribed && (
                            <Button asChild className="rounded-full flex gap-10">
                                <Link href={config.routes.pricing}>
                                    <span className="uppercase font-semibold tracking-wide text-white">
                                        Subscribe
                                    </span>
                                </Link>
                            </Button>
                        )}

                        {user.isSubscribed && (
                            <Button variant={'outline'} className="rounded-full flex gap-10">
                                <span className="uppercase font-semibold tracking-wide">
                                    Subscribeb
                                </span>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col mt-4">
                    <p className="text-lg font-bold">{admin.name}</p>
                    <p className="text-sm mt-2 md:text-md">
                        Discover daily tips and tricks for horse health and care, along with
                        insights into my personal routine with my horses. Subscribe now to gain
                        access to exclusive content and become part of the community.
                    </p>
                </div>
            </div>

            <Separate />
        </div>
    )
}

export default UserProfile
