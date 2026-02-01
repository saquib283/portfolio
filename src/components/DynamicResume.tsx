"use client";

import { motion } from 'framer-motion';
import { Download, FileText, Printer, Mail, MapPin, Globe, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Button, Card, Badge } from './ui';

export default function DynamicResume({ experience, settings }: { experience: any[], settings?: any }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <section id="resume" className="py-32 px-6 bg-surface/5 print:bg-white print:p-0">
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 print:mb-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tighter mb-4 print:text-3xl">
                            Professional <span className="text-secondary/40 italic">Resume</span>
                        </h2>
                        <p className="text-secondary max-w-md print:hidden">A comprehensive overview of my technical journey and professional achievements.</p>
                    </div>
                    <div className="flex gap-3 print:hidden">
                        <Button variant="secondary" onClick={handlePrint} className="gap-2">
                            <Printer size={18} /> Print
                        </Button>
                        {settings?.contact?.resume && (
                            <a href={settings.contact.resume} download className="contents">
                                <Button className="gap-2">
                                    <Download size={18} /> PDF
                                </Button>
                            </a>
                        )}
                    </div>
                </header>

                <Card className="p-8 md:p-12 border-border/10 bg-surface/20 print:border-none print:shadow-none print:bg-transparent print:p-0">
                    {/* Resume Header */}
                    <div className="border-b border-border/10 pb-10 mb-10 flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-primary mb-2 print:text-2xl">{settings?.hero?.title?.split('\n')[0] || "Your Name"}</h1>
                            <p className="text-accent font-medium mb-6 print:text-sm">Full Stack Developer & Creative Technologist</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-secondary">
                                <span className="flex items-center gap-2"><Mail size={14} className="text-accent" /> {settings?.contact?.email || "hello@example.com"}</span>
                                <span className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> San Francisco, CA</span>
                                <span className="flex items-center gap-2"><Globe size={14} className="text-accent" /> {settings?.contact?.website || "www.your-portfolio.com"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Left Column: Experience */}
                        <div className="md:col-span-2 space-y-10">
                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-bold text-primary mb-6 uppercase tracking-widest text-[11px] print:text-sm">
                                    <Briefcase size={16} className="text-accent" /> Experience
                                </h3>
                                <div className="space-y-8">
                                    {experience.map((exp, idx) => (
                                        <div key={idx} className="relative pl-6 border-l border-border/10">
                                            <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-primary">{exp.role}</h4>
                                                <span className="text-[10px] text-secondary font-mono">{exp.startDate} - {exp.endDate || 'Present'}</span>
                                            </div>
                                            <p className="text-accent text-xs mb-3">{exp.company}</p>
                                            <p className="text-secondary text-sm leading-relaxed">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-bold text-primary mb-6 uppercase tracking-widest text-[11px] print:text-sm">
                                    <GraduationCap size={16} className="text-accent" /> Education
                                </h3>
                                <div className="space-y-6">
                                    <div className="relative pl-6 border-l border-border/10">
                                        <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-border" />
                                        <h4 className="font-bold text-primary">Computer Science, B.S.</h4>
                                        <p className="text-secondary text-xs">University of Technology • 2020</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Skills & Awards */}
                        <div className="space-y-10">
                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-bold text-primary mb-6 uppercase tracking-widest text-[11px] print:text-sm">
                                    <FileText size={16} className="text-accent" /> Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "Nex.tjs", "TypeScript", "Node.js", "Three.js", "MongoDB", "Tailwind", "Framer Motion", "CI/CD"].map(skill => (
                                        <Badge key={skill} variant="secondary" className="bg-surface border-border/10 text-[10px]">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-bold text-primary mb-6 uppercase tracking-widest text-[11px] print:text-sm">
                                    <Award size={16} className="text-accent" /> Certifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-3 bg-surface border border-border/50 rounded-xl">
                                        <p className="text-[11px] font-bold text-primary">AWS Certified Cloud Practitioner</p>
                                        <p className="text-[10px] text-secondary">Amazon Web Services • 2023</p>
                                    </div>
                                    <div className="p-3 bg-surface border border-border/50 rounded-xl">
                                        <p className="text-[11px] font-bold text-primary">Meta Frontend Engineer</p>
                                        <p className="text-[10px] text-secondary">Coursera • 2022</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
