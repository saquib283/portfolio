import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Experience from '@/models/Experience';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        // Sort by startDate descending (newest first)
        const experience = await Experience.find({}).sort({ startDate: -1 });
        return NextResponse.json(experience);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        await connectToDatabase();

        const experience = await Experience.create(body);
        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
    }
}
