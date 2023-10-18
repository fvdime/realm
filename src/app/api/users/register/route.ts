import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import next from '@/lib/error-handler';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { expTime } from '@/lib/commons';

const createSchema = z.object({
    username: z.string().regex(new RegExp(/^[a-zA-Z0-9-]{3,30}$/)),
    password: z.string().min(6),
    // confirmPassword: z.string().min(6),
    email: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .email('This is not a valid email.'),
    birthday: z.coerce.date(),
});
// .superRefine(
//     (
//         {
//             confirmPassword,
//             password,
//         }: { confirmPassword: string; password: string },
//         ctx: any
//     ) => {
//         if (confirmPassword !== password) {
//             ctx.addIssue({
//                 code: 'custom',
//                 message: 'The passwords did not match',
//             });
//         }
//     }
// );

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const isValidData = createSchema.parse(body);

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: isValidData.email },
                    { username: isValidData.username },
                ],
            },
        });

        if (user) {
            if (user?.email === isValidData.email) {
                return next({
                    statusCode: httpStatus.CONFLICT,
                    message: 'Mail exists',
                });
            } else {
                return next({
                    statusCode: httpStatus.CONFLICT,
                    message: 'Username exists',
                });
            }
        }

        const hash = await bcrypt.hash(isValidData.password, 10);

        const savedUser = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                createdAt: new Date(Date.now()),
                birthday: new Date(body.birthday),
                password: hash,
            },
            select: {
                username: true,
                email: true,
                id: true,
                photoUrl: true,
                birthday: true,
            },
        });

        if (savedUser) {
            const token = await prisma.token.create({
                data: {
                    token: uuidv4() + crypto.randomBytes(32).toString('hex'),
                    createdAt: new Date(),
                    userId: savedUser.id,
                },
            });

            if (!token)
                return NextResponse.json(
                    {
                        success: true,
                        data: savedUser,
                    },
                    { status: 200 }
                );

            const response = NextResponse.json(
                {
                    success: true,
                    data: savedUser,
                    token: token.token,
                },
                { status: 200 }
            );

            response.cookies.set({
                name: 'accesstoken',
                value: token.token,
                path: '/',
                expires: Date.now() + expTime,
            });

            return response;
        }

        return next({
            statusCode: httpStatus.BAD_REQUEST,
            message: 'User not created',
        });
    } catch (error) {
        return next({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            error,
        });
    }
}
