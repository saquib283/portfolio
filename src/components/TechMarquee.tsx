"use client";

import { motion } from 'framer-motion';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const TechMarquee = () => {
    const { data: skills, isLoading } = useSWR('/api/skills', fetcher);

    // Default fallback if no skills in DB yet or loading
    const defaultTechs = [
        "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
        "Tailwind CSS", "Three.js", "Framer Motion", "Git", "AWS"
    ];

    const displayTechs = (skills && skills.length > 0) ? skills.map((s: any) => s.name) : defaultTechs;

    return (
        <div className="py-10 bg-background overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex w-full overflow-hidden">
                <motion.div
                    className="flex gap-16 pr-16 whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 30,
                        repeat: Infinity,
                    }}
                >
                    {[...displayTechs, ...displayTechs, ...displayTechs].map((tech, index) => (
                        <span
                            key={index}
                            className="text-4xl font-display font-bold text-white/5 uppercase tracking-tighter hover:text-white/20 transition-colors cursor-default select-none"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechMarquee;
