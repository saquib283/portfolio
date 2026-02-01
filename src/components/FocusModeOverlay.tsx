"use client";

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FocusModeOverlay({ children, title }: { children: React.ReactNode, title: string }) {
    const [isFocused, setIsFocused] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (isFocused) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isFocused]);

    return (
        <>
            <button
                onClick={() => setIsFocused(true)}
                className="fixed bottom-10 right-10 z-40 p-4 bg-accent text-black rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-2 pr-6"
            >
                <Maximize2 size={20} />
                <span className="text-sm font-bold uppercase tracking-widest overflow-hidden max-w-0 group-hover:max-w-[100px] transition-all">Enter Focus</span>
            </button>

            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background flex flex-col items-center overflow-y-auto pt-24 pb-32 px-6 no-scrollbar"
                    >
                        {/* Progress Bar */}
                        <motion.div
                            className="fixed top-0 left-0 right-0 h-1.5 bg-accent origin-left z-[110]"
                            style={{ scaleX }}
                        />

                        {/* Top Controls */}
                        <div className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-[110] bg-gradient-to-b from-background to-transparent">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 font-bold mb-1">Focus Mode</span>
                                <span className="text-sm font-bold text-primary">{title}</span>
                            </div>
                            <button
                                onClick={() => setIsFocused(false)}
                                className="p-3 bg-surface border border-border rounded-xl text-primary hover:bg-red-500 hover:text-white transition-all shadow-xl"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Immersive Content */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-3xl w-full"
                        >
                            <div className="prose prose-2xl dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-p:text-secondary prose-p:leading-relaxed prose-img:rounded-3xl prose-a:text-accent selection:bg-accent selection:text-white">
                                {children}
                            </div>
                        </motion.div>

                        {/* Bottom Indicator */}
                        <div className="fixed bottom-0 left-0 right-0 p-8 text-center pointer-events-none bg-gradient-to-t from-background to-transparent">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-secondary/20">Scroll to Immersion</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
