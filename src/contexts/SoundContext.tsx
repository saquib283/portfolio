"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SoundContextType {
    muted: boolean;
    toggleMute: () => void;
    playHover: () => void;
    playClick: () => void;
    playSuccess: () => void;
    playError: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [muted, setMuted] = useState(false);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [gainNode, setGainNode] = useState<GainNode | null>(null);

    // Initialize AudioContext on first user interaction to bypass autoplay policies
    useEffect(() => {
        const initAudio = () => {
            if (!audioContext) {
                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const gain = ctx.createGain();
                gain.connect(ctx.destination);
                gain.gain.value = 0.1; // Master volume (10%)

                setAudioContext(ctx);
                setGainNode(gain);
            }
        };

        const handleInteraction = () => {
            initAudio();
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [audioContext]);

    const toggleMute = () => {
        setMuted(prev => !prev);
    };

    // --- Sound Synthesis Engines ---

    const playHover = useCallback(() => {
        if (muted || !audioContext || !gainNode) return;

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(gainNode);

        osc.start();
        osc.stop(audioContext.currentTime + 0.05);
    }, [audioContext, gainNode, muted]);

    const playClick = useCallback(() => {
        if (muted || !audioContext || !gainNode) return;

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(200, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(gainNode);

        osc.start();
        osc.stop(audioContext.currentTime + 0.1);
    }, [audioContext, gainNode, muted]);

    const playSuccess = useCallback(() => {
        if (muted || !audioContext || !gainNode) return;

        const now = audioContext.currentTime;

        // Arpeggio
        [440, 554, 659].forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.05, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);

            osc.connect(gain);
            gain.connect(gainNode);

            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.2);
        });
    }, [audioContext, gainNode, muted]);

    const playError = useCallback(() => {
        if (muted || !audioContext || !gainNode) return;

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioContext.currentTime);
        osc.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 0.2);

        gain.gain.setValueAtTime(0.05, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(gainNode);

        osc.start();
        osc.stop(audioContext.currentTime + 0.2);
    }, [audioContext, gainNode, muted]);

    return (
        <SoundContext.Provider value={{ muted, toggleMute, playHover, playClick, playSuccess, playError }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
