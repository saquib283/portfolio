"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageSquare, Sparkles } from 'lucide-react';

interface Entry {
    _id: string;
    name: string;
    message: string;
    createdAt: string;
}

export default function GuestbookSection() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetch('/api/guestbook')
            .then(res => res.json())
            .then(data => setEntries(data))
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message }),
            });

            if (res.ok) {
                setSubmitted(true);
                setName('');
                setMessage('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="guestbook" className="py-24 px-6 bg-background overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Left Side: Info & Form */}
                    <div className="w-full md:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest">
                                <Sparkles size={12} />
                                <span>Digital Community</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tighter leading-none">
                                Leave a <span className="text-secondary/40 italic font-medium">Postcard</span>
                            </h2>
                            <p className="text-secondary/60 text-sm leading-relaxed">
                                Join the wall of folks who have stopped by. Your message will be visible after a quick review!
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-accent transition-colors">
                                        <User size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        className="w-full bg-surfaceHighlight/30 border border-border/50 rounded-2xl py-3 pl-12 pr-4 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-4 text-secondary/30 group-focus-within:text-accent transition-colors">
                                        <MessageSquare size={16} />
                                    </div>
                                    <textarea
                                        placeholder="Your Message..."
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        required
                                        rows={4}
                                        className="w-full bg-surfaceHighlight/30 border border-border/50 rounded-2xl py-3 pl-12 pr-4 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || submitted}
                                    className="w-full bg-primary text-background font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.98]"
                                >
                                    {submitted ? "Message Sent!" : isSubmitting ? "Sending..." : "Post Message"}
                                    {!submitted && <Send size={16} />}
                                </button>
                                {submitted && (
                                    <p className="text-[10px] text-accent text-center font-bold uppercase tracking-widest mt-2">
                                        Pending Admin Approval
                                    </p>
                                )}
                            </form>
                        </motion.div>
                    </div>

                    {/* Right Side: Floating Postcards */}
                    <div className="w-full md:w-2/3 h-[500px] relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 pointer-events-none" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto h-full pr-4 scrollbar-hide py-4">
                            {entries.length === 0 ? (
                                <div className="col-span-2 flex flex-col items-center justify-center h-full text-secondary/20">
                                    <Sparkles size={48} className="mb-4 opacity-50" />
                                    <p className="font-display text-xl uppercase tracking-widest font-bold">First postcard is yours</p>
                                </div>
                            ) : (
                                entries.map((entry, idx) => (
                                    <motion.div
                                        key={entry._id}
                                        initial={{ opacity: 0, y: 20, rotate: idx % 2 === 0 ? -1 : 1 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -5, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 bg-surfaceHighlight/20 backdrop-blur-sm border border-border/40 rounded-3xl relative overflow-hidden group shadow-xl"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                                            <Sparkles size={40} className="text-accent" />
                                        </div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
                                                {entry.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-primary">{entry.name}</h4>
                                                <p className="text-[10px] text-secondary/40 uppercase font-mono">{new Date(entry.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <p className="text-secondary text-sm leading-relaxed italic">"{entry.message}"</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
