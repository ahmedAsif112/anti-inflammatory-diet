import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // 1️⃣ Capture referral
    const ref = url.searchParams.get('ref');
    if (ref) {
        // Save in cookie so client can later read it
        const response = NextResponse.next();
        response.cookies.set('referrer', ref, { path: '/' });
        
        // Remove ref from URL
        url.search = '';
        return NextResponse.redirect(url, { headers: response.headers });
    }

    // 2️⃣ Auth check
    const isLoggedIn = request.cookies.get('admin-auth')?.value === 'true';
    if (!isLoggedIn && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/'], // adjust paths where ref might appear
};
