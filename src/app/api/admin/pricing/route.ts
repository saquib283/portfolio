import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import PricingTier from '@/models/PricingTier';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const tiers = await PricingTier.find({}).sort({ order: 1, price: 1 });
        return NextResponse.json(tiers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch pricing tiers' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        // Basic validation
        if (!body.title || !body.price) {
            return NextResponse.json({ error: 'Title and Price are required' }, { status: 400 });
        }

        await connectToDatabase();
        const newTier = await PricingTier.create(body);

        return NextResponse.json(newTier, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create pricing tier' }, { status: 500 });
    }
}
