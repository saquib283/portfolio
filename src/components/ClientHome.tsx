"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects, { ProjectType } from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Preloader from './Preloader';
import SmoothScroll from './SmoothScroll';
import { CommandPalette } from './CommandPalette';
import ChatWidget from './ChatWidget';
import AnalyticsTracker from './AnalyticsTracker';
import TechMarquee from './TechMarquee';
import ExperienceSection from '@/components/ExperienceSection';
import ProcessSection from './ProcessSection';
import LabsSection from './LabsSection';
import TestimonialsSection from './TestimonialsSection';
import NewsletterSection from './NewsletterSection';
import SpotifyTracker from './SpotifyTracker';
import GitHubPulse from './GitHubPulse';

import Terminal from './Terminal';
import { useTerminal } from '@/hooks/useTerminal';

interface ClientHomeProps {
    projects: ProjectType[];
    settings?: any;
    experience?: any[];
    skills: any[];
}

export default function ClientHome({ projects, settings, experience, skills }: ClientHomeProps) {
    const [loading, setLoading] = useState(true);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '`') {
                e.preventDefault();
                setIsTerminalOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <AnimatePresence mode='wait'>
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <div className="bg-background min-h-screen text-secondary font-sans selection:bg-accent selection:text-white">
                    <AnalyticsTracker />
                    <CommandPalette />
                    <SpotifyTracker settings={settings?.contact} featureEnabled={settings?.features?.spotifyTracker} />
                    <Terminal
                        isOpen={isTerminalOpen}
                        onClose={() => setIsTerminalOpen(false)}
                        projects={projects}
                        experience={experience || []}
                    />
                    {(!settings || settings.features?.aiChat !== false) && <ChatWidget />}
                    <Navbar settings={settings} />
                    <SmoothScroll>
                        {(!settings || settings.visibility?.hero !== false) && (
                            <>
                                <Hero settings={settings?.hero} />
                                {(!settings || settings.features?.threeDHero !== false) && <TechMarquee />}
                            </>
                        )}
                        {(!settings || settings.visibility?.projects !== false) && (
                            <>
                                <Projects projects={projects} showViewCounter={settings?.features?.viewCounter !== false} />
                                <LabsSection />
                                <GitHubPulse settings={settings?.contact} featureEnabled={settings?.features?.githubPulse} />
                            </>
                        )}
                        {(!settings || settings.visibility?.experience !== false) && (
                            <ExperienceSection experience={experience || []} />
                        )}
                        <ProcessSection />
                        {(!settings || settings.visibility?.about !== false) && (
                            <>
                                <About settings={settings?.about} skills={skills} />
                                <TestimonialsSection />
                            </>
                        )}
                        <NewsletterSection />

                        {(!settings || settings.visibility?.contact !== false) && (
                            <>
                                <Contact settings={settings?.contact} />
                                <Footer settings={settings?.contact} visibility={settings?.visibility} projectCount={projects.length} />
                            </>
                        )}
                    </SmoothScroll>
                </div>
            )}
        </>
    );
}
