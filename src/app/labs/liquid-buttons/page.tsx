"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const LiquidButton = ({ text = "Liquid Button", className = "", color = "#ef4444" }: { text?: string, className?: string, color?: string }) => {
    return (
        <div className={`relative group inline-block ${className}`}>
            <svg className="absolute hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <button
                className="relative px-12 py-5 bg-black text-white font-bold text-lg rounded-full overflow-hidden transition-transform transform active:scale-95 focus:outline-none border-none outline-none"
                style={{
                    filter: 'url(#goo)',
                }}
            >
                <span className="relative z-10 font-display tracking-widest uppercase">{text}</span>

                {/* Initial Glow */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                {/* Liquid Blob Backgrounds */}
                <div className="absolute top-0 left-0 w-full h-full bg-[var(--btn-color)] opacity-100 transition-opacity duration-300 rounded-full" style={{ '--btn-color': color } as any} />

                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[var(--btn-color)] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                    style={{ '--btn-color': color, filter: 'blur(20px)' } as any} />

                <div className="absolute bottom-[-50%] right-[-50%] w-[100px] h-[100px] bg-white mix-blend-overlay rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700" />
            </button>

            {/* External Glow on Hover */}
            <div className="absolute inset-0 rounded-full bg-[var(--btn-color)] opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 -z-10" style={{ '--btn-color': color } as any} />
        </div>
    );
};

export default function LiquidButtonsPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Back Button */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-20 uppercase tracking-widest text-xs font-bold">
                <ArrowLeft size={16} />
                <span>Return to Base</span>
            </Link>

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1),rgba(0,0,0,1))]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center z-10 w-full max-w-4xl"
            >
                <div className="mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase mb-6 backdrop-blur-md">
                        Experimental UI
                    </span>
                    <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 tracking-tighter mix-blend-screen">
                        LIQUID<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">INTERACTION</span>
                    </h1>
                    <p className="text-white/40 max-w-lg mx-auto text-lg leading-relaxed font-light">
                        SVG-driven organic morphology. Hover to trigger fluid state transitions.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-20 items-center justify-center p-12 relative">
                    {/* Decorative line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex flex-col items-center gap-8">
                        <LiquidButton text="Initialize" color="#ef4444" />
                        <span className="text-[10px] uppercase tracking-widest text-white/20">Gradient Red</span>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <LiquidButton text="Execute" color="#3b82f6" />
                        <span className="text-[10px] uppercase tracking-widest text-white/20">Electric Blue</span>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <LiquidButton text="Confirm" color="#10b981" />
                        <span className="text-[10px] uppercase tracking-widest text-white/20">Neon Green</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
