import ProjectForm from "@/components/admin/ProjectForm";
import Project from "@/models/Project";
import connectToDatabase from "@/lib/db";
import { notFound } from "next/navigation";

// Correctly await params in Next.js 15+ (if using that version, wait.. user is on 16 or 15)
// Check package.json: "next": "^16.1.6". Yes, params is a promise.

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectToDatabase();

    // Use lean() and JSON serialization to pass to client component props
    const project = await Project.findById(id).lean();

    if (!project) {
        notFound();
    }

    // Serialize _id and dates
    const serializedProject = JSON.parse(JSON.stringify(project));

    return (
        <div>
            <ProjectForm initialData={serializedProject} isEdit={true} />
        </div>
    );
}
