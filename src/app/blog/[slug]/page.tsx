import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import connectToDatabase from '@/lib/db';
import Post from '@/models/Post';
import Settings from '@/models/Settings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getSettings() {
    try {
        await connectToDatabase();
        const settings = await Settings.findOne({}).lean();
        return settings ? JSON.parse(JSON.stringify(settings)) : null;
    } catch (error) {
        return null;
    }
}

async function getPost(slug: string) {
    try {
        await connectToDatabase();
        const post = await Post.findOne({ slug, published: true }).lean();
        return post ? JSON.parse(JSON.stringify(post)) : null;
    } catch (error) {
        return null;
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    const settings = await getSettings();

    if (!post) {
        notFound();
    }

    // Simple functionality to extract headers for ToC
    // In a production app with remark plugins this would be automatic,
    // but here we can do a regex pass for simplicity or use a client component.
    // Let's pass the raw content to a client component that handles the ToC and Rendering.

    return (
        <div className="bg-background min-h-screen text-secondary font-sans selection:bg-accent selection:text-white flex flex-col">
            <Navbar settings={settings} />
            <BlogPostContent post={post} />
            <Footer settings={settings?.contact} visibility={settings?.visibility} />
        </div>
    );
}

// Separate client component for interactivity (ToC)
import BlogPostContent from '@/components/BlogPostContent';
