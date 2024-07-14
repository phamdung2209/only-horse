import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import 'next-cloudinary/dist/cld-video-player.css'
import { ThemeProvider } from '~/components/providers/theme-provider'
import Footer from '~/components/footer'
import TanStackProvider from '~/providers/tan-stack-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Only Horse',
    description: 'Only Horse is a platform for horses, not others.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
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
            </body>
        </html>
    )
}
