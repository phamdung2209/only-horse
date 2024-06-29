import Link from 'next/link'

import config from '~/configs'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-xl">Page Not Found</h2>
            <Link
                href={config.routes.home}
                className="text-blue-500 mt-2 hover:underline cursor-pointer"
            >
                Go back to home
            </Link>
        </div>
    )
}
