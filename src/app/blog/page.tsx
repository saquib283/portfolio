"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [postsRes, settingsRes] = await Promise.all([
                    fetch('/api/posts'),
                    fetch('/api/settings')
                ]);
                const postsData = await postsRes.json();
                const settingsData = await settingsRes.json();
                setPosts(postsData);
                setSettings(settingsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Extract unique tags
    const allTags = Array.from(new Set(posts.flatMap((post: any) => post.tags || [])));

    // Filter posts
    const filteredPosts = posts.filter((post: any) => {
        const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    if (!loading && settings && settings.visibility?.blog === false) {
        return (
            <div className="bg-background min-h-screen text-secondary font-sans flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">Blog Unavailable</h1>
                <p className="text-lg text-secondary mb-8">The blog section is currently disabled by the administrator.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-background font-bold rounded-xl hover:opacity-90 transition-colors">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen text-secondary font-sans selection:bg-accent selection:text-white flex flex-col">
            <Navbar settings={settings} />

            <main className="flex-grow py-24 px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
                        Thoughts & <span className="text-accent">Insights</span>
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto">
                        Exploring the intersection of design, code, and user experience.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-24">
                        <p className="text-secondary text-lg">Loading...</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        {/* Search Bar */}
                        <div className="mb-8 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>

                        {/* Tag Filter */}
                        {allTags.length > 0 && (
                            <div className="mb-8 flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedTag ? 'bg-accent text-black' : 'bg-surface border border-border text-secondary hover:opacity-80'
                                        }`}
                                >
                                    All
                                </button>
                                {allTags.map((tag: any) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag ? 'bg-accent text-black' : 'bg-surface border border-border text-secondary hover:opacity-80'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Posts Grid */}
                        <div className="grid gap-12">
                            {filteredPosts.length > 0 ? filteredPosts.map((post: any) => (
                                <Link href={`/blog/${post.slug}`} key={post._id} className="group block">
                                    <article className="bg-surface border border-border rounded-2xl p-8 hover:border-accent/40 transition-colors">
                                        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-4">
                                            <div className="flex gap-2">
                                                {post.tags?.map((tag: string, i: number) => (
                                                    <span key={i} className="text-xs font-medium px-2 py-1 rounded bg-surfaceHighlight text-accent border border-border">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <time className="text-sm font-mono text-secondary/60">
                                                {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </time>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-secondary leading-relaxed mb-6">
                                            {post.description}
                                        </p>

                                        <span className="text-sm font-bold text-primary group-hover:underline decoration-accent underline-offset-4">
                                            Read Article &rarr;
                                        </span>
                                    </article>
                                </Link>
                            )) : (
                                <div className="text-center py-24 border border-dashed border-border rounded-2xl">
                                    <p className="text-secondary text-lg">No posts match your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <Footer settings={settings?.contact} visibility={settings?.visibility} />
        </div>
    );
}
