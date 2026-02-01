import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Guestbook from "@/models/Guestbook";
import connectToDatabase from "@/lib/db";
import { Card } from "@/components/ui";
import { Layers, Briefcase, Activity } from 'lucide-react';

async function getStats() {
    await connectToDatabase();
    const projectCount = await Project.countDocuments();
    const experienceCount = await Experience.countDocuments();
    const guestbookCount = await Guestbook.countDocuments();
    return { projectCount, experienceCount, guestbookCount };
}

import LivePulse from '@/components/admin/LivePulse';
import ActivityHeatmap from '@/components/admin/ActivityHeatmap';

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    const { projectCount, experienceCount, guestbookCount } = await getStats();

    return (
        <div className="space-y-10 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-6xl font-display font-bold text-primary tracking-tighter mb-3">
                        Mission <span className="text-secondary/40 italic font-medium">Control</span>
                    </h1>
                    <p className="text-lg text-secondary">Welcome back commander, <span className="text-primary font-bold">{session?.user?.name || 'Admin'}</span>.</p>
                </div>
                <div className="flex gap-4 text-[10px] font-mono font-bold">
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full bg-surface/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-primary tracking-widest uppercase">Kernel Active</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full bg-surface/50 uppercase tracking-widest text-secondary/60">
                        {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Analytics */}
                <div className="lg:col-span-2 space-y-8">
                    <LivePulse />
                    <ActivityHeatmap />
                </div>

                {/* Vertical Stat Column */}
                <div className="space-y-6">
                    <Card className="hover:border-accent/40 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <Layers size={120} />
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-black transition-all">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Repository</h3>
                        </div>
                        <p className="text-6xl font-display font-bold text-primary tracking-tighter">{projectCount}</p>
                        <p className="text-[10px] text-secondary/40 uppercase tracking-widest mt-6 font-bold">Total Projects Index</p>
                    </Card>

                    <Card className="hover:border-accent/40 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <Briefcase size={120} />
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-black transition-all">
                                <Briefcase size={20} />
                            </div>
                            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Chronology</h3>
                        </div>
                        <p className="text-6xl font-display font-bold text-primary tracking-tighter">{experienceCount}</p>
                        <p className="text-[10px] text-secondary/40 uppercase tracking-widest mt-6 font-bold">Timeline Milestone Count</p>
                    </Card>

                    <Card className="hover:border-accent/40 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <Activity size={120} />
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-black transition-all">
                                <Activity size={20} />
                            </div>
                            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Interactions</h3>
                        </div>
                        <p className="text-6xl font-display font-bold text-primary tracking-tighter">{guestbookCount}</p>
                        <p className="text-[10px] text-secondary/40 uppercase tracking-widest mt-6 font-bold">Total Guestbook Entries</p>
                    </Card>

                    <Card className="border-accent/20 bg-accent/[0.02] relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                            <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Node Status</h3>
                        </div>
                        <span className="text-xl font-display font-bold text-primary tracking-tight">Synchronized</span>
                        <p className="text-[10px] text-secondary/50 uppercase tracking-widest mt-4 font-medium italic">Operational</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
