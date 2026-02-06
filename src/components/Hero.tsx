import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Magnetic from './ux/Magnetic';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false, loading: () => <div className="absolute inset-0 opacity-0"></div> });

const Hero = ({ settings }: { settings?: any }) => {
    const title = settings?.title || "Designing the Digital Future";
    const subtitle = settings?.subtitle || "I am a Full Stack Developer passionate about crafting intuitive, scalable, and visually stunning web applications.";
    const ctaText = settings?.ctaText || "View Projects";

    return (
        <section id="home" className="min-h-[100vh] flex items-center justify-center relative pt-16">
            <ThreeScene />

            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="mb-6 md:mb-8 relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-surface shadow-2xl">
                        <Image
                            src="/profile.jpeg"
                            alt="Profile"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 96px, 128px"
                        />
                    </div>
                    <span className="inline-block py-1 px-3 rounded-full bg-surface border border-border text-[10px] md:text-xs font-medium tracking-wider text-accent uppercase mb-4">
                        Available for new projects
                    </span>
                    <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-8xl tracking-tighter text-primary mb-4 md:mb-6 leading-[1.1]" dangerouslySetInnerHTML={{ __html: title.split('\n').join('<br/>') }} />
                </motion.div>

                <motion.p
                    className="text-secondary text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-6 md:pt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <Magnetic strength={0.2}>
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3 w-full sm:w-auto bg-primary text-background font-semibold rounded-full hover:bg-primary/90 shadow-sm hover:shadow-md transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
                        >
                            {ctaText}
                        </a>
                    </Magnetic>
                    {settings?.contact?.resume && (
                        <Magnetic strength={0.2}>
                            <a
                                href={settings.contact.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 w-full sm:w-auto bg-surface border border-border text-primary font-medium rounded-full hover:bg-surfaceHighlight transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
                            >
                                <Download size={18} className="text-accent" />
                                Resume
                            </a>
                        </Magnetic>
                    )}
                    <Magnetic strength={0.2}>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3 w-full sm:w-auto border border-border text-primary font-medium rounded-full hover:bg-surfaceHighlight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
                        >
                            Contact Me
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary/50 animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <ArrowDown size={20} />
            </motion.div>
        </section>
    );
};

export default Hero;
