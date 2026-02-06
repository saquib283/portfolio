"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useSound } from '@/contexts/SoundContext';
import SoundToggle from './ui/SoundToggle';

const Navbar = ({ settings }: { settings?: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { playHover, playClick } = useSound();
    const resumeLink = settings?.contact?.resume;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Work', href: '/#projects' },
        { name: 'Services', href: '/#pricing' },
        { name: 'About', href: '/#about' },
        { name: 'Guestbook', href: '/guestbook' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link href="/" className="font-display text-2xl font-bold tracking-tighter text-primary hover:text-accent transition-colors">
                    MRS.
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-10">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => playHover()}
                            className="text-sm font-medium text-secondary hover:text-primary transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                    {resumeLink && (
                        <a
                            href={resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 bg-primary text-background font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 text-sm"
                        >
                            Resume
                        </a>
                    )}
                    {(!settings || settings.features?.themeToggle !== false) && (
                        <button
                            onClick={() => {
                                playClick();
                                toggleTheme();
                            }}
                            className="p-2 text-secondary hover:text-accent transition-colors rounded-full hover:bg-surface"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                    <SoundToggle />
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-primary hover:text-accent transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 lg:hidden"
                    >
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-display font-bold text-secondary hover:text-primary transition-colors tracking-tight"
                            >
                                {link.name}
                            </a>
                        ))}
                        {resumeLink && (
                            <a
                                href={resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-primary text-background font-bold rounded-full text-xl hover:opacity-90 transition-all"
                            >
                                Resume
                            </a>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="px-8 py-3 bg-secondary/10 text-primary font-bold rounded-full text-xl hover:bg-secondary/20 transition-all flex items-center gap-2"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <>
                                    <Sun size={24} /> <span>Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <Moon size={24} /> <span>Dark Mode</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute bottom-10 p-4 text-secondary/50 hover:text-primary transition-colors"
                        >
                            <X size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;
