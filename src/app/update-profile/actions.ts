'use server'

import { ref, uploadBytes, uploadString } from 'firebase/storage'
import { storage } from '~/configs/firebase.config'

export const uploadFile = async ({ file, name }: { file: string; name: string }) => {
    try {
        const uploaded = await uploadString(ref(storage, 'images/' + name), file, 'data_url')
        console.log('uploaded', uploaded)
        return { message: 'File uploaded' }
    } catch (error: any) {
        console.log(error.message)
        return { error: error.message }
    }
}
