"use client";

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export default function GitHubPulse({ settings, featureEnabled }: { settings?: any, featureEnabled?: boolean }) {
    if (featureEnabled === false || !settings?.githubUsername) return null;

    // Mock data for the pulse effect
    const bars = [4, 8, 6, 12, 18, 14, 22, 16, 10, 24, 12, 18, 14, 20, 26, 18, 12, 8, 14, 10];

    return (
        <section className="py-20 bg-surface/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-8 bg-surface/30 backdrop-blur-sm border border-border/10 rounded-[2.5rem]">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Github size={20} />
                            </div>
                            <span className="text-secondary font-mono text-xs uppercase tracking-widest font-bold">Contribution Pulse</span>
                        </div>
                        <h3 className="text-3xl font-display font-bold text-primary mb-4 tracking-tighter">
                            Building in <span className="text-accent">Public</span>
                        </h3>
                        <p className="text-secondary text-sm max-w-sm leading-relaxed">
                            A live visualization of my open-source activity and commit consistency across the GitHub ecosystem.
                        </p>
                    </div>

                    <div className="flex-1 flex items-end gap-1 h-32 w-full max-w-md">
                        {bars.map((height, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${height * 3}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 1, ease: "easeOut" }}
                                className={`flex-1 rounded-full ${idx > 15 ? 'bg-accent/40' : 'bg-accent'} opacity-80`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
