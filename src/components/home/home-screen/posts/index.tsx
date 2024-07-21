'use client'

import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import UnderlineText from '~/components/decorators/underline-text'
import Post from './post'
import PostSkeleton from '~/components/skeleton/post-skeleton'
import { getPostsAction } from '../actions'

const Posts = ({ admin, isSubscribed }: { admin: User; isSubscribed: boolean }) => {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => await getPostsAction(),
    })

    return (
        <div className="mb-3">
            {isLoading ? (
                <div className="mt-10 px-3 flex flex-col gap-10">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <PostSkeleton key={idx} />
                    ))}
                </div>
            ) : posts?.length ? (
                posts.map((post) => (
                    <Post key={post.id} post={post} admin={admin} isSubscribed={isSubscribed} />
                ))
            ) : (
                <div className="mt-10 px-3">
                    <div className="flex flex-col items-center space-y-3 w-full md:w-3/4 mx-auto">
                        <p className="text-xl font-semibold">
                            No Posts <UnderlineText className="decoration-wavy">Yet</UnderlineText>
                        </p>

                        <p className="text-center">
                            Stay tuned for more from{' '}
                            <span className="text-primary font-semibold text-xl">OnlyHorse.</span>{' '}
                            You can subscribe to access axclusive content when it's available.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Posts
