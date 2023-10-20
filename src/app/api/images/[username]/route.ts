import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = (
    req: NextRequest,
    { params }: { params: { username: string } }
) => {
    console.log(params.username);
    return NextResponse.json({ success: true }, { status: 200 });
};
