"use client";

import useSWR from 'swr';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuestbookSection from '@/components/GuestbookSection';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GuestbookPage() {
    const { data: settings } = useSWR('/api/settings', fetcher);

    if (settings && settings.visibility?.guestbook === false) {
        return (
            <div className="bg-background min-h-screen text-secondary font-sans flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-bold text-primary mb-4 tracking-tighter">Guestbook Unavailable</h1>
                <p className="text-lg text-secondary mb-8">The community section is currently offline.</p>
                <Link href="/" className="px-8 py-4 bg-primary text-background font-bold rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-xl">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen text-secondary font-sans selection:bg-accent selection:text-white flex flex-col">
            <Navbar settings={settings} />

            <main className="flex-grow pt-20">
                <GuestbookSection />
            </main>

            <Footer
                settings={settings?.contact}
                visibility={settings?.visibility}
            />
        </div>
    );
}
