'use client'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Prisma, User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart, ImageIcon, Loader, LockKeyholeIcon, MessageCircle, Send, Trash } from 'lucide-react'
import { CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button, buttonVariants } from '~/components/ui/button'
import config from '~/configs'
import { cn } from '~/lib/utils'
import { commentPostAction, deletePostAction, likePostAction } from '../actions'
import { useToast } from '~/components/ui/use-toast'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Input } from '~/components/ui/input'
import Comment from './comment'

type TPostWithComments = Prisma.PostGetPayload<{
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
    const [comment, setComment] = useState<string>('')
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { user } = useKindeBrowserClient()
    const { toast } = useToast()

    const queryClient = useQueryClient()
    const { mutate: handleDeletePost, isPending } = useMutation({
        mutationKey: ['deletePost'],
        mutationFn: async () => await deletePostAction(post.id),
        onSuccess: (data) => {
            toast({
                title: 'Yeah! Post Deleted',
                description: data.message,
            })
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError: (error) => {
            toast({
                title: 'Oh no! Something went wrong',
                description: error.message,
                variant: 'destructive',
            })
        },
    })

    const { mutate: handleLikePost } = useMutation({
        mutationKey: ['likePost'],
        mutationFn: async () => {
            if (!isSubscribed) throw new Error('You need to subscribe to like this post')

            post.likes += isLiked ? -1 : 1
            setIsLiked((prev) => !prev)
            await likePostAction(post.id)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError(error) {
            toast({
                title: 'Oh no! Something went wrong, try again',
                description: error.message,
                variant: 'destructive',
            })
        },
    })

    const { mutate: handleComment, isPending: sendingMsg } = useMutation({
        mutationKey: ['comment'],
        mutationFn: async () => {
            if (!comment) return
            await commentPostAction(post.id, comment)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            setComment('')
        },
        onError(error) {
            toast({
                title: 'Oh no! Something went wrong, try again',
                description: error.message,
                variant: 'destructive',
            })
        },
    })

    useLayoutEffect(() => {
        if (post.likesList.some((like) => like.userId === user?.id)) setIsLiked(true)
    }, [post.likesList, user?.id])

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

                    {admin.id === user?.id &&
                        (isPending ? (
                            <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
                        ) : (
                            <Trash
                                className="w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer"
                                onClick={() => handleDeletePost()}
                            />
                        ))}
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
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {post.mediaType === 'video' && (
                        <CldVideoPlayer
                            width={960}
                            height={540}
                            className="rounded-lg"
                            src={post.mediaUrl}
                        />
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
                    onClick={() => handleLikePost()}
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
                        {post.likes}
                    </span>
                </div>

                <div className="flex gap-1 items-center">
                    <Dialog>
                        <DialogTrigger>
                            <div
                                className="flex gap-1 items-center cursor-pointer hover:scale-110 hover:text-red-500"
                                onClick={() => {
                                    if (!isSubscribed) {
                                        toast({
                                            title: 'Oh no! Something went wrong',
                                            description: 'You need to subscribe to comment',
                                            variant: 'destructive',
                                        })
                                        return
                                    }
                                }}
                            >
                                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                                <span className="text-muted-foreground text-xs md:text-sm font-semibold tracking-tighter">
                                    {post.comments.length}
                                </span>
                            </div>
                        </DialogTrigger>
                        {isSubscribed && (
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Comments</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="h-[400px] rounded-md p-4">
                                    {post.comments.length ? (
                                        post.comments.map((comment) => (
                                            <Comment key={comment.id} comment={comment} />
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <p className="text-zinc-400">No comments yet</p>
                                        </div>
                                    )}
                                </ScrollArea>

                                <DialogFooter className="w-full">
                                    <form
                                        action={() => handleComment()}
                                        className="w-full relative"
                                    >
                                        <Input
                                            placeholder="Write a comment..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <Button
                                            type="submit"
                                            className="bg-transparent hover:bg-transparent absolute right-0 top-0"
                                        >
                                            {sendingMsg ? (
                                                <Loader className="w-5 h-5 text-primary animate-spin" />
                                            ) : (
                                                <Send className="text-primary cursor-pointer" />
                                            )}
                                        </Button>
                                    </form>
                                </DialogFooter>
                            </DialogContent>
                        )}
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default Post
