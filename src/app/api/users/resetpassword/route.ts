import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import next from '@/lib/error-handler';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const validateSchema = z
    .object({
        expire: z.string().min(16).max(16),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
    })
    .superRefine(
        (
            {
                confirmPassword,
                password,
            }: { confirmPassword: string; password: string },
            ctx: any
        ) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'The passwords did not match',
                });
            }
        }
    );

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const isValidData = validateSchema.parse(body);

        const resetToken = await prisma.resetToken.findUnique({
            where: {
                token: isValidData.expire,
            },
        });

        if (!resetToken)
            return next({
                statusCode: httpStatus.NOT_FOUND,
                message: 'Invalid token or expired',
            });

        const user = await prisma.user.findUnique({
            where: {
                id: resetToken.userId,
            },
        });

        if (!user)
            return next({
                statusCode: httpStatus.NOT_FOUND,
            });

        const timeDiff = Math.abs(
            new Date().getTime() - resetToken.createdAt.getTime()
        );

        const diffMin = Math.ceil(timeDiff / (1000 * 60));

        if (diffMin >= 5) {
            await prisma.resetToken.delete({
                where: { id: resetToken?.id },
            });
            return next({
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Invalid token or expired2',
            });
        }

        const hashedPassword = await bcrypt.hash(isValidData.password, 10);

        const updateUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });

        await prisma.resetToken.delete({
            where: { id: resetToken?.id },
        });

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
