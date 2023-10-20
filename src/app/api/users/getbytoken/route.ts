import prisma from '@/lib/prisma';
import httpStatus from 'http-status';
import next from '@/lib/error-handler';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req?.headers.get('userId');

    console.log('UserID ROUte: ', userId);

    if (!userId)
        return next({
            errCode: '401',
            statusCode: httpStatus.UNAUTHORIZED,
        });

    const user = await prisma.user.findFirst({
        where: { id: userId, isStatus: true },
        select: {
            id: true,
            email: true,
            username: true,
            photoUrl: true,
        },
    });

    if (!user)
        return next({
            statusCode: httpStatus.NOT_FOUND,
            message: 'User not found',
        });

    return NextResponse.json(
        {
            success: true,
            data: user,
        },
        { status: httpStatus.OK }
    );
}
