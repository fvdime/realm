'use server';

import prisma from './prisma';
import { NextRequest } from 'next/server';
import logout from './logout';

const authenticate = async (req: NextRequest) => {
    const accessToken =
        req?.cookies?.get('accesstoken')?.value ||
        req?.headers?.get('authorization')?.split(' ')[1];

    if (!accessToken) return false;

    const token = await prisma.token.findFirst({
        where: {
            token: accessToken,
        },
    });

    if (!token) {
        await logout(req);
        return false;
    }

    const timeDiff = Math.abs(
        new Date().getTime() - token?.createdAt.getTime()
    );

    const diffMin = Math.ceil(timeDiff / (1000 * 60));

    console.log(diffMin);

    if (diffMin >= 60 * 24) {
        await logout(req);
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
