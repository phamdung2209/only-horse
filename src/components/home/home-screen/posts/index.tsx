import { use } from 'react'
import { User } from '@prisma/client'

import UnderlineText from '~/components/decorators/underline-text'
import Post from './post'
import { getPostsAction } from '../actions'
import BlurFade from '~/components/magicui/blur-fade'

const Posts = ({ admin, isSubscribed }: { admin: User; isSubscribed: boolean }) => {
    const posts = use(getPostsAction())

    return (
        <div className="mb-3">
            {posts?.length ? (
                posts.map((post) => (
                    <BlurFade key={post.id} inView delay={0.25} yOffset={0}>
                        <Post post={post} admin={admin} isSubscribed={isSubscribed} />
                    </BlurFade>
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
