import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const project = await Project.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        ) as any; // Cast to any to avoid strict type checks on dynamic schema updates

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ likes: project.likes });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to like project' }, { status: 500 });
    }
}
