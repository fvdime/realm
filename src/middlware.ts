import { NextResponse, NextRequest } from 'next/server';
export default function middleware(req: NextRequest) {
    // if (req.nextUrl.pathname.startsWith('/api')) {
    //     return NextResponse.next();
    // }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/users/getbytoken',
};
