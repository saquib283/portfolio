"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Layout, Layers, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className={`relative p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-colors duration-500 overflow-hidden group ${className}`}
        >
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Specular Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            {/* Shine Effect */}
            <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default function GlassMorphismPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col p-6 relative overflow-hidden font-sans selection:bg-purple-500/30">
            {/* Back Button */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-30 uppercase tracking-widest text-xs font-bold">
                <ArrowLeft size={16} />
                <span>Return to Base</span>
            </Link>

            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] animate-bounce duration-[10s]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto w-full z-10 pt-24 pb-12">
                <div className="text-center mb-24">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase mb-6 backdrop-blur-md">
                        Material Science
                    </span>
                    <h1 className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 tracking-tighter">
                        GLASS<span className="italic font-light text-white/30">MORPHISM</span>
                    </h1>
                    <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed font-light">
                        Advanced backdrop filters, variable transparency, and noise textures creating a tactical, depth-aware user interface.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px] md:h-[600px]">
                    {/* Large Hero Card */}
                    <div className="md:col-span-7 h-full">
                        <GlassCard className="h-full flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <Layers size={24} className="text-white" />
                                </div>
                                <h2 className="text-4xl font-display font-bold mb-4">Depth & hierarchy</h2>
                                <p className="text-white/50 text-lg max-w-md">
                                    Utilizing multiple layers of blur (`backdrop-filter`) creates a sense of depth. Notice the noise texture subtly overlaying the surface to simulate frosted glass.
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mt-12 backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                    <span className="text-xs font-mono text-white/30">TERMINAL_V2</span>
                                </div>
                                <div className="space-y-2 font-mono text-sm">
                                    <div className="text-white/70">
                                        <span className="text-purple-400">const</span> style = <span className="text-yellow-400">{"{"}</span>
                                    </div>
                                    <div className="pl-4 text-white/50">
                                        backdropFilter: <span className="text-green-400">"blur(20px)"</span>,
                                    </div>
                                    <div className="pl-4 text-white/50">
                                        backgroundColor: <span className="text-green-400">"rgba(255,255,255,0.05)"</span>,
                                    </div>
                                    <div className="text-white/70">
                                        <span className="text-yellow-400">{"}"}</span>;
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Column Stack */}
                    <div className="md:col-span-5 flex flex-col gap-6 h-full">
                        {/* Credit Card Simulation */}
                        <GlassCard className="flex-1 !bg-gradient-to-br !from-white/10 !to-white/5" delay={0.2}>
                            <div className="flex justify-between items-start mb-12">
                                <CreditCard size={32} className="text-white/80" />
                                <Shield size={24} className="text-white/30" />
                            </div>
                            <div className="space-y-6">
                                <div className="text-2xl font-mono tracking-widest text-white/90">
                                    **** **** **** 4829
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Card Holder</div>
                                        <div className="font-medium text-white/80">MD. REHAN</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Expires</div>
                                        <div className="font-medium text-white/80">12/28</div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Interactive Toggle */}
                        <GlassCard className="h-40 flex items-center justify-center gap-8" delay={0.4}>
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group/icon">
                                <Layout size={24} className="text-white/40 group-hover/icon:text-white transition-colors" />
                            </div>
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group/icon shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                                <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
