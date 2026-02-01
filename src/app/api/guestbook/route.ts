import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Guestbook from '@/models/Guestbook';

export async function GET() {
    try {
        await connectToDatabase();
        const entries = await Guestbook.find({ approved: true })
            .sort({ createdAt: -1 })
            .limit(50);
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, message } = await req.json();

        if (!name || !message) {
            return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
        }

        await connectToDatabase();
        const entry = await Guestbook.create({
            name,
            message,
            approved: false // New entries must be approved by admin
        });

        return NextResponse.json(entry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit entry' }, { status: 500 });
    }
}
