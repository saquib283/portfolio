"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Beaker, ExternalLink, Zap, Sparkles, Layers } from 'lucide-react';
import { Card, Badge } from './ui';

const experiments = [
    {
        title: "Liquid Buttons",
        description: "SVG filter based gooey interaction for high-end navigation.",
        icon: Zap,
        tags: ["SVG", "Framer Motion"],
        link: "/labs/liquid-buttons"
    },
    {
        title: "3D Particle Field",
        description: "Interactive noise-driven particles with depth awareness.",
        icon: Sparkles,
        tags: ["Three.js", "R3F"],
        link: "/labs/3d-particles"
    },
    {
        title: "Glass Morphic UI",
        description: "Advanced backdrop filters and border gradients.",
        icon: Layers,
        tags: ["CSS", "Design"],
        link: "/labs/glass-morphism"
    }
];

export default function LabsSection() {
    return (
        <section id="labs" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-accent/10 rounded-lg text-accent">
                                <Beaker size={20} />
                            </div>
                            <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Research & Development</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tighter">
                            Interactive <span className="text-secondary/40 italic">Labs</span>
                        </h2>
                    </div>
                    <p className="text-secondary text-sm max-w-sm leading-relaxed">
                        A playground for experimental UI patterns, creative coding rituals, and emerging web technologies.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {experiments.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link href={exp.link} className="block h-full cursor-pointer">
                                <Card className="group h-full flex flex-col hover:border-accent/40 transition-all border-border/50 bg-surface/20">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-accent/5 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                                            <exp.icon size={24} />
                                        </div>
                                        <ExternalLink size={18} className="text-secondary/20 group-hover:text-accent transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3">{exp.title}</h3>
                                    <p className="text-secondary text-sm mb-6 flex-grow">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary/5 border-secondary/10">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
