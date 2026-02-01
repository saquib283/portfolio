"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { Check, Trash2, Clock, Sparkles } from 'lucide-react';

interface Entry {
    _id: string;
    name: string;
    message: string;
    approved: boolean;
    createdAt: string;
}

export default function GuestbookModeration() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await fetch('/api/admin/guestbook');
            const data = await res.json();
            setEntries(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/guestbook/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approved: !currentStatus }),
            });
            if (res.ok) fetchEntries();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteEntry = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch(`/api/admin/guestbook/${id}`, { method: 'DELETE' });
            if (res.ok) fetchEntries();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="p-8 text-center text-secondary">Loading messages...</div>;

    return (
        <div className="space-y-8">
            <header className="flex items-end justify-between">
                <div>
                    <h1 className="text-5xl font-display font-bold text-primary tracking-tighter mb-2">Postcard <span className="text-secondary/40 italic">Moderation</span></h1>
                    <p className="text-lg text-secondary">Manage community messages and testimonials.</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-2xl text-accent border border-accent/20 flex items-center gap-3">
                    <Sparkles size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">{entries.filter(e => !e.approved).length} Pending</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries.map(entry => (
                    <Card key={entry._id} className={`group relative transition-all ${!entry.approved ? 'border-accent/40 bg-accent/[0.02]' : 'hover:border-border/80'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-primary font-bold text-xs">
                                    {entry.name.charAt(0)}
                                </div>
                                <h3 className="text-sm font-bold text-primary">{entry.name}</h3>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-secondary/40 font-mono">
                                <Clock size={10} />
                                {new Date(entry.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <p className="text-secondary text-sm italic mb-8 leading-relaxed">"{entry.message}"</p>

                        <div className="flex items-center gap-2 mt-auto">
                            <button
                                onClick={() => toggleApproval(entry._id, entry.approved)}
                                className={`flex-grow py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${entry.approved
                                        ? 'bg-surface text-secondary hover:bg-surfaceHighlight/50'
                                        : 'bg-accent text-black hover:opacity-90'
                                    }`}
                            >
                                {entry.approved ? 'Unapprove' : 'Approve'}
                                <Check size={14} />
                            </button>
                            <button
                                onClick={() => deleteEntry(entry._id)}
                                className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
