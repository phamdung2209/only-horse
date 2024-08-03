'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'

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

        revalidatePath('/')

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

export const getDashboardDataAction = async () => {
    try {
        await checkIfAdmin()
        // await 5s delay
        // await new Promise((resolve) => setTimeout(resolve, 5000))

        // Combine total revenue queries into a single request
        const totalRevenuePromise = prisma.$transaction([
            prisma.order.aggregate({ _sum: { price: true } }),
            prisma.subscription.aggregate({ _sum: { price: true } }),
        ])

        // Combine the count queries into a single transaction
        const countsPromise = prisma.$transaction([
            prisma.order.count(),
            prisma.subscription.count(),
        ])

        // Fetch recent sales and subscriptions in parallel
        const recentSalesPromise = prisma.order.findMany({
            take: 4,
            orderBy: { orderDate: 'desc' },
            select: {
                user: { select: { name: true, email: true, image: true } },
                price: true,
                orderDate: true,
            },
        })

        const recentSubscriptionsPromise = prisma.subscription.findMany({
            take: 4,
            orderBy: { startDate: 'desc' },
            select: {
                user: { select: { name: true, email: true, image: true } },
                price: true,
                startDate: true,
            },
        })

        // Await all promises in parallel
        const [
            [totalOrderRevenue, totalSubscriptionRevenue],
            [totalSales, totalSubscriptions],
            recentSales,
            recentSubscriptions,
        ] = await Promise.all([
            totalRevenuePromise,
            countsPromise,
            recentSalesPromise,
            recentSubscriptionsPromise,
        ])

        const totalRevenue =
            (totalOrderRevenue._sum.price ?? 0) + (totalSubscriptionRevenue._sum.price ?? 0)

        return {
            totalRevenue,
            totalSales,
            totalSubscriptions,
            recentSales,
            recentSubscriptions,
        }
    } catch (error: any) {
        console.error('Error in getDashboardDataAction(action.ts)', error.message)
        return {
            totalRevenue: 0,
            totalSales: 0,
            totalSubscriptions: 0,
            recentSales: [],
            recentSubscriptions: [],
        }
    }
}
