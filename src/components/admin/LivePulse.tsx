"use client";

import { motion } from 'framer-motion';
import { Globe, Zap, Users } from 'lucide-react';

const PULSES = [
    { x: '20%', y: '30%', delay: 0 },
    { x: '45%', y: '25%', delay: 1.2 },
    { x: '70%', y: '40%', delay: 2.5 },
    { x: '35%', y: '60%', delay: 0.8 },
    { x: '15%', y: '75%', delay: 3.1 },
    { x: '85%', y: '20%', delay: 4.2 },
];

export default function LivePulse() {
    return (
        <div className="relative w-full h-[400px] bg-[#0a0a0b] rounded-3xl border border-white/5 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/5 relative z-20 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Global Traffic Pulse</h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/40 uppercase">Active Sessions</span>
                        <span className="text-lg font-mono font-bold text-accent">1,248</span>
                    </div>
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-grow relative overflow-hidden group">
                {/* Visual Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                {/* SVG Map (Simplified World) */}
                <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-1000" viewBox="0 0 800 400">
                    <path fill="currentColor" className="text-white" d="M100,100 Q150,50 200,100 T300,100 T400,150 T500,100 T600,200 T700,100" />
                    <path fill="currentColor" className="text-white" d="M150,250 Q200,300 300,250 T500,300 T700,200" />
                </svg>

                {/* Pulses */}
                {PULSES.map((pulse, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{ left: pulse.x, top: pulse.y }}
                    >
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 4], opacity: [0.8, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: pulse.delay,
                                ease: "easeOut"
                            }}
                            className="w-4 h-4 rounded-full bg-accent/30 border border-accent/50"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]" />
                    </div>
                ))}

                {/* Radar Line */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(var(--accent-rgb),0.1)_90deg,transparent_100deg)] pointer-events-none origin-center"
                />
            </div>

            {/* Footer Stats */}
            <div className="p-4 grid grid-cols-3 gap-4 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg text-secondary">
                        <Users size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/40 uppercase">Unique Visitors</span>
                        <span className="text-xs font-mono font-bold text-white">4.8k</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg text-secondary">
                        <Zap size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/40 uppercase">Uptime</span>
                        <span className="text-xs font-mono font-bold text-white">99.9%</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg text-secondary">
                        <Globe size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/40 uppercase">Avg Response</span>
                        <span className="text-xs font-mono font-bold text-white">42ms</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
