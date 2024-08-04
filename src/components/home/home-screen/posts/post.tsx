import { use } from 'react'
import { Prisma, User } from '@prisma/client'
import { ImageIcon, LockKeyholeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { buttonVariants } from '~/components/ui/button'
import config from '~/configs'
import DialogComment from './comment-post/dialog-comment'
import DeletePost from './delete-post'
import LikePost from './like-post'
import VideoControl from './video-control'

export type TPostWithComments = Prisma.PostGetPayload<{
    include: { comments: { include: { user: true } }; likesList: true }
}>

const Post = ({
    post,
    admin,
    isSubscribed = false,
}: {
    post: TPostWithComments
    admin: User
    isSubscribed: boolean
}) => {
    const { getUser } = getKindeServerSession()
    const user = use(getUser())

    return (
        <div className="flex flex-col gap-3 p-3 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={admin.image!} alt={admin.name} className="object-cover" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <span className="font-semibold text-sm md:text-base">{admin.name}</span>
                </div>

                <div className="flex gap-2 items-center">
                    <p className="text-zinc-400 text-xs md:text-sm tracking-tighter">
                        {post.createdAt.toDateString()}
                    </p>

                    {admin.id === user?.id && <DeletePost postId={post.id} />}
                </div>
            </div>

            <p className="text-sm md:text-base">{post.text}</p>

            {(post.isPublic || isSubscribed) && post.mediaUrl && (
                <>
                    {post.mediaType === 'image' && (
                        <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                            <Image
                                draggable={false}
                                src={post.mediaUrl}
                                alt="Post Media"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {post.mediaType === 'video' && <VideoControl mediaUrl={post.mediaUrl} />}
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
                <LikePost post={post} isSubscribed={isSubscribed} />

                <div className="flex gap-1 items-center">
                    <DialogComment isSubscribed={isSubscribed} post={post} />
                </div>
            </div>
        </div>
    )
}

export default Post
