'use server'

export async function uploadFile(formData: any) {
    try {
        if (!formData) throw new Error('No file provided')

        const response = await fetch(process.env.NEXT_PUBLIC_GG_DR_UPLOAD!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('Failed to upload file')

        const data = await response.json()
        if (data.error) throw new Error(data.error || 'Upload failed')

        return data
    } catch (error) {
        console.error('Error uploading file:', error)
        return { error: (error as Error).message }
    }
}
