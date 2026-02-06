"use client";

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Plus, Trash2, GripVertical, Wrench, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Input, Button, Badge } from '@/components/ui';
import ImageUploader from '@/components/admin/ImageUploader';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SkillsPage() {
    const { data: skills, error, isLoading } = useSWR('/api/skills', fetcher);
    const [newSkill, setNewSkill] = useState("");
    const [newIcon, setNewIcon] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkill.trim()) {
            alert("Please enter a Skill Name.");
            return;
        }

        setIsSubmitting(true);
        console.log("Submitting Skill:", { name: newSkill, icon: newIcon, editingId }); // DEBUG LOG

        try {
            const url = editingId ? `/api/skills/${editingId}` : '/api/skills';
            const method = editingId ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newSkill, icon: newIcon })
            });

            if (res.ok) {
                setNewSkill("");
                setNewIcon("");
                setEditingId(null);
                mutate('/api/skills');
                alert(editingId ? "Skill updated successfully!" : "Skill created successfully!");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save skill. Check console for details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (skill: any) => {
        setNewSkill(skill.name);
        setNewIcon(skill.icon || "");
        setEditingId(skill._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setNewSkill("");
        setNewIcon("");
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this skill?')) return;
        try {
            await fetch(`/api/skills/${id}`, { method: 'DELETE' });
            mutate('/api/skills');
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div className="text-secondary">Loading skills...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-12">
            <header>
                <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Technical Skills</h1>
                <p className="text-secondary text-lg">Manage the tools and technologies in your stack.</p>
            </header>

            {/* Add Skill Form */}
            <Card padding="md" className="bg-surface/30 backdrop-blur-sm">
                <form onSubmit={handleAdd} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <Input
                            label="Skill Name"
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="e.g. React"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <ImageUploader
                            label="Skill Icon"
                            value={newIcon}
                            onChange={setNewIcon}
                            placeholder="Upload icon or provide external URL"
                        />
                    </div>
                    <div className="flex gap-2">
                        {editingId && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={cancelEdit}
                                disabled={isSubmitting}
                                className="h-[50px] px-4"
                            >
                                <X size={20} />
                            </Button>
                        )}
                        <Button
                            type="submit"
                            disabled={isSubmitting || !newSkill.trim()}
                            loading={isSubmitting}
                            className="h-[50px] px-6"
                        >
                            {editingId ? <Pencil size={20} /> : <Plus size={20} />}
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Skills List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-16 bg-surfaceHighlight/20 rounded-xl animate-pulse" />
                        ))
                    ) : (
                        skills?.map((skill: any) => (
                            <motion.div
                                key={skill._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group"
                            >
                                <div className="flex items-center justify-between p-4 bg-surface/30 border border-border rounded-xl group-hover:border-accent/40 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-accent/40 group-hover:text-accent transition-colors overflow-hidden">
                                            {skill.icon ? (
                                                <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <Wrench size={14} />
                                            )}
                                        </div>
                                        <span className="text-primary font-bold">{skill.name}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleEdit(skill)}
                                            className="p-2 text-secondary/30 hover:text-accent hover:bg-accent/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill._id)}
                                            className="p-2 text-secondary/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
                {!isLoading && skills?.length === 0 && (
                    <div className="col-span-full py-12 text-center text-secondary italic border border-dashed border-border rounded-2xl">
                        No skills mapped yet. Start by adding one above.
                    </div>
                )}
            </div>
        </div>
    );
}
