import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import next from '@/lib/error-handler';
import httpStatus from 'http-status';

export const GET = async (
    req: NextRequest,
    { params }: { params: { username: string } }
) => {
    try {
        console.log(params.username);

        console.log(process.env.DATABASE_URL);

        const user = await prisma.user.findFirst({
            where: {
                username: params.username,
            },
        });

        if (!user)
            return next({
                statusCode: httpStatus.BAD_REQUEST,
            });

        const images = await prisma.image.findMany({
            where: {
                userId: user.id,
                isShowStatus: true,
            },
        });

        return NextResponse.json({ success: true, images }, { status: 200 });
    } catch (error) {
        return next({
            error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
};
