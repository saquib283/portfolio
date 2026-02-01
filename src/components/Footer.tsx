import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import ProductionPulse from './ProductionPulse';

const Footer = ({ settings, visibility, projectCount = 15 }: { settings?: any, visibility?: any, projectCount?: number }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border py-12 px-6 bg-surface">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-display text-2xl font-bold text-primary mb-2 tracking-tighter">MRS.</h3>
                        <p className="text-sm text-secondary">Crafting state-of-the-art digital experiences with precision and purpose.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">Explore</h4>
                        <div className="space-y-2">
                            {(!visibility || visibility.projects !== false) && (
                                <a href="/#projects" className="block text-sm text-secondary hover:text-accent transition-colors">
                                    Selected Works
                                </a>
                            )}
                            {(!visibility || visibility.about !== false) && (
                                <a href="/#about" className="block text-sm text-secondary hover:text-accent transition-colors">
                                    About & Skills
                                </a>
                            )}
                            {(!visibility || visibility.blog !== false) && (
                                <a href="/blog" className="block text-sm text-secondary hover:text-accent transition-colors">
                                    Digital Garden
                                </a>
                            )}
                            {(!visibility || visibility.guestbook !== false) && (
                                <a href="/guestbook" className="block text-sm text-secondary hover:text-accent transition-colors">
                                    Digital Postcards
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">Connect</h4>
                        <div className="flex flex-col gap-2">
                            {settings?.github && (
                                <a
                                    href={settings.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors"
                                >
                                    <Github size={14} /> GitHub
                                </a>
                            )}
                            {settings?.linkedin && (
                                <a
                                    href={settings.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors"
                                >
                                    <Linkedin size={14} /> LinkedIn
                                </a>
                            )}
                            {settings?.email && (
                                <a
                                    href={`mailto:${settings.email}`}
                                    className="flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors"
                                >
                                    <Mail size={14} /> Email
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-6">
                    <ProductionPulse projectCount={projectCount} />

                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-xs text-secondary mb-1 uppercase tracking-widest font-bold">
                            © {currentYear} MD. REHAN SAQUIB
                        </p>
                        <p className="text-[10px] text-secondary/40 font-mono tracking-tighter">
                            LAST_PULL_SYNCHRONIZED_STABLE
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
