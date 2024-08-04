'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { ref, uploadString } from 'firebase/storage'
import { storage } from '~/configs/firebase.config'
import prisma from '~/db/prisma'

export const uploadFile = async ({ file, name }: { file: string; name: string }) => {
    try {
        const uploaded = await uploadString(ref(storage, 'images/' + name), file, 'data_url')
        console.log('uploaded', uploaded)
        return { message: 'File uploaded' }
    } catch (error: any) {
        console.log('Error in uploadFile (actions.ts)', error.message)
        return { error: error.message }
    }
}

export const getUserAction = async () => {
    try {
        const { getUser } = getKindeServerSession()

        const user = await getUser()
        if (!user) throw new Error('Unauthorized')

        const currentUser = await prisma.user.findUnique({ where: { id: user.id } })
        if (!currentUser) throw new Error('User not found')

        return currentUser
    } catch (error: any) {
        console.log('Error in getUserAction (actions.ts)', error.message)
        return null
    }
}

export const updateUserAction = async ({ name, image }: { name: string; image: string }) => {
    try {
        if (!name && !image) throw new Error("Let's enter name or image to update your profile.")

        const { getUser } = getKindeServerSession()
        const user = await getUser()
        if (!user) throw new Error('Unauthorized')

        const updateFields: Partial<User> = {}
        if (name) updateFields.name = name
        if (image) updateFields.image = image

        await prisma.user.update({
            where: { id: user.id },
            data: updateFields,
        })

        revalidatePath('/update-profile', 'page')

        return { message: 'Great!, your profile has been updated.' }
    } catch (error: any) {
        console.log('Error in updateUserAction (actions.ts)', error.message)
        throw new Error(error.message)
    }
}
