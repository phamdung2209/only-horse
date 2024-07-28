import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'next-cloudinary/dist/cld-video-player.css'

import './globals.css'
import { ThemeProvider } from '~/components/providers/theme-provider'
import Footer from '~/components/footer'
import TanStackProvider from '~/providers/tan-stack-provider'
import { Toaster } from '~/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Only Horse, E-commerce for horses',
    description:
        'Only Horse is a platform for horse lovers which includes a wide of exclusive content and merchandise.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta property="og:title" content="OnlyHorse built by DUNG_PHAM" />
                <meta
                    property="og:description"
                    content="Only Horse is a platform for horse lovers which includes a wide of exclusive content and merchandise."
                />
                <meta
                    property="og:image"
                    content="https://res.cloudinary.com/den0awox0/image/upload/v1721491580/horse/djzn4ejiatypvb88fyq7.png"
                />
                <meta property="og:url" content="https://horse.dungpv.id.vn" />
                <meta property="og:site_name" content="DUNG_PHAM" />
                <meta property="og:type" content="website" />
            </head>

            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="h-screen flex flex-col">
                        <div className="flex-1">
                            <TanStackProvider>{children}</TanStackProvider>
                        </div>
                        <Footer />
                    </main>
                </ThemeProvider>

                <Toaster />
            </body>
        </html>
    )
}
