import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const cookie = request.cookies
    const accessToken = cookie.get("access_token")?.value
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (accessToken) return NextResponse.redirect(new URL('/dashboard', request.url));
        NextResponse.next()
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!accessToken) return NextResponse.redirect(new URL('/dashboard', request.url));
        NextResponse.next()
    }
}