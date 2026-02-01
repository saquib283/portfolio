import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Guestbook from '@/models/Guestbook';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Helper to ensure admin
async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthorized');
}

type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {
        await checkAuth();
        const { id } = await params;
        const body = await req.json();

        await connectToDatabase();
        const updated = await Guestbook.findByIdAndUpdate(id, body, { new: true });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized or Failed' }, { status: 401 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        await checkAuth();
        const { id } = await params;

        await connectToDatabase();
        await Guestbook.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized or Failed' }, { status: 401 });
    }
}
