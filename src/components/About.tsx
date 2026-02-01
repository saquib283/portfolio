"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SkillCloud3D from './SkillCloud3D';

const About = ({ settings, experience = [] }: { settings?: any, experience?: any[] }) => {
    const title = settings?.title || "More than just code.";
    const description = settings?.description || "I bridge the gap between design and engineering. My approach is user-centric, focusing on creating seamless experiences that look great and perform even better.";
    const skills = settings?.skills && settings.skills.length > 0
        ? settings.skills
        : ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion", "UI/UX Design"];

    return (
        <section id="about" className="py-24 px-6 bg-surface">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Intro & Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                            {title}
                        </h2>
                        <p className="text-secondary text-lg leading-relaxed mb-8">
                            {description}
                        </p>

                        <div className="bg-surfaceHighlight/50 p-6 rounded-3xl border border-border/50 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                Technical Arsenal
                            </h3>
                            <SkillCloud3D skills={skills} />
                        </div>
                    </motion.div>

                    {/* Right Column: Experience Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="text-accent" />
                            <h3 className="text-2xl font-bold text-primary">Experience</h3>
                        </div>

                        <div className="space-y-8 border-l border-border pl-8 relative">
                            {experience.length > 0 ? experience.map((exp: any, index: number) => (
                                <div key={index} className="relative group">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-surface border-2 border-border group-hover:border-accent group-hover:bg-accent transition-colors" />

                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                            <h4 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{exp.position}</h4>
                                            <span className="font-mono text-xs text-secondary/60">
                                                {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                                {' - '}
                                                {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <div className="text-base text-primary/80 font-medium">{exp.company}</div>
                                        <p className="text-secondary text-sm leading-relaxed max-w-md">
                                            {exp.description}
                                        </p>
                                        {exp.technologies && exp.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {exp.technologies.map((tech: string, i: number) => (
                                                    <span key={i} className="text-[10px] uppercase tracking-wider text-secondary/50 border border-border px-2 py-0.5 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-secondary italic">No experience added yet.</div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
