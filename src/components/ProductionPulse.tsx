"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Clock, Package } from 'lucide-react';

export default function ProductionPulse({ projectCount }: { projectCount: number }) {
    const [lastCommit, setLastCommit] = useState<string | null>(null);
    const [timeAgo, setTimeAgo] = useState<string>('calculating...');

    useEffect(() => {
        // Mocking GitHub fetch for demonstration, in a real app this would call GitHub API
        const fetchCommit = async () => {
            // Simulate API delay
            await new Promise(r => setTimeout(r, 1000));
            const mockDate = new Date(Date.now() - 1000 * 60 * 45); // 45 mins ago
            setLastCommit(mockDate.toISOString());
        };

        fetchCommit();
    }, []);

    useEffect(() => {
        if (!lastCommit) return;

        const updateTime = () => {
            const now = new Date();
            const commitDate = new Date(lastCommit);
            const diffMs = now.getTime() - commitDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            if (diffMins < 60) {
                setTimeAgo(`${diffMins}m ago`);
            } else {
                const diffHours = Math.floor(diffMins / 60);
                setTimeAgo(`${diffHours}h ago`);
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [lastCommit]);

    return (
        <div className="flex items-center gap-6 px-4 py-2 bg-surface/30 backdrop-blur-md rounded-full border border-border/50 text-[10px] font-mono font-bold uppercase tracking-widest text-secondary/60">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span>Active Production</span>
            </div>

            <div className="hidden md:flex items-center gap-2 border-l border-border/50 pl-6">
                <Package size={12} className="text-accent" />
                <span className="text-primary">{projectCount}</span>
                <span>Shipped</span>
            </div>

            <div className="flex items-center gap-2 border-l border-border/50 pl-6 group">
                <GitBranch size={12} className="text-accent group-hover:rotate-12 transition-transform" />
                <span>Push:</span>
                <span className="text-primary">{timeAgo}</span>
            </div>
        </div>
    );
}
