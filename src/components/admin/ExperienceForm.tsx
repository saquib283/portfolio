"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ExperienceFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ExperienceForm({ initialData, isEdit }: ExperienceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        company: initialData?.company || '',
        position: initialData?.position || '',
        startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
        endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
        current: initialData?.current || false,
        description: initialData?.description || '',
        technologies: initialData?.technologies?.join(', ') || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            technologies: formData.technologies.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== ''),
            endDate: formData.current ? null : formData.endDate // Clear end date if current
        };

        try {
            const url = isEdit ? `/api/experience/${initialData._id}` : '/api/experience';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save');

            router.push('/admin/experience');
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
                <Link href="/admin/experience" className="flex items-center text-sm text-secondary hover:text-primary transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Experience
                </Link>
            </div>
            <h1 className="text-3xl font-display text-primary mb-8">{isEdit ? 'Edit Experience' : 'New Experience'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Company</label>
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Position</label>
                    <input
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            disabled={formData.current}
                            className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent disabled:opacity-50"
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="current"
                        id="current"
                        checked={formData.current}
                        onChange={handleChange}
                        className="mr-2 w-4 h-4 accent-accent"
                    />
                    <label htmlFor="current" className="text-sm font-medium text-secondary select-none cursor-pointer">I currently work here</label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        rows={4}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Technologies (comma separated)</label>
                    <input
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        className="w-full bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                        placeholder="React, Node.js, AWS"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Experience'}
                </button>
            </form>
        </div>
    );
}
