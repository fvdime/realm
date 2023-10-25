import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import next from '@/lib/error-handler';
import httpStatus from 'http-status';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const id = params.id;

        const image = await prisma.image.findFirst({
            where: {
                id: id,
                isShowStatus: true,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true, image }, { status: 200 });
    } catch (error) {
        return next({
            error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
};
