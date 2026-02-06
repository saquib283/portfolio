"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, List } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function BlogPostContent({ post }: { post: any }) {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Generate IDs for headings and extract them
    useEffect(() => {
        const elements = document.querySelectorAll('h2, h3');
        const items: { id: string; text: string; level: number }[] = [];

        elements.forEach((el) => {
            if (!el.id) {
                el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
            }
            if (el.id) {
                items.push({
                    id: el.id,
                    text: el.textContent || '',
                    level: parseInt(el.tagName.substring(1))
                });
            }
        });

        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -35% 0px' }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [post.content]);

    // Custom renderer to add IDs to headings (redundant if checking DOM, but good for SSR/initial render consistency if extended)
    const components = {
        h2: ({ children }: any) => {
            const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return <h2 id={id} className="scroll-mt-24">{children}</h2>;
        },
        h3: ({ children }: any) => {
            const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return <h3 id={id} className="scroll-mt-24">{children}</h3>;
        }
    };

    return (
        <main className="flex-grow py-12 px-6 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

                {/* Main Content */}
                <article className="lg:max-w-3xl w-full">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-secondary hover:text-white transition-colors mb-8 group"
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
                        <ReactMarkdown components={components}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>

                {/* Sidebar ToC */}
                <aside className="hidden lg:block relative">
                    <div className="sticky top-32">
                        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                <List size={16} className="text-accent" />
                                On this page
                            </h4>
                            <nav className="flex flex-col space-y-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                {headings.map((heading) => (
                                    <a
                                        key={heading.id}
                                        href={`#${heading.id}`}
                                        className={`text-sm transition-all duration-200 border-l-2 pl-4 py-1 block ${activeId === heading.id
                                                ? 'border-accent text-accent font-medium'
                                                : 'border-transparent text-secondary hover:text-white hover:border-white/20'
                                            } ${heading.level === 3 ? 'ml-4' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                            setActiveId(heading.id);
                                        }}
                                    >
                                        {heading.text}
                                    </a>
                                ))}
                                {headings.length === 0 && (
                                    <p className="text-secondary/40 text-sm italic">No sections detected</p>
                                )}
                            </nav>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
