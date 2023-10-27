import { z } from 'zod';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import next from '@/lib/error-handler';

const updateSchema = z.object({
    username: z.string().regex(new RegExp(/^[a-zA-Z0-9-]{3,30}$/)),
});

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();

        const userId = String(req?.headers.get('userId'));

        const isValidData = updateSchema.parse(body);

        const updateUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username: isValidData.username,
            },
            select: {
                username: true,
                email: true,
                id: true,
                photoUrl: true,
            },
        });

        return NextResponse.json({ success: true, user: updateUser });
    } catch (error) {
        return next({
            error: error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
