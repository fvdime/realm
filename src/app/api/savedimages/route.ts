import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import next from '@/lib/error-handler';
import httpStatus from 'http-status';
import { z } from 'zod';

const savedSchema = z.object({
    imageId: z.string(),
});

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const isValidData = savedSchema.parse(body);

        const userId = req?.headers.get('userId');

        if (!userId)
            return next({
                errCode: '401',
                statusCode: httpStatus.UNAUTHORIZED,
            });

        const savedImageExist = await prisma.savedImage.findFirst({
            where: {
                imageId: isValidData.imageId,
                userId: userId,
            },
        });

        if (savedImageExist) {
            const updatedSavedImage = await prisma.savedImage.update({
                where: {
                    id: savedImageExist.id,
                },
                data: {
                    isStatus: true,
                    createdAt: new Date(Date.now()),
                },
            });

            return NextResponse.json(
                { success: true, savedImage: updatedSavedImage },
                { status: 200 }
            );
        }

        const createSavedImage = await prisma.savedImage.create({
            data: {
                userId: userId,
                imageId: isValidData.imageId,
                createdAt: new Date(Date.now()),
            },
        });

        return NextResponse.json(
            { success: true, createSavedImage },
            { status: 200 }
        );
    } catch (error) {
        return next({
            error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
};
