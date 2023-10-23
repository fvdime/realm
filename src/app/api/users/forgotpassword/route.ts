import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import httpStatus from 'http-status';
import next from '@/lib/error-handler';
import sendMail from '@/lib/send-mail';
import { z } from 'zod';
import crypto from 'crypto';

const validateSchema = z.object({
    username: z.string(),
});

function createResetToken() {
    // return Math.floor(
    //     Math.pow(10, 6 - 1) +
    //         Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1)
    // ).toString();

    return crypto.randomBytes(16).toString('hex');
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const isValidData = validateSchema.parse(body);

        let user;

        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(isValidData.username)) {
            user = await prisma.user.findFirst({
                where: {
                    email: isValidData.username,
                    isStatus: true,
                },
                select: {
                    username: true,
                    email: true,
                    id: true,
                },
            });
        } else if (
            /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
                isValidData.username
            )
        ) {
            user = await prisma.user.findFirst({
                where: {
                    username: isValidData.username,
                    isStatus: true,
                },
                select: {
                    username: true,
                    email: true,
                    id: true,
                },
            });
        }

        const now = new Date(Date.now());

        if (!user)
            return next({
                message: "User with given email doesn't exist",
                statusCode: httpStatus.NOT_FOUND,
            });

        let resetToken = await prisma.resetToken.findUnique({
            where: { userId: user.id },
        });

        if (!resetToken) {
            resetToken = await prisma.resetToken.create({
                data: {
                    userId: user.id,
                    token: createResetToken(),
                    createdAt: now,
                },
            });
        } else {
            const timeDiff = Math.abs(
                new Date().getTime() - resetToken.createdAt.getTime()
            );
            const diffMin = Math.ceil(timeDiff / (1000 * 60));

            if (diffMin >= 5) {
                resetToken = await prisma.resetToken.update({
                    where: {
                        id: resetToken.id,
                    },
                    data: {
                        token: createResetToken(),
                        createdAt: now,
                    },
                });
            }
        }

        const result = await sendMail({
            email: user.email,
            subject: 'Password Reset Token',
            text: null,
            html: `<p>Token: ${
                process.env.NEXT_PUBLIC_API_BASE +
                '/resetpassword?expire=' +
                resetToken.token
            }</p>`,
        });

        if (!result) return next({ statusCode: httpStatus.BAD_REQUEST });

        return NextResponse.json(
            {
                success: true,
            },
            { status: httpStatus.OK }
        );
    } catch (error) {
        return next({
            error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
