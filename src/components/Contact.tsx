import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Linkedin, Github } from 'lucide-react';
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
        <section id="contact" className="py-24 px-6 bg-surface relative">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
                        Have an idea? Let's <span className="text-accent">build it.</span>
                    </h2>
                    <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto">
                        I am currently available for freelance projects and open to full-time opportunities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-primary">Get in touch</h3>
                        <div className="space-y-4">
                            <a href={`mailto:${email}`} className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group">
                                <div className="p-3 bg-surfaceHighlight rounded-full group-hover:bg-accent group-hover:text-black transition-colors">
                                    <Mail size={20} />
                                </div>
                                <span>{email}</span>
                            </a>
                            <a href={`tel:${phone}`} className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group">
                                <div className="p-3 bg-surfaceHighlight rounded-full group-hover:bg-accent group-hover:text-black transition-colors">
                                    <Phone size={20} />
                                </div>
                                <span>{phone}</span>
                            </a>
                            <div className="flex gap-4 pt-4">
                                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-surfaceHighlight rounded-full hover:bg-accent group-hover:text-black transition-colors text-primary">
                                    <Linkedin size={20} />
                                </a>
                                <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 bg-surfaceHighlight rounded-full hover:bg-accent group-hover:text-black transition-colors text-primary">
                                    <Github size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card padding="lg" className="bg-surfaceHighlight">
                        {sent ? (
                            <div className="text-center py-12 text-accent">
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-secondary">I'll get back to you soon.</p>
                                <Button variant="ghost" onClick={() => setSent(false)} className="mt-4 underline">Send another</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                                <Textarea
                                    placeholder="Tell me about your project..."
                                    rows={4}
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    required
                                />
                                <Button
                                    type="submit"
                                    loading={sending}
                                    className="w-full"
                                >
                                    Send Message <Send size={16} className="ml-2" />
                                </Button>
                            </form>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Contact;
