'use client'

import { Heart, ImageIcon, LockKeyholeIcon, MessageCircle, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button, buttonVariants } from '~/components/ui/button'
import config from '~/configs'
import { user } from '~/dummy_data/db'
import { cn } from '~/lib/utils'

type TPost = {
    id: number
    text: string
    mediaType: string
    mediaUrl: string
    likes: number
    isPublic: boolean
    createdAt: Date
    comments: {
        id: number
        user: any
        content: string
        createdAt: Date
    }[]
}

type TAdmin = {
    id: number
    name: string
    email: string
    image: string
}

const Post = ({
    post,
    admin,
    isSubscribed = false,
}: {
    post: TPost
    admin: TAdmin
    isSubscribed: boolean
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-3 p-3 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={admin.image ?? '/user-placeholder.png'} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <span className="font-semibold text-sm md:text-base">{admin.name}</span>
                </div>

                <div className="flex gap-2 items-center">
                    <p className="text-zinc-400 text-xs md:text-sm tracking-tighter">
                        {post.createdAt.toDateString()}
                    </p>

                    {admin.id === user.id && (
                        <Trash className="w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer" />
                    )}
                </div>
            </div>

            <p className="text-sm md:text-base">{post.text}</p>

            {(post.isPublic || isSubscribed) && post.mediaUrl && (
                <>
                    {post.mediaType === 'image' && (
                        <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                            <Image
                                src={post.mediaUrl}
                                alt="Post Media"
                                fill={true}
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {post.mediaType === 'video' && (
                        <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-black">
                            <video
                                controls
                                className="w-full rounded-lg absolute top-0 left-0 right-0 bottom-0"
                                src={post.mediaUrl}
                            />
                        </div>
                    )}
                </>
            )}

            {!isSubscribed && !post.isPublic && (
                <div className="w-full bg-slate-800 relative h-96 rounded-md bg-of flex flex-col justify-center items-center px-5 overflow-hidden">
                    <LockKeyholeIcon className="w-16 h-16 text-zinc-400 mb-20 z-0" />
                    <div
                        aria-hidden="true"
                        className="opacity-60 absolute top-0 left-0 w-full h-full bg-stone-800"
                    />
                    <div className="flex flex-col gap-2 z-10 border p-2 border-gray-500 w-full rounded">
                        <div className="flex gap-1 items-center text-white">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-xs">1</span>
                        </div>

                        <Link
                            className={buttonVariants({
                                className: '!rounded-full w-full font-bold text-white',
                            })}
                            href={config.routes.pricing}
                        >
                            Subscribe to unlock
                        </Link>
                    </div>
                </div>
            )}

            <div className="flex gap-5 select-none">
                <div
                    className="flex gap-1 items-center cursor-pointer hover:text-red-500 hover:scale-110 transition-all duration-200 active:scale-95"
                    onClick={() => setIsLiked(!isLiked)}
                >
                    <Heart
                        className={cn('w-5 h-5 text-muted-foreground', {
                            'text-red-500 fill-red-500': isLiked,
                        })}
                    />
                    <span
                        className={cn(
                            'text-muted-foreground text-xs md:text-sm font-semibold tracking-tighter',
                            { 'text-red-500': isLiked },
                        )}
                    >
                        150
                    </span>
                </div>

                <div className="flex gap-1 items-center cursor-pointer hover:scale-110 hover:text-red-500">
                    <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs md:text-sm font-semibold tracking-tighter">
                        12
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Post
