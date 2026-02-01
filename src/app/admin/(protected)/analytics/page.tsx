"use client";

import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Eye, TrendingUp, Calendar, ArrowUpRight, Globe } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AnalyticsPage() {
    const { data, error, isLoading } = useSWR('/api/analytics', fetcher);

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            <p className="text-secondary font-mono animate-pulse">Gathering system intelligence...</p>
        </div>
    );

    if (error) return (
        <div className="p-12 text-center text-red-500 bg-red-500/5 rounded-2xl border border-red-500/10">
            <p className="font-bold">Protocol Failure: Unable to synchronize with analytics server.</p>
        </div>
    );

    const { totalViews, chartData, topPages } = data;

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">System Analytics</h1>
                <p className="text-secondary text-lg">Real-time performance metrics and traffic analysis.</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="group hover:border-accent/40 transition-all border-accent/10 bg-accent/5">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                            <Eye size={24} />
                        </div>
                        <span className="text-secondary/60 text-xs font-bold uppercase tracking-widest">Total Impressions</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-5xl font-display font-bold text-primary">{totalViews.toLocaleString()}</div>
                        <Badge variant="accent" className="bg-accent/10 text-accent border-accent/20">All Time</Badge>
                    </div>
                </Card>

                <Card className="group hover:border-green-500/40 transition-all border-green-500/10 bg-green-500/5">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-500/10 rounded-2xl text-green-400 group-hover:scale-110 transition-transform">
                            <TrendingUp size={24} />
                        </div>
                        <span className="text-secondary/60 text-xs font-bold uppercase tracking-widest">Growth Vector</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-5xl font-display font-bold text-primary text-green-400">+12%</div>
                            <p className="text-[10px] text-secondary/40 font-mono mt-1 italic">Relative to previous period</p>
                        </div>
                        <ArrowUpRight size={24} className="text-green-500/40" />
                    </div>
                </Card>

                <Card className="group hover:border-blue-500/40 transition-all border-blue-500/10 bg-blue-500/5">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                            <Activity size={24} />
                        </div>
                        <span className="text-secondary/60 text-xs font-bold uppercase tracking-widest">Active Sessions</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-5xl font-display font-bold text-primary text-blue-400">01</div>
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] text-blue-500/60 font-mono uppercase tracking-widest">Live</span>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <Card padding="lg" className="lg:col-span-2 bg-surface/30 backdrop-blur-sm border-border/50">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-3">
                            <Calendar size={20} className="text-accent" />
                            Engagement Timeline
                        </h3>
                        <Badge variant="secondary" className="font-mono text-[10px]">Last 7 Cycles</Badge>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
                                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    stroke="var(--secondary)"
                                    strokeOpacity={0.2}
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: 'var(--secondary)', opacity: 0.5 }}
                                />
                                <YAxis
                                    stroke="var(--secondary)"
                                    strokeOpacity={0.2}
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                    tick={{ fill: 'var(--secondary)', opacity: 0.5 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                    itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                />
                                <Bar dataKey="views" radius={[6, 6, 0, 0]} fill="url(#barGradient)">
                                    {chartData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Top Pages */}
                <Card padding="lg" className="bg-surface/30 backdrop-blur-sm border-border/50">
                    <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-3">
                        <Globe size={20} className="text-accent" />
                        Routing Hotspots
                    </h3>
                    <div className="space-y-3">
                        {topPages.map((page: any, idx: number) => (
                            <div key={idx} className="group flex justify-between items-center p-4 bg-surfaceHighlight/30 hover:bg-surfaceHighlight/50 border border-border/40 rounded-xl transition-all">
                                <span className="text-secondary/70 font-mono text-xs group-hover:text-primary transition-colors">{page.path}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-bold font-mono tracking-tighter">{page.views}</span>
                                    <span className="text-[10px] text-secondary/30 uppercase tracking-widest font-bold">hits</span>
                                </div>
                            </div>
                        ))}
                        {topPages.length === 0 && (
                            <div className="py-12 text-center text-secondary italic opacity-20">
                                No routing data recorded.
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
