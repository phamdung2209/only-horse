'use server'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '~/configs/firebase.config'

export const uploadFile = async (file: File) => {
    let urlImg = ''
    console.log('file', file)

    const uploadFile = uploadBytesResumable(ref(storage, 'images/' + file.name), file)
    uploadFile.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log('Upload is ' + progress + '% done')
        // get url file use es6
        if (progress === 100) {
            const imgUrl = getDownloadURL(uploadFile.snapshot.ref)
            imgUrl.then((url) => {
                console.log('url', url)
                urlImg = url
            })
        }
    })

    return urlImg
}
