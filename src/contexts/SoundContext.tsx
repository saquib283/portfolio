"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

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
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    // Initialize AudioContext
    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);
            gain.gain.value = 0.1; // Master volume (10%)

            audioContextRef.current = ctx;
            gainNodeRef.current = gain;
        } else if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    // Initialize on first user interaction
    useEffect(() => {
        const handleInteraction = () => {
            initAudio();
            // We can remove listeners after first successful init/resume
            if (audioContextRef.current && audioContextRef.current.state === 'running') {
                window.removeEventListener('click', handleInteraction);
                window.removeEventListener('keydown', handleInteraction);
                window.removeEventListener('touchstart', handleInteraction);
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [initAudio]);

    const toggleMute = () => {
        setMuted(prev => !prev);
    };

    // --- Sound Synthesis Engines ---

    const playHover = useCallback(() => {
        if (muted) return;
        // Try to resume if suspended (e.g. came back to tab)
        if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume().catch(() => { });
        }

        const ctx = audioContextRef.current;
        const mainGain = gainNodeRef.current;

        if (!ctx || !mainGain) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(mainGain);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            console.error("Audio playback error", e);
        }
    }, [muted]);

    const playClick = useCallback(() => {
        if (muted) return;
        // Ensure context is running
        if (!audioContextRef.current) {
            initAudio();
        } else if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume().catch(() => { });
        }

        const ctx = audioContextRef.current;
        const mainGain = gainNodeRef.current;

        if (!ctx || !mainGain) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(mainGain);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.error("Audio playback error", e);
        }
    }, [muted, initAudio]);

    const playSuccess = useCallback(() => {
        if (muted) return;
        const ctx = audioContextRef.current;
        const mainGain = gainNodeRef.current;

        if (!ctx || !mainGain) return;

        const now = ctx.currentTime;

        // Arpeggio
        [440, 554, 659].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.05, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);

            osc.connect(gain);
            gain.connect(mainGain);

            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.2);
        });
    }, [muted]);

    const playError = useCallback(() => {
        if (muted) return;
        const ctx = audioContextRef.current;
        const mainGain = gainNodeRef.current;

        if (!ctx || !mainGain) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(mainGain);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }, [muted]);

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
