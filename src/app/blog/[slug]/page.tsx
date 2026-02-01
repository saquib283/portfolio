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

    return (
        <div className="bg-background min-h-screen text-secondary font-sans selection:bg-accent selection:text-white flex flex-col">
            <Navbar settings={settings} />

            <main className="flex-grow py-12 px-6">
                <article className="max-w-3xl mx-auto mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-secondary hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <header className="mb-12">
                        <div className="flex gap-2 mb-6">
                            {post.tags.map((tag: string, i: number) => (
                                <span key={i} className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-secondary/60 font-mono border-l-2 border-accent pl-4">
                            <time>
                                {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                            <span>•</span>
                            <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                        </div>
                    </header>

                    {post.coverImage && (
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-12">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-img:rounded-xl prose-pre:bg-surfaceHighlight prose-pre:border prose-pre:border-white/10">
                        <ReactMarkdown>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
