'use client'

import { useLayoutEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import * as Ably from 'ably'
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react'

import { cn } from '~/lib/utils'
import { likePostAction } from '../actions'
import { useToast } from '~/components/ui/use-toast'
import { TPostWithComments } from './post'
import config from '~/configs'

const client = new Ably.Realtime({ key: config.ablyKey })

const LikePost = ({
    post,
    isSubscribed = false,
}: {
    post: TPostWithComments
    isSubscribed?: boolean
}) => {
    return (
        <AblyProvider client={client}>
            <ChannelProvider channelName="like_posts">
                <ContainerLikePost isSubscribed={isSubscribed} post={post} />
            </ChannelProvider>
        </AblyProvider>
    )
}

export default LikePost

const ContainerLikePost = ({
    isSubscribed,
    post,
}: {
    isSubscribed: boolean
    post: TPostWithComments
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<number>(post.likes)
    const { toast } = useToast()
    const { user } = useKindeBrowserClient()

    const { channel } = useChannel('like_posts', `like_posts:${post.id}`, ({ data }) => {
        const { likes: updatedLikes } = data as { likes: number }
        setLikes(updatedLikes)
    })

    const { mutate: handleLikePost } = useMutation({
        mutationKey: ['likePost'],
        mutationFn: async () => {
            if (!isSubscribed) throw new Error('You need to subscribe to like this post')

            const newLikes = isLiked ? likes - 1 : likes + 1
            setLikes(Math.max(newLikes, 0))
            setIsLiked((prev) => !prev)

            channel.publish(`like_posts:${post.id}`, { likes: newLikes })

            await likePostAction(post.id)
        },
        onError(error) {
            if (isSubscribed) {
                const revertedLikes = isLiked ? likes + 1 : likes - 1
                setLikes(Math.max(revertedLikes, 0))
                setIsLiked((prev) => !prev)
            }
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
                {likes}
            </span>
        </div>
    )
}
