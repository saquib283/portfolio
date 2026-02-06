"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface SkillTreeProps {
    skills: string[];
}

interface Point {
    x: number;
    y: number;
}

export default function SkillTree({ skills }: SkillTreeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [center, setCenter] = useState<Point>({ x: 0, y: 0 });
    const [nodes, setNodes] = useState<{ name: string; x: number; y: number }[]>([]);
    const { theme } = useTheme();

    useEffect(() => {
        if (!containerRef.current) return;

        const updateLayout = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            const centerX = width / 2;
            const centerY = height / 2; // Center position

            setCenter({ x: centerX, y: centerY });

            // Layout configuration
            const radius = Math.min(width, height) * 0.35; // Radius of the skill circle
            const totalSkills = skills.length;
            const angleStep = (2 * Math.PI) / totalSkills;

            const newNodes = skills.map((skill, i) => {
                const angle = i * angleStep - Math.PI / 2; // Start from top
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                return { name: skill, x, y };
            });

            setNodes(newNodes);
        };

        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, [skills]);

    return (
        <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-surfaceHighlight/5 rounded-3xl border border-white/5">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((node, i) => (
                    <motion.path
                        key={`path-${i}`}
                        d={`M ${center.x} ${center.y} Q ${(center.x + node.x) / 2} ${(center.y + node.y) / 2} ${node.x} ${node.y}`}
                        fill="none"
                        stroke={theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
                    />
                ))}
            </svg>

            {/* Central Node */}
            <motion.div
                className="absolute z-20 w-24 h-24 rounded-full bg-surface border border-white/10 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(99,102,241,0.3)]"
                style={{ left: center.x - 48, top: center.y - 48 }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-pulse" />
                <div className="absolute inset-2 rounded-full border border-purple-500/20" />
                {/* Logo/Icon placeholder */}
                <div className="text-3xl font-bold bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                    TS
                </div>
            </motion.div>

            {/* Skill Nodes */}
            {nodes.map((node, i) => (
                <motion.div
                    key={`node-${i}`}
                    className="absolute z-10"
                    style={{ left: node.x, top: node.y }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                    whileHover={{ scale: 1.15, zIndex: 30 }}
                >
                    <div className="relative px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 shadow-lg group cursor-default transition-colors hover:border-indigo-500/30">
                        <span className={`text-sm font-medium whitespace-nowrap ${theme === 'dark' ? 'text-white/90' : 'text-primary/90'}`}>
                            {node.name}
                        </span>
                        {/* Connecting Dot */}
                        <div className={`absolute top-1/2 ${node.x > center.x ? '-left-1' : '-right-1'} -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500/50`} />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
