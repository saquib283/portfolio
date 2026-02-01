export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Plus, Edit, Eye, FileText } from 'lucide-react';
import Post from '@/models/Post';
import connectToDatabase from '@/lib/db';
import PostDeleteButton from '@/components/admin/PostDeleteButton';
import { Button, Badge, Card } from '@/components/ui';

async function getPosts() {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ publishedAt: -1 });
    return posts;
}

export default async function AdminPosts() {
    const posts = await getPosts();

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Blog Posts</h1>
                    <p className="text-secondary text-lg">Share your thoughts and tutorials.</p>
                </div>
                <Link href="/admin/posts/new">
                    <Button className="group">
                        <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
                        New Post
                    </Button>
                </Link>
            </header>

            <Card padding="none" className="overflow-hidden bg-surface/30 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surfaceHighlight/50 border-b border-border">
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Article</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Status</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest text-center">Date</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {posts.map((post: any) => (
                                <tr key={post._id} className="hover:bg-surfaceHighlight/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-secondary/40 border border-border group-hover:border-accent/40 transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-primary font-bold group-hover:text-accent transition-colors">{post.title}</p>
                                                <p className="text-xs text-secondary/50 font-mono tracking-tighter">/{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        {post.published ? (
                                            <Badge variant="accent" className="bg-green-500/10 text-green-500 border-green-500/20">
                                                Published
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                                Draft
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="p-6 text-center text-sm font-mono text-secondary">
                                        {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-end gap-3 items-center">
                                            <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-secondary hover:text-accent transition-colors" title="View Live">
                                                <Eye size={18} />
                                            </Link>
                                            <Link href={`/admin/posts/${post._id}`} className="p-2 text-secondary hover:text-primary transition-colors">
                                                <Edit size={18} />
                                            </Link>
                                            <PostDeleteButton id={post._id.toString()} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-4 py-8">
                                            <FileText size={48} className="text-secondary/20" />
                                            <p className="text-secondary text-lg italic">No articles yet. Start writing!</p>
                                            <Link href="/admin/posts/new">
                                                <Button variant="outline" size="sm">Create Post</Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
