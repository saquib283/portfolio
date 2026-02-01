'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button } from '@/components/ui';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid administrative credentials');
                setLoading(false);
                return;
            }

            router.push('/admin');
            router.refresh();
        } catch (error) {
            setError('System error. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="w-full max-w-md p-6 relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-border mb-6 shadow-xl">
                        <ShieldCheck className="text-accent" size={32} />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Access Portal</h1>
                    <p className="text-secondary">Administrative console for portfolio management</p>
                </div>

                <Card padding="lg" className="shadow-2xl bg-surface/40 backdrop-blur-xl">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Employee ID / Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@mrs.dev"
                            required
                        />
                        <Input
                            label="Security Key"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <div className="pt-2">
                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full group"
                            >
                                Authenticate System
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </form>
                </Card>

                <p className="mt-8 text-center text-xs text-secondary/40 font-mono tracking-widest uppercase">
                    Secure Terminal • Restricted Area
                </p>
            </div>
        </div>
    );
}
