"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const FloatingSkill = ({
    children,
    x,
    y,
    depth = 1
}: {
    children: React.ReactNode;
    x: string | number;
    y: string | number;
    depth?: number;
}) => {
    return (
        <motion.div
            className="absolute"
            style={{
                left: x,
                top: y,
            }}
            animate={{
                y: [0, -15 * depth, 0],
            }}
            transition={{
                duration: 4 + depth,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
            }}
        >
            <div className="bg-surfaceHighlight/30 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold text-secondary hover:text-white hover:bg-accent/20 hover:border-accent/40 hover:scale-110 transition-all duration-300 cursor-default shadow-lg hover:shadow-accent/20 group">
                <span className="relative z-10">{children}</span>
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </motion.div>
    );
};

export default function SkillOrbit({ skills }: { skills: string[] }) {
    // We are reusing the file 'SkillOrbit' but implementing a 'Parallax Float' design
    // to keep imports clean for now.

    // Generate random-ish but pleasing positions
    // We want to avoid overlaps manually or just use a predefined spread
    const positions = [
        { x: "15%", y: "20%" },
        { x: "75%", y: "15%" },
        { x: "45%", y: "30%" },
        { x: "10%", y: "50%" },
        { x: "85%", y: "45%" },
        { x: "30%", y: "65%" },
        { x: "65%", y: "70%" },
        { x: "50%", y: "50%" }, // Center
        { x: "20%", y: "80%" },
        { x: "80%", y: "80%" },
        { x: "40%", y: "15%" },
        { x: "60%", y: "85%" },
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-surface/5 to-transparent rounded-3xl border border-white/5 group">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

            {/* Render Skills with Parallax-like Float */}
            {skills.slice(0, 12).map((skill, i) => (
                <FloatingSkill
                    key={i}
                    x={positions[i]?.x || `${Math.random() * 80 + 10}%`}
                    y={positions[i]?.y || `${Math.random() * 80 + 10}%`}
                    depth={1 + Math.random()}
                >
                    {skill}
                </FloatingSkill>
            ))}

            {/* Interactive hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                System Active
            </div>
        </div>
    );
}
