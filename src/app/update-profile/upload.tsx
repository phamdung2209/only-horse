'use client'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

import { Button } from '~/components/ui/button'
import { storage } from '~/configs/firebase.config'
import { uploadFile } from '~/lib/actions'
import { blobFile, readFileAsDataURL } from '~/lib/utils'

const Upload = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [progress, setProgress] = useState<number>(0)
    const [url, setUrl] = useState<string>('')

    const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // if (!inputRef.current?.files?.length) return
        // console.log('submit')
        // const file = inputRef.current?.files?.[0]

        // const uploadFile = uploadBytesResumable(ref(storage, 'images/' + file?.name), file!)
        // uploadFile.on('state_changed', (snapshot) => {
        //     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        //     console.log('Upload is ' + progress + '% done')
        //     setProgress(progress)
        //     // get url file use es6
        //     if (progress === 100) {
        //         const imgUrl = getDownloadURL(uploadFile.snapshot.ref)
        //         imgUrl.then((url) => {
        //             setUrl(url)
        //         })
        //     }
        // })
    }

    console.log('url-----------', url)
    const [errMsg, dispatch] = useFormState(() => {
        console.log('submit')
    }, null)

    return (
        <div>
            <input type="file" ref={inputRef} />
            <form onSubmit={handleSumit} action={dispatch}>
                <Button type="submit">Upload</Button>
            </form>
            <h1>{progress}%</h1>
            <video src={url} controls></video>
            <Image src={url} alt="" width={1300} height={1300} className="w-auto h-auto" />
            <img src={url} alt="" />
        </div>
    )
}

export default Upload
