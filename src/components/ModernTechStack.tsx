"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ModernTechStackProps {
    skills: string[];
}

const TechCard = ({ name }: { name: string }) => {
    return (
        <div className="relative group mx-4 md:mx-6 flex items-center justify-center">
            <div className="relative px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/20 group-hover:scale-105 group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]">
                {/* Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden transition-opacity duration-300">
                    <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine" />
                </div>

                <span className="relative z-10 text-base md:text-lg font-medium text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                    {name}
                </span>
            </div>
        </div>
    );
};

const MarqueeRow = ({ skills, direction = "left", speed = 20 }: { skills: string[], direction?: "left" | "right", speed?: number }) => {
    return (
        <div className="flex overflow-hidden py-4 select-none mask-gradient">
            <motion.div
                className="flex flex-nowrap"
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {/* Duplicate the skills list multiple times to ensure smooth infinite scroll */}
                {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
                    <TechCard key={`${skill}-${idx}`} name={skill} />
                ))}
            </motion.div>
        </div>
    );
};

export default function ModernTechStack({ skills }: ModernTechStackProps) {
    const [row1, setRow1] = useState<string[]>([]);
    const [row2, setRow2] = useState<string[]>([]);

    useEffect(() => {
        if (skills && skills.length > 0) {
            const mid = Math.ceil(skills.length / 2);
            setRow1(skills.slice(0, mid));
            setRow2(skills.slice(mid));
        }
    }, [skills]);

    if (!skills || skills.length === 0) return null;

    return (
        <div className="w-full relative overflow-hidden py-10">
            {/* Fade Edges for smooth disappearance */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-surface to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none" />

            {/* Marquee Rows */}
            <div className="flex flex-col gap-8 md:gap-12 relative z-10">
                <MarqueeRow skills={row1} direction="left" speed={30} />
                <MarqueeRow skills={row2} direction="right" speed={35} />
            </div>

            {/* Background Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
}
