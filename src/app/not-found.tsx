"use client";

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="font-display text-9xl font-bold text-white mb-4">404</h1>
                    <div className="h-1 w-24 bg-accent mx-auto mb-8"></div>
                    <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
                    <p className="text-secondary text-lg mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-bold rounded-xl hover:bg-white transition-colors"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-sm text-secondary">
                        Popular pages:{' '}
                        <Link href="/#projects" className="text-accent hover:text-white transition-colors">
                            Work
                        </Link>
                        {' • '}
                        <Link href="/blog" className="text-accent hover:text-white transition-colors">
                            Blog
                        </Link>
                        {' • '}
                        <Link href="/guestbook" className="text-accent hover:text-white transition-colors">
                            Guestbook
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
