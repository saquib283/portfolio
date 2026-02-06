import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import PricingTier from '@/models/PricingTier';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // Use Promise for params
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await context.params;
        const body = await req.json();

        await connectToDatabase();
        const updatedTier = await PricingTier.findByIdAndUpdate(id, body, { new: true });

        if (!updatedTier) {
            return NextResponse.json({ error: 'Pricing tier not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTier);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update pricing tier' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // Use Promise for params
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await context.params;

        await connectToDatabase();
        const deletedTier = await PricingTier.findByIdAndDelete(id);

        if (!deletedTier) {
            return NextResponse.json({ error: 'Pricing tier not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Pricing tier deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete pricing tier' }, { status: 500 });
    }
}
