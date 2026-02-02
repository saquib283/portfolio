"use client";

import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
    {
        title: "Discovery",
        description: "Deep dive into your goals, audience, and problem space to define a clear technical roadmap.",
        icon: Search,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Architecture",
        description: "Mapping out the system design, database schema, and UI structure for high scalability.",
        icon: PenTool,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "Development",
        description: "Clean, performant codebase construction using modern stacks and pixel-perfect UI.",
        icon: Code2,
        color: "text-accent",
        bg: "bg-accent/10"
    },
    {
        title: "Deployment",
        description: "Rigorous testing and CI/CD automation for a seamless transition to the production world.",
        icon: Rocket,
        color: "text-green-500",
        bg: "bg-green-500/10"
    }
];

export default function ProcessSection() {
    return (
        <section id="process" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <header className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tighter">
                        The <span className="text-accent underline decoration-accent/20 underline-offset-8">Blueprint</span>
                    </h2>
                    <p className="text-secondary text-lg max-w-xl">
                        A rigorous process designed to turn complex visions into elegant, functional digital realities.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-[2.5rem] left-[2rem] right-[2rem] h-[1px] bg-border/20 -z-10" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            style={{ zIndex: steps.length - idx }}
                            className="group relative p-8 bg-surface/30 backdrop-blur-sm border border-border/10 rounded-3xl hover:border-accent/30 transition-all duration-500"
                        >
                            <div className={`w-12 h-12 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform`}>
                                <step.icon size={24} />
                            </div>

                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="text-[10px] font-mono text-secondary/40">0{idx + 1}</span>
                                {step.title}
                            </h3>
                            <p className="text-secondary text-sm leading-relaxed mb-6">
                                {step.description}
                            </p>

                            {idx < steps.length - 1 && (
                                <ArrowRight className="hidden md:block absolute -right-6 top-10 text-border/40 group-hover:text-accent/40 transition-colors" size={20} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
