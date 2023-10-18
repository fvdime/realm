import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import next from '@/lib/error-handler';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { expTime } from '@/lib/commons';

const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        let user;

        const isValidData = loginSchema.parse(body);

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
                    photoUrl: true,
                    password: true,
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
                    photoUrl: true,
                    password: true,
                },
            });
        }

        if (!user)
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found',
                },
                { status: httpStatus.BAD_REQUEST }
            );

        const match = await bcrypt.compare(isValidData.password, user.password);

        if (match) {
            user.password = '';

            const token = await prisma.token.create({
                data: {
                    token: uuidv4() + crypto.randomBytes(32).toString('hex'),
                    createdAt: new Date(),
                    userId: user.id,
                },
            });

            if (!token)
                NextResponse.json(
                    {
                        success: true,
                        data: user,
                    },
                    { status: 200 }
                );

            const response = NextResponse.json(
                {
                    success: true,
                    data: user,
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
            message: 'Password is wrong',
        });
    } catch (error) {
        return next({
            error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
