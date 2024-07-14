/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.vercel.sh',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    // config proxy
    // async rewrites() {
    //     return [
    //         {
    //             source: '/:path*',
    //             destination: 'https://dungpv-api.vercel.app/:path*',
    //         },
    //     ]
    // },
}

export default nextConfig
