import { NextResponse } from 'next/server'

export async function middleware(request) {
    let allow = await fetch(new URL('/api/auth', request.url))
    allow = await allow.json()

    if (allow.value != true) {
        return NextResponse.redirect(new URL('/auth', request.url))
    } else if (allow.value === null) {
        return NextResponse.redirect(new URL('/auth/create', request.url))
    }
}

export const config = {
    matcher: '/app/:path*',
}