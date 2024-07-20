'use client'

import { useState } from 'react'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const UpdateProfileForm = () => {
    const [data, setData] = useState({
        name: 'John Doe',
        email: '',
        profileImage: '',
        mediaUrl: '',
    })

    return (
        <div className="px-2 md:px-10 my-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Update Profile</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                    <Avatar className="w-20 h-20 flex justify-center mx-auto">
                        <AvatarImage src="/user-placeholder.png" className="object-cover" alt="" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <form action="">
                        <div className="flex 2xl:flex-row 2xl:justify-between flex-col gap-3">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    placeholder="Enter your name"
                                    value={data.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="my-2"
                                />
                            </div>

                            <div>
                                <Label>Email</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-full" type="button">
                                            <Input
                                                placeholder="Enter your email"
                                                value={data.email}
                                                className="my-2"
                                                disabled
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-sm">
                                                For security reasons, you cannot change your email
                                                address.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>

                        <CldUploadWidget
                            signatureEndpoint={'/api/sign-image'}
                            onSuccess={(result, { widget }) => {
                                setData((prev) => ({
                                    ...prev,
                                    profileImage: (result.info as CloudinaryUploadWidgetInfo)
                                        .secure_url,
                                }))
                                widget.close()
                            }}
                            options={{
                                sources: ['local', 'unsplash'],
                                folder: 'horse/avatars',
                            }}
                        >
                            {({ open }) => (
                                <Button
                                    onClick={() => open()}
                                    variant={'outline'}
                                    type="button"
                                    className="w-full mt-2 mb-8"
                                >
                                    Upload Avatar
                                </Button>
                            )}
                        </CldUploadWidget>

                        <Button className="w-full text-white" type="submit">
                            Update
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateProfileForm
