"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Badge } from './ui';
import SkillOrbit from './SkillOrbit';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const About = ({ settings, skills = [] }: { settings?: any, skills?: any[] }) => {
    const title = settings?.title || "More than just code.";
    const description = settings?.description || "I bridge the gap between design and engineering. My approach is user-centric, focusing on creating seamless experiences that look great and perform even better.";

    // Use SWR for real-time updates, falling back to server-side props
    const { data: realtimeSkills } = useSWR('/api/skills', fetcher, {
        fallbackData: skills,
        refreshInterval: 5000
    });

    // Prioritize dynamic skills from DB (via SWR), then settings, then fallback
    const displaySkills = realtimeSkills && realtimeSkills.length > 0
        ? realtimeSkills // Pass full skill objects (including icons)
        : (settings?.skills && settings.skills.length > 0 ? settings.skills : ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion", "UI/UX Design"]);

    return (
        <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-surface overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 item-start mb-16 md:mb-24">
                    {/* Left Column: Intro */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">
                            {title}
                        </h2>
                        <p className="text-secondary text-lg leading-relaxed mb-8">
                            {description}
                        </p>
                    </motion.div>


                </div>

                {/* Skills Visualization */}
                <div className="max-w-6xl mx-auto mt-20">
                    <motion.div
                        className="flex flex-col items-center justify-center gap-6 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Animated decorative lines */}
                        <div className="flex items-center gap-6">
                            <motion.div
                                className="h-[2px] w-20 bg-gradient-to-r from-transparent via-cyan-500/50 to-indigo-500/80"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: 80, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                            <div className="relative">
                                {/* Glowing background */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-full" />

                                {/* Main title */}
                                <motion.span
                                    className="relative text-sm uppercase tracking-[0.35em] font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                >
                                    Tech Stack
                                </motion.span>

                                {/* Animated underline */}
                                <motion.div
                                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 48 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                />
                            </div>
                            <motion.div
                                className="h-[2px] w-20 bg-gradient-to-l from-transparent via-pink-500/50 to-purple-500/80"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: 80, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        </div>

                        {/* Subtitle with gradient */}
                        <motion.p
                            className="text-secondary/60 text-base max-w-lg text-center font-light"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-medium">tools and technologies</span> I use to bring ideas to life
                        </motion.p>
                    </motion.div>
                    <SkillOrbit skills={displaySkills} />
                </div>
            </div>
        </section>
    );
};

export default About;
