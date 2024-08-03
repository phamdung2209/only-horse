'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'
import prisma from '~/db/prisma'

export const getAdminAction = async () => {
    try {
        const admin = await prisma.user.findUnique({ where: { email: process.env.ADMIN_EMAIL! } })
        return admin
    } catch (error: any) {
        console.error('Error in getAdminAction: ', error.message)
        return null
    }
}

// like, comment, delete, get posts
export const getPostsAction = async () => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        if (!user) throw new Error('Unauthorized')

        const posts = await prisma.post.findMany({
            include: {
                comments: { include: { user: true } },
                likesList: {
                    where: { userId: user.id },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return posts
    } catch (error: any) {
        console.error('Error in getPostsAction: ', error.message)
        return []
        // throw new Error(error.message)
    }
}

export const deletePostAction = async (postId: string) => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user) throw new Error('Unauthorized')

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        })
        if (!post) throw new Error('Post not found')

        if (post.userId !== user.id) throw new Error('You are not authorized to delete this post')

        await prisma.$transaction([
            prisma.like.deleteMany({ where: { postId } }),
            prisma.comment.deleteMany({ where: { postId } }),
            prisma.post.delete({ where: { id: postId } }),
        ])

        revalidatePath('/')

        return { message: 'Oh no! Your post has been deleted.' }
    } catch (error: any) {
        console.error('Error in deletePostAction: ', error.message)
        throw new Error(error.message)
    }
}

export const likePostAction = async (postId: string) => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        if (!user) throw new Error('Unauthorized')

        const userProfile = await prisma.user.findUnique({
            where: { id: user.id },
        })
        if (!userProfile) throw new Error('User not found')
        if (!userProfile.isSubscribed) throw new Error('You need to subscribe to like')

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { likes: true, likesList: { where: { userId: user.id } } },
        })
        if (!post) throw new Error('Post not found')

        let newLikes: number
        if (post.likesList.length) {
            newLikes = Math.max(post.likes - 1, 0)
            await prisma.like.deleteMany({
                where: { postId, userId: user.id },
            })
        } else {
            newLikes = post.likes + 1
            await prisma.like.create({
                data: { postId, userId: user.id },
            })
        }

        await prisma.post.update({
            where: { id: postId },
            data: { likes: newLikes },
        })

        revalidatePath('/')

        return { message: 'Good job! Post liked' }
    } catch (error: any) {
        console.error('Error in likePostAction: ', error.message)
        throw new Error(error.message)
    }
}

export const commentPostAction = async (postId: string, comment: string) => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        if (!user) throw new Error('Unauthorized')

        const userProfile = await prisma.user.findUnique({
            where: { id: user.id },
        })
        if (!userProfile) throw new Error('User not found')
        if (!userProfile.isSubscribed) throw new Error('You need to subscribe to comment')

        await prisma.comment.create({
            data: {
                postId,
                userId: user.id,
                text: comment,
            },
        })

        revalidatePath('/')

        return { message: 'Good job! Commented' }
    } catch (error: any) {
        console.error('Error in commentPostAction: ', error.message)
        throw new Error(error.message)
    }
}
