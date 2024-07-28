'use client' // Error components must be Client Components

import { ChevronLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, buttonVariants } from '~/components/ui/button'
import config from '~/configs'

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

    const [isRefreshed, setIsRefreshed] = useState<boolean>(false)
    console.log(isRefreshed)

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="text-center text-lg mb-6">
                We couldn't find the order you're looking for. Please check the order ID and try
                again.
            </p>
            <div className="flex flex-col items-center gap-2">
                <Button
                    className="flex items-center gap-2"
                    variant={'outline'}
                    onClick={() => {
                        setIsRefreshed(true)
                        const timer = setTimeout(() => {
                            setIsRefreshed(false)
                            reset()
                            clearTimeout(timer)
                        }, 1000)
                    }}
                >
                    <span>Try again</span>{' '}
                    <RefreshCw size={20} className={`${isRefreshed && 'animate-spin'}`} />
                </Button>

                <span className="font-semibold">or</span>

                <Link
                    href={config.routes.home}
                    className="text-blue-500 hover:underline cursor-pointer flex items-center"
                >
                    <ChevronLeft /> Go back home
                </Link>
            </div>
        </div>
    )
}
