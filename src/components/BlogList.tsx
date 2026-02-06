"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input, Card, Badge } from './ui';

export default function BlogList({ posts }: { posts: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8 relative">
                <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={20} />
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedTag
                            ? 'bg-accent text-black'
                            : 'bg-surface border border-border text-secondary hover:opacity-80'
                            }`}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
                                ? 'bg-accent text-black'
                                : 'bg-surface border border-border text-secondary hover:opacity-80'
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
                        <Card className="hover:border-accent/40 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-4">
                                <div className="flex gap-2">
                                    {post.tags?.map((tag: string, i: number) => (
                                        <Badge key={i} variant="outline" className="text-accent border-accent/20">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <span>{Math.ceil((post.content?.split(' ').length || 0) / 200)} min read</span>
                            </div>

                            <p className="text-secondary leading-relaxed mb-6">
                                {post.description}
                            </p>

                            <span className="text-sm font-bold text-primary group-hover:underline decoration-accent underline-offset-4">
                                Read Article &rarr;
                            </span>
                        </Card>
                    </Link>
                )) : (
                    <div className="text-center py-24 border border-dashed border-border rounded-2xl">
                        <p className="text-secondary text-lg">No posts match your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
