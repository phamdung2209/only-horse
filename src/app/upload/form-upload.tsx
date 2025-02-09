'use client'

import Image from 'next/image'
import { Button } from '~/components/ui/button'
import { useFileUpload } from './useFileUpload'
import { uploadFile } from './actions'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const FormUpload = () => {
    const { inputRef, selectedFile, error, handleFileChange, openFileDialog, removeFile } =
        useFileUpload({
            maxSize: 10000 * 1024 * 1024,
            acceptedTypes: ['*/*'],
        })

    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [data, setData] = useState<{
        id: string
        name: string
        url: string
        preview: string
    } | null>(null)

    const handleUpload = async () => {
        if (!selectedFile) return

        try {
            setIsUploading(true)
            setUploadError(null)

            const result = await uploadFile(selectedFile.postData)
            setData(result)
        } catch (error) {
            console.error('Error uploading file:', error)
            setUploadError((error as Error).message)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4 mt-4">
            <input type="file" hidden ref={inputRef} onChange={handleFileChange} accept="*/*" />

            <div className="flex gap-2">
                <Button
                    onClick={openFileDialog}
                    variant={'outline'}
                    type="button"
                    disabled={isUploading}
                >
                    {selectedFile ? 'Change file' : 'Upload a file'}
                </Button>

                <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                    {isUploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        'Post File'
                    )}
                </Button>

                {selectedFile && (
                    <Button variant="destructive" onClick={removeFile} disabled={isUploading}>
                        Remove
                    </Button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}

            {selectedFile && (
                <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Selected File:</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Name: {selectedFile.name}</p>
                        <p>Type: {selectedFile.type || 'Unknown'}</p>
                        <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)}MB</p>

                        {selectedFile.type.startsWith('image/') && (
                            <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                                <Image
                                    draggable={false}
                                    src={selectedFile.preview!}
                                    alt="Post Media"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    className="rounded-lg object-contain"
                                />
                            </div>
                        )}

                        {selectedFile.type.startsWith('video/') && (
                            <video
                                src={selectedFile.preview}
                                controls
                                className="w-full rounded-lg"
                            />
                        )}

                        {selectedFile.type.startsWith('audio/') && (
                            <audio src={selectedFile.preview} controls className="w-full" />
                        )}

                        {selectedFile.type.startsWith('application/') && (
                            <div className="flex items-center space-x-2">
                                <p>Preview not available</p>
                                <Button
                                    variant="outline"
                                    onClick={() => window.open(selectedFile.preview!, '_blank')}
                                >
                                    View
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center space-x-2">
                            <p>File:</p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const url = URL.createObjectURL(selectedFile)
                                    const a = document.createElement('a')
                                    a.href = url
                                    a.download = selectedFile.name
                                    a.click()
                                    URL.revokeObjectURL(url)
                                }}
                                disabled={isUploading}
                            >
                                Download
                            </Button>
                        </div>

                        {/* hiện thông tin khi đã có data trả về */}
                        {data && (
                            <div className="space-y-1">
                                <p>
                                    <strong>File ID:</strong> {data.id}
                                </p>
                                <p>
                                    <strong>File Name:</strong> {data.name}
                                </p>
                                <p>
                                    <strong>File URL:</strong>{' '}
                                    <a
                                        href={data.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        {data.url}
                                    </a>
                                </p>
                                <p>
                                    <strong>Preview:</strong>{' '}
                                    <a
                                        href={data.preview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        {data.preview}
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormUpload
