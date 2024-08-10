import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import configApp from '~/configs'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (
        request.nextUrl.pathname.startsWith(configApp.routes.dashboard) &&
        user?.email !== configApp.adminEmail
    ) {
        return NextResponse.redirect(new URL(configApp.routes.home, request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
