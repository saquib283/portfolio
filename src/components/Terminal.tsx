"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { useTerminal } from '@/hooks/useTerminal';

export default function Terminal({ isOpen, onClose, projects, experience }: {
    isOpen: boolean,
    onClose: () => void,
    projects: any[],
    experience: any[]
}) {
    const [input, setInput] = useState('');
    const { history, processCommand } = useTerminal(projects, experience);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim().toLowerCase() === 'exit') {
            onClose();
            setInput('');
            return;
        }
        processCommand(input);
        setInput('');
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none"
        >
            <div className="w-full max-w-4xl h-[600px] bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col font-mono relative">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20" />

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/5 relative z-30">
                    <div className="flex items-center gap-2">
                        <TerminalIcon size={14} className="text-accent" />
                        <span className="text-[10px] uppercase tracking-widest text-[#888] font-bold">Terminal Mode</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-md text-[#555] hover:text-white transition-colors">
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={scrollRef}
                    className="flex-grow overflow-y-auto p-6 space-y-2 relative z-10 scrollbar-hide bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"
                >
                    {history.map((line, idx) => (
                        <div key={idx} className={`text-sm ${line.type === 'input' ? 'text-primary' :
                                line.type === 'error' ? 'text-red-400' : 'text-accent/80'
                            }`}>
                            {line.type === 'input' && <span className="text-accent mr-3">➜</span>}
                            {line.content}
                        </div>
                    ))}

                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <span className="text-accent text-sm">➜</span>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent border-none outline-none text-primary text-sm w-full p-0 focus:ring-0"
                            autoFocus
                        />
                    </form>
                </div>

                {/* Footer / Info */}
                <div className="px-6 py-3 bg-[#111] border-t border-white/5 text-[10px] text-[#444] flex justify-between relative z-30">
                    <span>STATUS: ONLINE</span>
                    <span>TYPE "EXIT" TO RETURN TO GUI</span>
                </div>
            </div>

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" onClick={onClose} />
        </motion.div>
    );
}
