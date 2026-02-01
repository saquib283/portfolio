"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Alex Rivera",
        role: "CTO @ TechFlow",
        content: "An exceptional developer who doesn't just write code, but builds experiences. The attention to detail is truly world-class.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
        name: "Sarah Chen",
        role: "Founder @ Lumina Design",
        content: "Working with them was a game-changer for our platform. They bridged the gap between complex backend logic and beautiful UI perfectly.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
        name: "James Wilson",
        role: "Product Lead @ Velocity",
        content: "Rarely do you find someone who understands both the business goals and the minute technical details. A true asset to any project.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="inline-block min-w-[400px] p-8 bg-surface border border-border/10 rounded-[2rem] relative">
            <Quote className="absolute top-6 right-8 text-accent/10" size={40} />
            <p className="text-primary text-lg font-medium mb-8 whitespace-normal leading-relaxed italic">
                "{t.content}"
            </p>
            <div className="flex items-center gap-4">
                {!imageError ? (
                    <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-full grayscale hover:grayscale-0 transition-all object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                        {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                )}
                <div>
                    <h4 className="text-primary font-bold">{t.name}</h4>
                    <p className="text-secondary text-xs">{t.role}</p>
                </div>
            </div>
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-32 bg-surface/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tighter mb-4">
                    Social <span className="text-secondary/40">Proof</span>
                </h2>
                <p className="text-secondary max-w-md">Trusted by leaders and creators to deliver high-performance digital solutions.</p>
            </div>

            <div className="flex gap-6 overflow-hidden py-10">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex gap-6 whitespace-nowrap"
                >
                    {[...testimonials, ...testimonials].map((t, idx) => (
                        <TestimonialCard key={idx} t={t} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
