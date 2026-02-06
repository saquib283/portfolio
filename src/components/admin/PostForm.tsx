"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import ImageUploader from './ImageUploader';

interface PostFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function PostForm({ initialData, isEdit }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        coverImage: initialData?.coverImage || '',
        tags: initialData?.tags?.join(', ') || '',
        content: initialData?.content || '',
        published: initialData?.published || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (url: string) => {
        setFormData({ ...formData, coverImage: url });
    };

    // Auto-generate slug from title if empty
    const handleTitleBlur = () => {
        if (!formData.slug && formData.title) {
            const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '')
        };

        try {
            const url = isEdit ? `/api/posts/${initialData._id}` : '/api/posts';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save');

            router.push('/admin/posts');
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
                <Link href="/admin/posts" className="flex items-center text-sm text-secondary hover:text-primary transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Posts
                </Link>
            </div>
            <h1 className="text-3xl font-display text-primary mb-8">{isEdit ? 'Edit Post' : 'New Post'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            onBlur={handleTitleBlur}
                            className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Slug (URL)</label>
                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                            required
                        />
                    </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUploader
                        value={formData.coverImage}
                        onChange={handleImageChange}
                        label="Cover Image"
                        placeholder="Enter URL or upload an image"
                    />
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Tags (comma separated)</label>
                        <input
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                            placeholder="Tech, Lifestyle, Tutorial"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">Content</h3>
                        <div className="group relative">
                            <Info size={16} className="text-secondary cursor-help" />
                            <div className="absolute left-6 top-0 w-64 bg-black border border-border p-2 rounded text-xs text-secondary hidden group-hover:block z-50">
                                Write your post using Markdown.
                            </div>
                        </div>
                    </div>

                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent font-mono text-sm"
                        rows={20}
                        placeholder="# Hello World..."
                        required
                    />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="mr-2 w-4 h-4 accent-accent"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-secondary select-none cursor-pointer">Published</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
