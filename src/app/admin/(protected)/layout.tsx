import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import {
    LayoutDashboard,
    FolderKanban,
    Briefcase,
    Wrench,
    MessageSquare,
    FileText,
    BookOpen,
    BarChart3,
    Settings,
    LogOut,
    ExternalLink
} from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/admin/login');
    }

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
        { label: 'Experience', href: '/admin/experience', icon: Briefcase },
        { label: 'Skills', href: '/admin/skills', icon: Wrench },
        { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
        { label: 'Blog Posts', href: '/admin/posts', icon: FileText },
        { label: 'Guestbook', href: '/admin/guestbook', icon: BookOpen },
        { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { label: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-background text-secondary font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-surface/50 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto flex flex-col">
                <div className="p-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <h2 className="text-2xl font-display font-bold text-primary tracking-tighter group-hover:text-accent transition-colors">Admin.</h2>
                        <ExternalLink size={14} className="text-secondary opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-secondary hover:text-primary hover:bg-surfaceHighlight rounded-xl transition-all group"
                        >
                            <item.icon size={18} className="text-secondary/60 group-hover:text-accent transition-colors" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-border mt-auto bg-surface/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                            {session.user?.email?.[0].toUpperCase()}
                        </div>
                        <div className="text-xs overflow-hidden">
                            <p className="text-primary font-bold truncate">{session.user?.email}</p>
                            <p className="text-secondary/50">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
