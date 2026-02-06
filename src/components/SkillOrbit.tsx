"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Skill {
    name: string;
    icon?: string;
    category?: string;
}

interface SkillOrbitProps {
    skills: (Skill | string)[];
}

export default function SkillOrbit({ skills = [] }: SkillOrbitProps) {
    const normalizedSkills = useMemo(() => skills.map(s => typeof s === "string" ? { name: s } : s), [skills]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const rings = useMemo(() => {
        const total = normalizedSkills.length;
        if (total === 0) return [[], [], []];
        const innerCount = Math.max(4, Math.ceil(total * 0.25));
        const midCount = Math.max(6, Math.ceil(total * 0.4));
        const inner = normalizedSkills.slice(0, innerCount);
        const mid = normalizedSkills.slice(innerCount, innerCount + midCount);
        const outer = normalizedSkills.slice(innerCount + midCount);
        return [inner, mid, outer].filter(r => r.length > 0);
    }, [normalizedSkills]);

    // --- Advanced Features Logic ---

    // 1. Constellation Map
    const getCategory = (name: string) => {
        const n = name.toLowerCase();
        if (["react", "next.js", "typescript", "tailwind", "framer motion", "ui", "ux", "three.js", "html", "css", "javascript"].some(k => n.includes(k))) return "frontend";
        if (["node", "mongodb", "database", "sql", "backend", "api", "graphql", "aws", "docker"].some(k => n.includes(k))) return "backend";
        return "other";
    };

    // 2. Gravity Pulse State
    const [isPulsing, setIsPulsing] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const triggerPulse = () => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
    };

    return (
        <div className="relative w-full aspect-square max-w-[900px] max-h-[900px] mx-auto flex items-center justify-center my-12 select-none group">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px] opacity-50 pointer-events-none" />

            {/* Central Sun */}
            <motion.div
                className="relative z-20 w-20 h-20 md:w-40 md:h-40 rounded-full flex items-center justify-center z-10 group/sun cursor-pointer"
                onClick={triggerPulse}
                whileTap={{ scale: 0.9 }}
            >

                {/* 1. Deep Corona (Large glow) */}
                <div className="absolute inset-0 rounded-full bg-orange-600/30 blur-[40px] animate-pulse-slow" />

                {/* 2. Inner Corona (Intense) */}
                <div className="absolute inset-[-10%] rounded-full bg-gradient-to-tr from-red-600/50 to-yellow-500/50 blur-[20px] animate-[spin_8s_linear_infinite]" />

                {/* 3. The Sun Sphere */}
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5),0_0_20px_rgba(255,140,0,0.8)]">

                    {/* Plasma Texture (Rotating Conic) */}
                    <div className="absolute inset-[-50%] opacity-80 animate-[spin_20s_linear_infinite] mix-blend-overlay">
                        <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,0,0.5)_20deg,transparent_40deg,rgba(255,0,0,0.5)_180deg,transparent_360deg)]" />
                    </div>

                    {/* Convection Cells (Grain) */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-color-burn" />

                    {/* Limb Darkening & Color Base */}
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#fff7ed_0%,_#fcd34d_20%,_#f97316_50%,_#dc2626_90%,_#7f1d1d_100%)]" />
                </div>

                {/* 4. Surface Activity Layer (Subtle boiling effect) */}
                <div className="absolute inset-0 rounded-full mix-blend-soft-light overflow-hidden">
                    <div className="absolute inset-[-100%] bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_10%)] animate-[spin_15s_linear_infinite]" style={{ backgroundSize: '20px 20px' }} />
                </div>

                {/* Text Overlay */}
                <span className="relative z-10 font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-orange-100 opacity-0 group-hover/sun:opacity-100 transition-all duration-500 transform scale-90 group-hover/sun:scale-100 pointer-events-none tracking-[0.2em] text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    Core
                </span>
            </motion.div>

            {/* Orbit Rings */}
            {rings.map((ring, i) => {
                const baseRadius = isMobile ? 45 : 35; // Start wider on mobile
                const step = isMobile ? 22 : 25;
                const radiusPercent = baseRadius + (i * step);
                const duration = 25 + (i * 10) + (i % 2 * 5); // 25s, 40s, 50s
                const reverse = i % 2 !== 0;

                return (
                    <motion.div
                        key={i}
                        className="absolute flex items-center justify-center rounded-full border border-white/5 pointer-events-none"
                        style={{
                            width: `${radiusPercent}%`,
                            height: `${radiusPercent}%`,
                            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)'
                        }}
                        // 3. Warp Entrance
                        initial={{ scale: 3, opacity: 0, rotate: 180 }}
                        animate={{
                            scale: isPulsing ? 1.15 : 1, // 2. Gravity Pulse (Push out)
                            opacity: 1,
                            rotate: 0
                        }}
                        transition={{
                            duration: isPulsing ? 0.4 : 1.5, // Snap fast on pulse, slow on enter
                            delay: i * 0.2, // Stagger entrance
                            ease: isPulsing ? "backOut" : "circOut"
                        }}
                    >
                        {/* Ring Track */}
                        <div className="absolute inset-0 rounded-full border border-dashed border-white/10 opacity-30" />

                        <motion.div
                            className="w-full h-full absolute"
                            animate={{ rotate: reverse ? -360 : 360 }}
                            transition={{
                                duration: duration,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                            // Pause on hover
                            whileHover={{ scale: 1.02 }}
                        >
                            {ring.map((skill, j) => {
                                const angle = (360 / ring.length) * j;
                                const category = getCategory(skill.name);
                                const isRelated = hoveredSkill && getCategory(hoveredSkill) === category;

                                return (
                                    <div
                                        key={j}
                                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-bottom-center pointer-events-auto"
                                        style={{
                                            height: '50%',
                                            transformOrigin: 'bottom center',
                                            transform: `rotate(${angle}deg)`
                                        }}
                                    >
                                        <div className="-mt-3 md:-mt-5">
                                            {/* 1. Constellation Line (To Center) */}
                                            <AnimatePresence>
                                                {isRelated && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: '300px', opacity: 1 }} // Approximate radius
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="absolute bottom-1/2 left-1/2 w-[1px] bg-gradient-to-t from-orange-400 to-transparent origin-bottom -z-10 blur-[1px]"
                                                        style={{ transform: 'translateX(-50%)' }}
                                                    />
                                                )}
                                            </AnimatePresence>

                                            <motion.div
                                                animate={{ rotate: reverse ? 360 : -360 }}
                                                transition={{ duration: duration, ease: "linear", repeat: Infinity }}
                                                className="relative group/node"
                                                onMouseEnter={() => setHoveredSkill(skill.name)}
                                                onMouseLeave={() => setHoveredSkill(null)}
                                            >
                                                <SkillNode skill={skill} isRelated={!!isRelated} />
                                            </motion.div>
                                        </div>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    )
}

function SkillNode({ skill, isRelated }: { skill: Skill, isRelated: boolean }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-center">
            <motion.div
                className={`w-10 h-10 md:w-14 md:h-14 backdrop-blur-md border rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer group-hover/node:z-50
                    ${isRelated ? 'bg-accent/20 border-accent shadow-[0_0_30px_rgba(var(--accent-rgb),0.6)] scale-110' : 'bg-surface/80 border-white/10 hover:border-accent hover:scale-125 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]'}
                `}
            >
                {skill.icon && !imgError ? (
                    <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={28}
                        height={28}
                        className="w-5 h-5 md:w-8 md:h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        unoptimized
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent" />
                )}
            </motion.div>

            {/* Tooltip Name */}
            <div className="absolute top-full mt-2 opacity-0 group-hover/node:opacity-100 transition-opacity px-2 py-1 bg-surface border border-white/10 rounded text-[10px] uppercase tracking-wider text-secondary whitespace-nowrap pointer-events-none z-50">
                {skill.name}
            </div>
        </div>
    )
}
