import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Guestbook from '@/models/Guestbook';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { approved } = await req.json();

        await connectToDatabase();
        const entry = await Guestbook.findByIdAndUpdate(
            id,
            { approved },
            { new: true }
        );

        if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 });

        return NextResponse.json(entry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const entry = await Guestbook.findByIdAndDelete(id);

        if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 });

        return NextResponse.json({ message: 'Entry deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
    }
}
