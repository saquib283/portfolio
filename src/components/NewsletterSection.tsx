"use client";

import { motion } from 'framer-motion';
import { Send, Leaf } from 'lucide-react';
import { Button, Input } from './ui';

export default function NewsletterSection() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-4xl mx-auto p-12 bg-accent/5 border border-accent/10 rounded-[3rem] relative overflow-hidden text-center">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-8">
                        <Leaf size={14} />
                        Digital Garden
                    </div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold text-primary tracking-tighter mb-6">
                        Stay in the <span className="text-accent underline decoration-accent/20 underline-offset-8">Loop</span>
                    </h2>

                    <p className="text-secondary text-lg max-w-xl mx-auto mb-12">
                        Receive monthly updates on my latest experiments, open-source tools, and deep-dives into creative coding.
                    </p>

                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                        <Input
                            placeholder="your@email.com"
                            className="bg-background/50 border-border/50 text-center sm:text-left"
                        />
                        <Button className="shrink-0 px-8 py-4 gap-2">
                            Join <Send size={18} />
                        </Button>
                    </form>

                    <p className="mt-6 text-xs text-secondary/40 italic">
                        No spam. Just experiments and shared growth.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
