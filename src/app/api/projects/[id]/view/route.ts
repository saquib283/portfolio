import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const project = await Project.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        ) as any;

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ views: project.views });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
    }
}
