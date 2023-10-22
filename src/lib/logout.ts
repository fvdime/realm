import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import prisma from './prisma';

const logout = async (req: NextRequest) => {
    const accessToken =
        req?.cookies?.get('accesstoken')?.value ||
        req?.headers?.get('authorization')?.split(' ')[1];

    await prisma.token.delete({
        where: {
            token: accessToken,
        },
    });

    cookies().delete('accesstoken');
};

export default logout;
