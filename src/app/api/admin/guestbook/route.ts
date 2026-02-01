import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Guestbook from '@/models/Guestbook';

export async function GET() {
    try {
        await connectToDatabase();
        const entries = await Guestbook.find({}).sort({ createdAt: -1 });
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
    }
}
