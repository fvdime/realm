import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import next from '@/lib/error-handler';
import httpStatus from 'http-status';

export const GET = async (
    req: NextRequest,
    { params }: { params: { username: string } }
) => {
    try {
        // const { searchParams } = new URL(req.url);

        // const userId: string =
        //     searchParams.get('userId') || '635981f6e40f61599e839ddb';

        const user = await prisma.user.findFirst({
            where: {
                username: params.username,
                isStatus: true,
            },
            select: {
                id: true,
                username: true,
                email: true,
                birthday: true,
                photoUrl: true,
                fullname: true,
                bio: true,
                Images: {
                    where: {
                        isShowStatus: true,
                    },
                    // include: {
                    //     SavedImages: {
                    //         where: {
                    //             isStatus: true,
                    //             userId: userId,
                    //         },
                    //     },
                    // },
                },
            },
        });

        if (!user)
            return next({
                statusCode: httpStatus.BAD_REQUEST,
            });

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        return next({
            error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
};
