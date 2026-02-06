import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Skill from '@/models/Skill';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectToDatabase();
        await Skill.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        console.log("PATCH /api/skills/[id] - ID:", id);
        console.log("PATCH Body:", body);

        const { name, icon } = body;

        await connectToDatabase();

        const skill = await Skill.findByIdAndUpdate(
            id,
            { name, icon },
            { new: true, runValidators: true }
        );

        if (!skill) {
            console.error("Skill not found for ID:", id);
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }

        console.log("Skill updated successfully:", skill);
        return NextResponse.json(skill);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
    }
}
