import PostForm from "@/components/admin/PostForm";
import Post from "@/models/Post";
import connectToDatabase from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectToDatabase();

    const post = await Post.findById(id).lean();

    if (!post) {
        notFound();
    }

    const serializedPost = JSON.parse(JSON.stringify(post));

    return (
        <div>
            <PostForm initialData={serializedPost} isEdit={true} />
        </div>
    );
}
