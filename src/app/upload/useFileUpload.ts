import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { readFileAsDataURL } from '~/lib/utils'

interface FileWithPreview extends File {
    preview?: string
    base64?: string
    postData?: { name: string; type: string; data: string }
}

interface UseFileUploadOptions {
    maxSize?: number
    acceptedTypes?: string[]
}

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
    const { maxSize = 10 * 1024 * 1024, acceptedTypes = ['*/*'] } = options

    const inputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(null)
    const [error, setError] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            setError('')
            setIsProcessing(true)
            const file = e.target.files?.[0]

            if (!file) return

            if (file.size > maxSize) {
                setError(`File size must be less than ${maxSize / 1024 / 1024}MB`)
                return
            }

            if (acceptedTypes[0] !== '*/*') {
                const isValidType = acceptedTypes.some((type) =>
                    file.type.match(new RegExp(type.replace('*', '.*'))),
                )
                if (!isValidType) {
                    setError(`File type must be: ${acceptedTypes.join(', ')}`)
                    return
                }
            }

            const preview = URL.createObjectURL(file)
            const base64 = (await readFileAsDataURL(file)).split(',')[1]
            const postData = {
                name: file.name,
                type: file.type,
                data: base64,
            }

            const fileWithPreview = Object.assign(file, {
                preview,
                postData,
            })

            setSelectedFile(fileWithPreview)
        } catch (err) {
            setError('Failed to process file')
            console.error('File processing error:', err)
        } finally {
            setIsProcessing(false)
        }
    }

    const openFileDialog = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const removeFile = () => {
        setSelectedFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        if (selectedFile?.preview) {
            URL.revokeObjectURL(selectedFile.preview)
        }
    }

    useEffect(() => {
        return () => {
            if (selectedFile?.preview) {
                URL.revokeObjectURL(selectedFile.preview)
            }
        }
    }, [selectedFile])

    return {
        inputRef,
        selectedFile,
        error,
        isProcessing,
        handleFileChange,
        openFileDialog,
        removeFile,
    }
}
