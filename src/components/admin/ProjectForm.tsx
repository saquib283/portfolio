"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        tags: initialData?.tags?.join(', ') || '',
        image: initialData?.image || '',
        link: initialData?.link || '',
        content: initialData?.content || '', // Case Study Content
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map((tag: string) => tag.trim())
        };

        try {
            const url = isEdit ? `/api/projects/${initialData._id}` : '/api/projects';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save');

            router.push('/admin/projects');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/projects" className="flex items-center text-sm text-secondary hover:text-primary transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Projects
                </Link>
            </div>
            <h1 className="text-3xl font-display text-primary mb-8">{isEdit ? 'Edit Project' : 'New Project'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Short Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        rows={3}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Tags (comma separated)</label>
                    <input
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Image URL</label>
                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Project Link (Demo/GitHub)</label>
                    <input
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                    />
                </div>

                <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">Case Study</h3>
                        <div className="group relative">
                            <Info size={16} className="text-secondary cursor-help" />
                            <div className="absolute left-6 top-0 w-64 bg-black border border-border p-2 rounded text-xs text-secondary hidden group-hover:block z-50">
                                Write a detailed case study using Markdown. This will be displayed on the individual project page.
                            </div>
                        </div>
                    </div>

                    <label className="block text-sm font-medium text-secondary mb-1">Content (Markdown)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent font-mono text-sm"
                        rows={12}
                        placeholder="# Project Overview&#10;&#10;Here is a deep dive into the project..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Project'}
                </button>
            </form>
        </div>
    );
}
