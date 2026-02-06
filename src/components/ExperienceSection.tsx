"use client";

import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

export interface ExperienceType {
    _id?: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
}

const Experience = ({ experience }: { experience: ExperienceType[] }) => {
    // Sort by date desc (assuming ISO string or comparable)
    const sortedExperience = [...(experience || [])].sort((a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    if (sortedExperience.length === 0) return null;

    return (
        <section id="experience" className="py-24 px-6 bg-background relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-5xl font-bold mb-16 text-primary text-center"
                >
                    Experience <span className="text-accent">Timeline</span>
                </motion.h2>

                <div className="relative border-l border-border ml-3 md:ml-12 pl-6 md:pl-12 space-y-12">
                    {sortedExperience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Dot on line */}
                            <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 bg-background border-2 border-accent rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-accent rounded-full" />
                            </div>

                            <div className="bg-surfaceHighlight border border-border rounded-2xl p-6 hover:bg-surface transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                    <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                        <Briefcase size={18} className="text-accent" />
                                        {job.role}
                                    </h3>
                                    <div className="text-sm font-medium text-secondary bg-surface border border-border px-3 py-1 rounded-full flex items-center gap-2 w-fit">
                                        <Calendar size={14} />
                                        <span>{new Date(job.startDate).getFullYear()} - {job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}</span>
                                    </div>
                                </div>

                                <h4 className="text-lg font-medium text-primary/80 mb-2">{job.company}</h4>
                                <p className="text-secondary leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
