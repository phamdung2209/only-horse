'use client'

import { useState } from 'react'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { getUserAction, updateUserAction } from './actions'
import { useToast } from '~/components/ui/use-toast'

const UpdateProfileForm = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        profileImage: '',
        mediaUrl: '',
    })
    const { toast } = useToast()

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => await getUserAction(),
    })

    const { mutate: updateUser, isPending } = useMutation({
        mutationKey: ['updateUser'],
        mutationFn: updateUserAction,
        onSuccess: (data) => {
            toast({
                title: "That's good!",
                description: data.message,
            })
            setData({ name: '', email: '', profileImage: '', mediaUrl: '' })
        },
        onError: (error) => {
            toast({
                title: 'Oops!',
                description: error.message,
                variant: 'destructive',
            })
        },
    })

    return (
        <form
            action={() =>
                updateUser({
                    name: data.name,
                    image: data.mediaUrl,
                })
            }
            className="flex flex-col gap-4"
        >
            <div className="flex 2xl:flex-row 2xl:justify-between flex-col gap-3">
                <div>
                    <Label>Name</Label>
                    <Input
                        placeholder={user?.name ?? 'Enter your name'}
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
                                    placeholder="Your email is visible here"
                                    value={user?.email ?? ''}
                                    className="my-2"
                                    disabled
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-sm">
                                    For security reasons, you cannot change your email address.
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
                        mediaUrl: (result.info as CloudinaryUploadWidgetInfo).secure_url,
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
                        className="w-full"
                    >
                        Upload Avatar
                    </Button>
                )}
            </CldUploadWidget>

            {data.mediaUrl && (
                <div className="flex justify-center relative w-full">
                    <Avatar className="w-52 h-52">
                        <AvatarImage src={data.mediaUrl} className="object-cover" alt={data.name} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            )}

            <Button className="w-full text-white" type="submit" disabled={isPending}>
                {isPending ? <Loader className="w-6 h-6 animate-spin" /> : 'Update'}
            </Button>
        </form>
    )
}

export default UpdateProfileForm
