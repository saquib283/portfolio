"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SkillSpotlightProps {
    skills: string[];
}

export default function SkillSpotlight({ skills }: SkillSpotlightProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex flex-wrap gap-4 justify-center max-w-4xl mx-auto"
        >
            {/* Shared Spotlight Overlay */}
            <div
                className="pointer-events-none absolute -inset-px transition opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.1), transparent 40%)`,
                }}
            />

            {skills.map((skill, idx) => (
                <SkillCard key={idx} skill={skill} />
            ))}
        </div>
    );
}

function SkillCard({ skill }: { skill: string }) {
    // Basic category/icon mapping could happen here if we had the icons available
    // For now we stick to a clean textual representation with a nice border glow
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 py-3 cursor-default"
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1), transparent 40%)`,
                }}
            />

            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="relative z-10 text-sm font-medium text-secondary group-hover:text-white transition-colors tracking-wide">
                {skill}
            </span>
        </motion.div>
    );
}
