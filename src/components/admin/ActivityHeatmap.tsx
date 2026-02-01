"use client";

import { motion } from 'framer-motion';

export default function ActivityHeatmap() {
    // Generate mock data for a 7x20 grid
    const days = 7;
    const weeks = 24;

    return (
        <div className="bg-surface/50 p-6 rounded-3xl border border-border/50">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 px-1">Engagement Heatmap</h3>
            <div className="flex gap-2 h-[120px]">
                <div className="flex flex-col justify-between py-1 text-[9px] text-secondary font-mono">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sun</span>
                </div>
                <div className="flex-grow flex gap-1.5 overflow-hidden pt-1">
                    {Array.from({ length: weeks }).map((_, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-1.5 flex-grow">
                            {Array.from({ length: days }).map((_, dIdx) => {
                                const level = Math.floor(Math.random() * 5); // 0-4
                                const opacity = level === 0 ? 0.05 : level === 1 ? 0.1 : level === 2 ? 0.3 : level === 3 ? 0.6 : 0.9;
                                return (
                                    <motion.div
                                        key={dIdx}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: (wIdx * 7 + dIdx) * 0.005 }}
                                        className="w-full aspect-square rounded-sm bg-accent"
                                        style={{ opacity }}
                                        whileHover={{ scale: 1.5, zIndex: 10 }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 text-[9px] text-secondary font-mono">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-sm bg-accent opacity-[0.05]" />
                    <div className="w-2 h-2 rounded-sm bg-accent opacity-[0.2]" />
                    <div className="w-2 h-2 rounded-sm bg-accent opacity-[0.5]" />
                    <div className="w-2 h-2 rounded-sm bg-accent opacity-[0.8]" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
