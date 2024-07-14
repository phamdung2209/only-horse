'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '~/db/prisma'

export const checkAuthStatus = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) return { error: 'User not found' }

    const exitingUser = await prisma.user.findUnique({ where: { id: user.id } })

    // SIGNUP HERE
    if (!exitingUser) {
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email!,
                name: user.given_name + ' ' + user.family_name,
                image: user.picture,
            },
        })
    }

    return { message: 'User found' }
}
