"use client";

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';

export default function SpotifyTracker({ settings, featureEnabled }: { settings?: any, featureEnabled?: boolean }) {
    const [imageError, setImageError] = useState(false);

    if (featureEnabled === false || !settings?.spotifyTrackId) return null;

    // Use specific track ID from settings if available
    const track = {
        title: "Dynamic Feed Active",
        artist: "Connected to Spotify",
        albumArt: `https://scannables.scdn.co/v1/s/${settings.spotifyTrackId}`
    };
    const isPlaying = true;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-4 p-3 bg-surface/40 backdrop-blur-xl border border-border/10 rounded-2xl group cursor-pointer hover:border-accent/40 transition-all"
        >
            <div className="relative">
                {!imageError ? (
                    <img
                        src={track.albumArt}
                        alt={track.title}
                        className="w-12 h-12 rounded-xl object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <Music2 size={24} />
                    </div>
                )}
                {isPlaying && (
                    <div className="absolute -bottom-1 -right-1 flex gap-[2px] items-end h-3 bg-accent p-1 rounded-sm">
                        <motion.div animate={{ height: [2, 8, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[2px] bg-white" />
                        <motion.div animate={{ height: [4, 2, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-white" />
                        <motion.div animate={{ height: [8, 4, 2] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-[2px] bg-white" />
                    </div>
                )}
            </div>

            <div className="max-w-[150px] overflow-hidden">
                <div className="flex items-center gap-1.5 mb-0.5">
                    <Music2 size={12} className="text-accent animate-pulse" />
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Listening Now</span>
                </div>
                <h4 className="text-primary text-xs font-bold truncate group-hover:text-accent transition-colors">{track.title}</h4>
                <p className="text-secondary text-[10px] truncate">{track.artist}</p>
            </div>
        </motion.div>
    );
}
