import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Linkedin, Github, ExternalLink } from 'lucide-react';
import { Button, Input, Textarea, Card } from './ui';

const Contact = ({ settings }: { settings?: any }) => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setSent(true);
                setForm({ name: '', email: '', message: '' });
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            alert('Error sending message.');
        } finally {
            setSending(false);
        }
    };

    const email = settings?.email || 'md.rehan22b@gmail.com';
    const phone = settings?.phone || '+91 9162712267';
    const linkedin = settings?.linkedin || 'https://linkedin.com/in/mdrehan283';
    const github = settings?.github || 'https://github.com/saquib283';

    return (
        <section id="contact" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <h2 className="font-display text-3xl md:text-6xl font-bold text-primary mb-6">
                        Have an idea? Let's <span className="text-accent">build it.</span>
                    </h2>
                    <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        I am currently available for freelance projects and open to full-time opportunities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-primary mb-2">Get in touch</h3>
                            <p className="text-secondary">Fill out the form or reach out directly.</p>
                        </div>

                        <div className="space-y-4">
                            {/* Email Card */}
                            <motion.a
                                href={`mailto:${email}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-surface/50 border border-border/50 hover:border-accent/50 hover:bg-surface transition-all group backdrop-blur-sm"
                            >
                                <div className="p-3 bg-accent/10 text-accent rounded-xl group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary font-medium uppercase tracking-wider">Email</p>
                                    <p className="text-lg text-primary font-medium group-hover:text-accent transition-colors">{email}</p>
                                </div>
                            </motion.a>

                            {/* Phone Card */}
                            <motion.a
                                href={`tel:${phone}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-surface/50 border border-border/50 hover:border-accent/50 hover:bg-surface transition-all group backdrop-blur-sm"
                            >
                                <div className="p-3 bg-accent/10 text-accent rounded-xl group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary font-medium uppercase tracking-wider">Phone</p>
                                    <p className="text-lg text-primary font-medium group-hover:text-accent transition-colors">{phone}</p>
                                </div>
                            </motion.a>
                        </div>

                        {/* Socials */}
                        <div className="pt-6">
                            <p className="text-sm font-medium text-secondary mb-4">Connect on Socials</p>
                            <div className="flex gap-3">
                                <motion.a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="p-4 bg-surface/50 border border-border/50 rounded-xl hover:border-accent/50 text-secondary hover:text-blue-500 transition-all backdrop-blur-sm"
                                >
                                    <Linkedin size={22} />
                                </motion.a>
                                <motion.a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="p-4 bg-surface/50 border border-border/50 rounded-xl hover:border-accent/50 text-secondary hover:text-white transition-all backdrop-blur-sm"
                                >
                                    <Github size={22} />
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="relative p-8 rounded-3xl bg-surface/30 border border-border/50 backdrop-blur-md shadow-2xl">
                            {/* Form Glow */}
                            <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-xl -z-10" />

                            {sent ? (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                                    <p className="text-secondary mb-8">Thank you for reaching out. I'll get back to you shortly.</p>
                                    <Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-4">
                                        <div>
                                            <Input
                                                placeholder="Your Name"
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                required
                                                className="bg-background/50 border-border/50 focus:border-accent/50 py-6 text-lg"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="email"
                                                placeholder="Your Email"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                required
                                                className="bg-background/50 border-border/50 focus:border-accent/50 py-6 text-lg"
                                            />
                                        </div>
                                        <div>
                                            <Textarea
                                                placeholder="Tell me about your project..."
                                                rows={5}
                                                value={form.message}
                                                onChange={e => setForm({ ...form, message: e.target.value })}
                                                required
                                                className="bg-background/50 border-border/50 focus:border-accent/50 pt-4 text-lg resize-none"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        loading={sending}
                                        className="w-full py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
                                    >
                                        Send Message <Send size={18} className="ml-2" />
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
