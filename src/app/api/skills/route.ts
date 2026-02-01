import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Skill from '@/models/Skill';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const skills = await Skill.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json(skills);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, icon, order } = await req.json();

        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        await connectToDatabase();
        const skill = await Skill.create({ name, icon, order });

        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
    }
}
