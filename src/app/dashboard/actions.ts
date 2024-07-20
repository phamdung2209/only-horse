'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '~/db/prisma'

type TPostArgs = {
    text: string
    mediaUrl: string
    mediaType: 'image' | 'video'
    isPublic: boolean
}

type TProductArgs = {
    name: string
    image: string
    price: string
}

const checkIfAdmin = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) throw new Error('User not found')

    const isAdmin = user.email === process.env.ADMIN_EMAIL
    if (!isAdmin) throw new Error('Unauthorized')

    return user
}

export const createPostAction = async ({ isPublic, mediaUrl, mediaType, text }: TPostArgs) => {
    try {
        const user = await checkIfAdmin()

        if (!mediaUrl) throw new Error('Media URL is required')

        const newPost = await prisma.post.create({
            data: {
                text,
                mediaUrl,
                mediaType,
                isPublic,
                userId: user.id,
            },
        })

        return {
            message: 'Your post has been successfully created',
            post: newPost,
        }
    } catch (error: any) {
        console.error('Error in createPostAction(action.ts)', error.message)
        throw new Error(error.message)
    }
}

export const getProductsAction = async () => {
    try {
        await checkIfAdmin()

        const products = await prisma.product.findMany()

        return products
    } catch (error: any) {
        console.error('Error in getPostsAction(action.ts)', error.message)
        return []
    }
}

export const addProductAction = async ({ name, image, price }: TProductArgs) => {
    try {
        await checkIfAdmin()
        if (!name || !image || !price) throw new Error('All fields are required')

        await prisma.product.create({
            data: {
                name,
                image,
                price: +price,
            },
        })

        return { message: 'The product has been added successfully' }
    } catch (error: any) {
        console.error('Error in addProductAction(action.ts)', error.message)
        throw new Error(error.message)
    }
}

export const toggleProductArchiveAction = async (id: string) => {
    try {
        await checkIfAdmin()
        if (!id) throw new Error('Product ID is required')

        const product = await prisma.product.findUnique({ where: { id } })
        if (!product) throw new Error('Product not found')

        await prisma.product.update({
            where: { id },
            data: { isArchived: !product.isArchived },
        })

        return {
            message: `The product has been ${
                product.isArchived ? 'unarchived' : 'archived'
            } successfully`,
        }
    } catch (error: any) {
        console.error('Error in toggleProductArchiveAction(action.ts)', error.message)
        throw new Error(error.message)
    }
}
