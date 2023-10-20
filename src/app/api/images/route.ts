import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import next from '@/lib/error-handler';
import { File } from 'buffer';
import httpStatus from 'http-status';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    //@ts-ignore
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const POST = async (req: NextRequest) => {
    try {
        const userId = req?.headers.get('userId');

        const formData = await req.formData();

        const fileData = formData.get('image');

        const description = String(formData.get('description'));

        if (!fileData || !(fileData instanceof File)) {
            return NextResponse.json({ success: false });
        }

        const fileName = uuidv4() + fileData.name;

        const fileContentArray = fileName.split('.');

        const fileContent = fileContentArray[fileContentArray.length - 1];

        const FileBody: any = await fileData.arrayBuffer();

        const bucketName = process.env.BUCKET_NAME;

        const res = await s3.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: fileName,
                Body: FileBody,
                ContentType: `image/${fileContent}`,
            })
        );

        if (res['$metadata']?.httpStatusCode != 200) {
            return NextResponse.json(
                { success: false },
                { status: httpStatus.BAD_REQUEST }
            );
        }

        const image = await prisma.image.create({
            data: {
                createdAt: new Date(Date.now()),
                imageUrl: fileName,
                description: description,
                userId: String(userId),
            },
        });

        return NextResponse.json(
            { success: true, image: image },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return next({
            error,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }
};
