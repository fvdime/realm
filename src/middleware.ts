import { NextResponse, NextRequest } from 'next/server';

const AUTH_PAGES = ['/login', '/register', '/forgotpassword', '/resetpassword'];

const isAuthPages = (url: any) =>
    AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api/images/') && req.method == 'GET')
        return NextResponse.next();

    const accessToken =
        req?.cookies?.get('accesstoken')?.value ||
        req?.headers?.get('authorization')?.split(' ')[1];

    const isAuthPageRequested = isAuthPages(req.nextUrl.pathname);

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/auth', {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
        method: 'POST',
    });

    const { success, userId } = await res.json();

    const hasVerifiedToken = !(!userId || !success);

    console.log(hasVerifiedToken);

    if (isAuthPageRequested) {
        if (!hasVerifiedToken) {
            const response = NextResponse.next();
            response.cookies.delete('token');
            return response;
        }

        const response = NextResponse.redirect(new URL(`/`, req.url));
        return response;
    }

    if (!hasVerifiedToken) {
        if (req.nextUrl.pathname.startsWith('/api')) {
            const response = NextResponse.json(
                {
                    success: false,
                    message: 'Auth failed',
                    errCode: '401',
                },
                { status: 401 }
            );
            response.cookies.delete('token');
            return response;
        }
        const searchParams = new URLSearchParams(req.nextUrl.searchParams);
        searchParams.set('next', req.nextUrl.pathname);

        const response = NextResponse.redirect(
            new URL(`/login?${searchParams}`, req.url)
        );

        return response;
    }

    return NextResponse.next({
        headers: {
            userId: userId,
        },
    });
}

export const config = {
    matcher: [
        '/api/users/getbytoken',
        '/api/images/:path*',
        '/api/savedimages/:path*',
        '/login',
        '/register',
        '/forgotpassword',
        '/resetpassword',
        '/account',
    ],
};
