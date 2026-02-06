"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Activity, Code, Layers, Zap, Hexagon, Hash, TestTube, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [settings, setSettings] = useState<any>(null);
    const [hex, setHex] = useState('#64ffda');
    const [rgb, setRgb] = useState('rgb(100, 255, 218)');

    useEffect(() => {
        fetch('/api/settings').then(res => res.json()).then(setSettings).catch(() => { });
    }, []);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setHex(val);
        if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(val)) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
            if (result) {
                setRgb(`rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`);
            }
        }
    };

    const stats = [
        { label: 'System Status', value: 'Operational', icon: Activity, color: 'text-green-400' },
        { label: 'Lab Experiments', value: '3', icon: TestTube, color: 'text-purple-400' },
        { label: 'Tech Stack', value: 'Next.js 15', icon: Layers, color: 'text-blue-400' },
        { label: 'Latency', value: '24ms', icon: Zap, color: 'text-yellow-400' },
    ];

    const quickLinks = [
        { title: 'Liquid Buttons', href: '/labs/liquid-buttons', icon: Hexagon, desc: 'Physics-based fluid interactions' },
        { title: '3D Particles', href: '/labs/3d-particles', icon: Cpu, desc: 'Interactive three.js particle field' },
        { title: 'Glass Morphism', href: '/labs/glass-morphism', icon: Layers, desc: 'Modern frosted glass UI components' },
        { title: 'Guestbook', href: '/guestbook', icon: Code, desc: 'Sign the digital visitor log' },
    ];

    return (
        <div className="bg-background min-h-screen text-secondary font-sans selection:bg-accent selection:text-white flex flex-col">
            <Navbar settings={settings} />

            <main className="flex-grow py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                            Developer <span className="text-accent">Dashboard</span>
                        </h1>
                        <p className="text-secondary max-w-2xl">
                            A central hub for experimental features, system metrics, and utility tools.
                            Welcome to the engine room.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-accent/30 transition-colors"
                            >
                                <stat.icon className={`mb-3 ${stat.color}`} size={24} />
                                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-xs text-secondary/60 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Quick Links / Labs */}
                        <div className="lg:col-span-2 space-y-8">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <TestTube size={20} className="text-accent" />
                                Laboratories & Shortcuts
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {quickLinks.map((link, i) => (
                                    <Link key={i} href={link.href} className="group">
                                        <div className="bg-surface border border-border rounded-2xl p-6 h-full hover:border-accent/50 transition-all hover:translate-y-[-2px]">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                                                    <link.icon size={20} />
                                                </div>
                                                <div className="text-xs font-mono text-secondary/40">EXP-{i + 1}</div>
                                            </div>
                                            <h4 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{link.title}</h4>
                                            <p className="text-sm text-secondary">{link.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Utilities Widget */}
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <Zap size={20} className="text-accent" />
                                Micro-Tools
                            </h3>
                            <div className="bg-surface border border-border rounded-2xl p-6">
                                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <Hash size={16} className="text-secondary" />
                                    Color Converter
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-secondary block mb-1.5">Hex Code</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={hex}
                                                onChange={handleHexChange}
                                                className="w-full bg-surfaceHighlight border border-border rounded-lg px-3 py-2 text-sm font-mono text-primary focus:border-accent focus:outline-none"
                                            />
                                            <div className="w-10 h-10 rounded-lg border border-border shrink-0 transition-colors" style={{ backgroundColor: rgb }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-secondary block mb-1.5">RGB Value</label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={rgb}
                                            className="w-full bg-surfaceHighlight/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-secondary cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer settings={settings?.contact} visibility={settings?.visibility} />
        </div>
    );
}
