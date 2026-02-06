"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SoundToggle() {
    const { muted, toggleMute, playClick } = useSound();

    const handleClick = () => {
        playClick();
        toggleMute();
    };

    return (
        <button
            onClick={handleClick}
            className="p-2 text-secondary hover:text-accent transition-colors rounded-full hover:bg-surface relative group"
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
        >
            <AnimatePresence mode="wait">
                {muted ? (
                    <motion.div
                        key="muted"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <VolumeX size={20} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="unmuted"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <Volume2 size={20} />
                    </motion.div>
                )}
            </AnimatePresence>

            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-surface border border-white/10 text-[10px] text-primary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {muted ? "SFX Off" : "SFX On"}
            </span>
        </button>
    );
}
