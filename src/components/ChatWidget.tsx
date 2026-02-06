"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
        { role: 'model', text: 'Hi there! I\'m your digital copilot. Ask me anything about my work, stacks, or availability.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.map(m => ({
                        role: m.role === 'user' ? 'user' : 'model',
                        parts: [{ text: m.text }]
                    }))
                })
            });

            const data = await res.json();

            if (data.error) {
                setMessages(prev => [...prev, { role: 'model', text: "Systems offline. Please reload and try again." }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Signal lost. Attempting to reconnect..." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-end items-end p-4 md:p-6">
            <div className="pointer-events-auto">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                            className="mb-4 w-[85vw] max-w-[380px] h-[550px] max-h-[80vh] bg-surface/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-accent/5 to-transparent flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent/10 rounded-xl border border-accent/20">
                                        <Bot size={18} className="text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary text-sm flex items-center gap-2">
                                            AI Assistant
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        </h3>
                                        <div className="text-[10px] text-secondary font-mono uppercase tracking-wider">Online & Ready</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full text-secondary hover:text-primary transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-primary text-background rounded-br-sm'
                                            : 'bg-surfaceHighlight/50 border border-border/50 text-secondary rounded-bl-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-surfaceHighlight/50 border border-border/50 p-4 rounded-2xl rounded-bl-sm">
                                            <div className="flex gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" />
                                                <span className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce delay-100" />
                                                <span className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce delay-200" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-surface/50">
                                <div className="relative group">
                                    <input
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full bg-surfaceHighlight/50 border border-border/50 rounded-2xl pl-4 pr-12 py-3.5 text-sm text-primary placeholder:text-secondary/40 focus:outline-none focus:border-accent/50 focus:bg-surfaceHighlight transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || loading}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent text-background rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:grayscale"
                                    >
                                        <Send size={16} strokeWidth={2.5} />
                                    </button>
                                </div>
                                <div className="text-[10px] text-center text-secondary/30 mt-3 font-mono">
                                    Powered by Enhanced LLM Engine
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-primary text-background rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all hover:scale-110 active:scale-90 pointer-events-auto"
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                    <AnimatePresence mode='wait'>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="relative"
                            >
                                <Sparkles size={24} className="animate-pulse" />
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </div>
    );
}
