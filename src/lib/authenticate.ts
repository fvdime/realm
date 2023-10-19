'use server';

import prisma from './prisma';
import { NextRequest } from 'next/server';

const authenticate = async (req: NextRequest) => {
    const accessToken =
        req?.cookies?.get('accesstoken')?.value ||
        req?.headers?.get('authorization')?.split(' ')[1];

    console.log('Access Token', req?.cookies?.get('accesstoken')?.value);

    if (!accessToken) return false;

    const token = await prisma.token.findFirst({
        where: {
            token: accessToken,
        },
    });

    if (!token) return false;

    const timeDiff = Math.abs(
        new Date().getTime() - token?.createdAt.getTime()
    );

    const diffMin = Math.ceil(timeDiff / (1000 * 60));

    if (diffMin >= 60 * 24) {
        await prisma.token.delete({
            where: {
                id: token.id,
            },
        });
        return false;
    }

    // const user = await prisma.user.findUnique({
    //     where: {
    //         id: token.userId
    //     }
    // })

    return token?.userId;
};

export default authenticate;