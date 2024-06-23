'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
            <strong className="text-lg">{error.message}</strong>

            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
                Try again
            </button>
        </div>
    )
}
