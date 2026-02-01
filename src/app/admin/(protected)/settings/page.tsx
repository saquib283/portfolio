"use client";

import { useState, useEffect } from 'react';
import { Save, Settings, Shield, Layout, Zap, Share2, FileText, Smartphone, CheckCircle2, Upload, Loader2 } from 'lucide-react';
import { Card, Input, Button, Badge } from '@/components/ui';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        hero: { title: '', subtitle: '', ctaText: '' },
        about: { title: '', description: '', skills: '' },
        contact: { email: '', phone: '', linkedin: '', github: '', githubUsername: '', spotifyTrackId: '', twitter: '', resume: '' },
        visibility: {
            hero: true,
            about: true,
            projects: true,
            experience: true,
            blog: true,
            guestbook: true,
            contact: true
        },
        features: {
            aiChat: true,
            audio: true,
            threeDHero: true,
            tiltCards: true,
            viewCounter: true,
            themeToggle: true,
            githubPulse: true,
            spotifyTracker: true
        }
    });

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setFormData({
                        hero: data.hero || { title: '', subtitle: '', ctaText: '' },
                        about: {
                            title: data.about?.title || '',
                            description: data.about?.description || '',
                            skills: data.about?.skills?.join(', ') || ''
                        },
                        contact: {
                            email: data.contact?.email || '',
                            phone: data.contact?.phone || '',
                            linkedin: data.contact?.linkedin || '',
                            github: data.contact?.github || '',
                            githubUsername: data.contact?.githubUsername || '',
                            spotifyTrackId: data.contact?.spotifyTrackId || '',
                            twitter: data.contact?.twitter || '',
                            resume: data.contact?.resume || ''
                        },
                        visibility: data.visibility || {
                            hero: true,
                            about: true,
                            projects: true,
                            experience: true,
                            blog: true,
                            guestbook: true,
                            contact: true
                        },
                        features: data.features || {
                            aiChat: true,
                            audio: true,
                            threeDHero: true,
                            tiltCards: true,
                            viewCounter: data.features?.viewCounter ?? true,
                            themeToggle: data.features?.themeToggle ?? true,
                            githubPulse: data.features?.githubPulse ?? true,
                            spotifyTracker: data.features?.spotifyTracker ?? true
                        }
                    });
                }
                setFetching(false);
            })
            .catch(err => {
                console.error(err);
                setFetching(false);
            });
    }, []);

    const handleChange = (section: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [field]: value
            }
        }));
    };

    const handleToggle = (section: 'visibility' | 'features', field: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: !prev[section][field as keyof typeof prev[typeof section]]
            }
        }));
    };

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Type validation
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png'
        ];

        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload PDF, Word, JPEG, or PNG.');
            return;
        }

        setUploading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (res.ok) {
                handleChange('contact', 'resume', result.url);
            } else {
                alert(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            about: {
                ...formData.about,
                skills: formData.about.skills.split(',').map(s => s.trim()).filter(s => s !== '')
            }
        };

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                // Success feedback
            } else {
                alert('Failed to save settings.');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving settings.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            <p className="text-secondary font-mono animate-pulse">Syncing core configurations...</p>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Control Center</h1>
                    <p className="text-secondary text-lg">Global site configurations and modular toggles.</p>
                </div>
                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    className="group min-w-[160px]"
                >
                    <Save size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                    Deploy Settings
                </Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Forms */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Content Sections */}
                    <Card padding="lg" className="bg-surface/30 backdrop-blur-sm space-y-8">
                        <h2 className="text-2xl font-display font-bold text-primary border-b border-border pb-4 flex items-center gap-3">
                            <Layout className="text-accent" size={24} />
                            Core Content
                        </h2>

                        <div className="space-y-10">
                            {/* Hero */}
                            <div className="space-y-6">
                                <Badge variant="secondary" className="uppercase tracking-widest text-[10px]">Hero Section</Badge>
                                <Input
                                    label="Headline"
                                    value={formData.hero.title}
                                    onChange={(e) => handleChange('hero', 'title', e.target.value)}
                                    placeholder="e.g. Building the future of the web"
                                />
                                <div>
                                    <label className="block text-xs font-bold text-secondary/60 uppercase tracking-widest mb-2 px-1">Sub-headline</label>
                                    <textarea
                                        value={formData.hero.subtitle}
                                        onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                                        className="w-full bg-surfaceHighlight/30 border border-border rounded-xl p-4 text-primary focus:outline-none focus:border-accent transition-all min-h-[100px]"
                                        placeholder="Enter your hero bio text..."
                                    />
                                </div>
                            </div>

                            {/* About */}
                            <div className="space-y-6 pt-6 border-t border-border/50">
                                <Badge variant="secondary" className="uppercase tracking-widest text-[10px]">About Section</Badge>
                                <Input
                                    label="Section Heading"
                                    value={formData.about.title}
                                    onChange={(e) => handleChange('about', 'title', e.target.value)}
                                />
                                <div>
                                    <label className="block text-xs font-bold text-secondary/60 uppercase tracking-widest mb-2 px-1">Detailed Bio</label>
                                    <textarea
                                        value={formData.about.description}
                                        onChange={(e) => handleChange('about', 'description', e.target.value)}
                                        className="w-full bg-surfaceHighlight/30 border border-border rounded-xl p-4 text-primary focus:outline-none focus:border-accent transition-all min-h-[150px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Contact Info */}
                    <Card padding="lg" className="bg-surface/30 backdrop-blur-sm space-y-8">
                        <h2 className="text-2xl font-display font-bold text-primary border-b border-border pb-4 flex items-center gap-3">
                            <Share2 className="text-accent" size={24} />
                            Presence & Socials
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Public Email"
                                value={formData.contact.email}
                                onChange={(e) => handleChange('contact', 'email', e.target.value)}
                                icon={<Shield size={16} />}
                            />
                            <Input
                                label="Phone Number"
                                value={formData.contact.phone}
                                onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                                icon={<Smartphone size={16} />}
                            />
                            <Input
                                label="LinkedIn Profile"
                                value={formData.contact.linkedin}
                                onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
                            />
                            <Input
                                label="GitHub Profile"
                                value={formData.contact.github}
                                onChange={(e) => handleChange('contact', 'github', e.target.value)}
                            />
                            <Input
                                label="GitHub Username (for Pulse Visualization)"
                                value={formData.contact.githubUsername}
                                onChange={(e) => handleChange('contact', 'githubUsername', e.target.value)}
                                placeholder="saquib283"
                            />
                            <Input
                                label="Spotify Track ID (Now Playing Demo)"
                                value={formData.contact.spotifyTrackId}
                                onChange={(e) => handleChange('contact', 'spotifyTrackId', e.target.value)}
                                placeholder="e.g. 4PTG397S67T9nL9S9z9IvT"
                            />
                            <div className="md:col-span-2 flex flex-col sm:flex-row items-end gap-4">
                                <div className="flex-grow w-full">
                                    <Input
                                        label="Resume Artifact (URL or Uploaded Path)"
                                        value={formData.contact.resume}
                                        onChange={(e) => handleChange('contact', 'resume', e.target.value)}
                                        placeholder="/uploads/your-resume.pdf"
                                        icon={<FileText size={16} />}
                                    />
                                </div>
                                <div className="flex-shrink-0 w-full sm:w-auto mb-1">
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        onChange={handleResumeUpload}
                                    />
                                    <label
                                        htmlFor="resume-upload"
                                        className={`cursor-pointer px-6 py-3 rounded-xl border flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${uploading
                                            ? 'bg-surfaceHighlight/50 border-border text-secondary/40'
                                            : 'bg-accent/10 border-accent/20 text-accent hover:bg-accent hover:text-black shadow-lg shadow-accent/5'
                                            }`}
                                    >
                                        {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                                        {uploading ? 'Uploading' : 'Upload Resume'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Toggles */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Section Visibility */}
                    <Card padding="md" className="bg-surface/30 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                            <Layout size={18} className="text-accent" />
                            Site Topology
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(formData.visibility).map(([key, value]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleToggle('visibility', key)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${value
                                        ? 'bg-accent/5 border-accent/20 text-primary'
                                        : 'bg-surfaceHighlight/10 border-border/40 text-secondary/40'
                                        }`}
                                >
                                    <span className="capitalize text-sm font-bold tracking-tight">{key}</span>
                                    {value ? <CheckCircle2 size={16} className="text-accent" /> : <div className="w-4 h-4 rounded-full border-2 border-border/40" />}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Feature Controls */}
                    <Card padding="md" className="bg-surface/30 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                            <Zap size={18} className="text-accent" />
                            System Modules
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(formData.features).map(([key, value]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleToggle('features', key)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${value
                                        ? 'bg-blue-500/5 border-blue-500/20 text-primary'
                                        : 'bg-surfaceHighlight/10 border-border/40 text-secondary/40'
                                        }`}
                                >
                                    <span className="text-sm font-bold tracking-tight">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    {value ? <CheckCircle2 size={16} className="text-blue-500" /> : <div className="w-4 h-4 rounded-full border-2 border-border/40" />}
                                </button>
                            ))}
                        </div>
                    </Card>

                    <div className="p-6 bg-accent/5 border border-accent/10 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <p className="text-xs text-secondary/70 leading-relaxed relative z-10">
                            <strong className="text-primary">Note:</strong> Deploying changes will take immediate effect on the live production environment. Ensure all configurations are validated.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
