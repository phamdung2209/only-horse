'use client'

import { memo, useLayoutEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import { cn } from '~/lib/utils'
import { likePostAction } from '../actions'
import { useToast } from '~/components/ui/use-toast'
import { TPostWithComments } from './post'

const LikePost = ({
    post,
    isSubscribed = false,
}: {
    post: TPostWithComments
    isSubscribed?: boolean
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { toast } = useToast()
    const { user } = useKindeBrowserClient()

    const { mutate: handleLikePost } = useMutation({
        mutationKey: ['likePost'],
        mutationFn: async () => {
            if (!isSubscribed) throw new Error('You need to subscribe to like this post')

            post.likes += isLiked ? -1 : 1
            setIsLiked((prev) => !prev)
            await likePostAction(post.id)
        },
        onError(error) {
            if (isSubscribed) setIsLiked((prev) => !prev)
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
                {post.likes}
            </span>
        </div>
    )
}

export default memo(LikePost)
