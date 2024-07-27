import { User } from '@prisma/client'
import { use } from 'react'

import UnderlineText from '~/components/decorators/underline-text'
import Post from './post'
import { getPostsAction } from '../actions'

const Posts = ({ admin, isSubscribed }: { admin: User; isSubscribed: boolean }) => {
    const posts = use(getPostsAction())

    return (
        <div className="mb-3">
            {posts?.length ? (
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
                            You can subscribe to access exclusive content when it's available.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Posts
