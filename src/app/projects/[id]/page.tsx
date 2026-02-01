import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import FocusModeOverlay from '@/components/FocusModeOverlay';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getProject(id: string) {
    try {
        await connectToDatabase();
        if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;

        const project = await Project.findById(id).lean();
        return project ? JSON.parse(JSON.stringify(project)) : null;
    } catch (error) {
        return null;
    }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen text-secondary font-sans selection:bg-accent selection:text-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link
                    href="/#projects"
                    className="inline-flex items-center text-sm text-secondary hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {project.tags.map((tag: string, index: number) => (
                                <span key={index} className="px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-accent">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
                            {project.title}
                        </h1>
                        <p className="text-xl text-secondary leading-relaxed max-w-2xl">
                            {project.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-full hover:opacity-90 transition-colors"
                            >
                                Live Demo <ExternalLink size={18} />
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 border border-border text-primary font-medium rounded-full hover:bg-surface transition-colors"
                            >
                                View Code <Github size={18} />
                            </a>
                        )}
                    </div>

                    {/* Hero Image */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border my-12">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content / Case Study */}
                    {project.content ? (
                        <>
                            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-img:rounded-xl text-secondary">
                                <ReactMarkdown>
                                    {project.content}
                                </ReactMarkdown>
                            </article>
                            <FocusModeOverlay title={project.title}>
                                <ReactMarkdown>
                                    {project.content}
                                </ReactMarkdown>
                            </FocusModeOverlay>
                        </>
                    ) : (
                        <div className="py-12 text-center border-t border-border">
                            <p className="text-secondary italic">Detailed case study coming soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
