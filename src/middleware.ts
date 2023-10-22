import { NextResponse, NextRequest } from 'next/server';
// import authenticate from './lib/authenticate';
import httpStatus from 'http-status';

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api')) {
        if (
            req.nextUrl.pathname.startsWith('/api/images/') &&
            req.method == 'GET'
        )
            return NextResponse.next();

        const accessToken =
            req?.cookies?.get('accesstoken')?.value ||
            req?.headers?.get('authorization')?.split(' ')[1];

        console.log(process.env.NEXT_PUBLIC_API_BASE + '/api/auth');

        console.log('Token', accessToken);

        const res = await fetch(
            process.env.NEXT_PUBLIC_API_BASE + '/api/auth',
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
                method: 'POST',
            }
        );

        const { success, userId } = await res.json();

        if (!userId || !success)
            return NextResponse.json(
                {
                    success: false,
                    message: 'Auth failed',
                    errCode: '401',
                },
                { status: httpStatus.UNAUTHORIZED }
            );
        return NextResponse.next({
            headers: {
                userId: userId,
            },
        });
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/users/getbytoken',
        '/api/images/:path*',
        '/api/savedimages/:path*',
    ],
};
