import ExperienceForm from "@/components/admin/ExperienceForm";
import Experience from "@/models/Experience";
import connectToDatabase from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectToDatabase();

    const experience = await Experience.findById(id).lean();

    if (!experience) {
        notFound();
    }

    const serializedExperience = JSON.parse(JSON.stringify(experience));

    return (
        <div>
            <ExperienceForm initialData={serializedExperience} isEdit={true} />
        </div>
    );
}
