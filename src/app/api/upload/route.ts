import { ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { NextRequest } from 'next/server'
import { storage } from '~/configs/firebase.config'

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        console.log('data', data)
        uploadBytes(ref(storage, 'images/' + data.blob.name), data.blob)

        return Response.json({
            message: 'Upload successfully',
        })
    } catch (error: any) {
        console.log('Error in POST /api/upload', error.message)
        return Response.json({
            error: error.message,
        })
    }
}
