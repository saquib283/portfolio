export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Plus, Edit, Briefcase, Calendar } from 'lucide-react';
import Experience from '@/models/Experience';
import connectToDatabase from '@/lib/db';
import ExperienceDeleteButton from '@/components/admin/ExperienceDeleteButton';
import { Button, Badge, Card } from '@/components/ui';

async function getExperience() {
    await connectToDatabase();
    const experience = await Experience.find({}).sort({ startDate: -1 });
    return experience;
}

export default async function AdminExperience() {
    const experience = await getExperience();

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Experience</h1>
                    <p className="text-secondary text-lg">Your professional journey and milestones.</p>
                </div>
                <Link href="/admin/experience/new">
                    <Button className="group">
                        <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
                        Add Entry
                    </Button>
                </Link>
            </header>

            <Card padding="none" className="overflow-hidden bg-surface/30 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surfaceHighlight/50 border-b border-border">
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Company & Position</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Duration</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {experience.map((exp: any) => (
                                <tr key={exp._id} className="hover:bg-surfaceHighlight/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-accent border border-border group-hover:border-accent/40 transition-colors">
                                                <Briefcase size={20} />
                                            </div>
                                            <div>
                                                <p className="text-primary font-bold group-hover:text-accent transition-colors">{exp.company}</p>
                                                <p className="text-xs text-secondary/60">{exp.position}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-secondary font-mono">
                                            <Calendar size={14} className="text-secondary/30" />
                                            <span>
                                                {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                                {' - '}
                                                {exp.current ? (
                                                    <Badge variant="accent" className="bg-accent/10 text-accent border-accent/20 ml-1">Present</Badge>
                                                ) : (
                                                    new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-end gap-3 items-center">
                                            <Link href={`/admin/experience/${exp._id}`} className="p-2 text-secondary hover:text-primary transition-colors">
                                                <Edit size={18} />
                                            </Link>
                                            <ExperienceDeleteButton id={exp._id.toString()} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {experience.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-4 py-8">
                                            <Briefcase size={48} className="text-secondary/20" />
                                            <p className="text-secondary text-lg italic">No experience entries yet. Add your history!</p>
                                            <Link href="/admin/experience/new">
                                                <Button variant="outline" size="sm">Add Experience</Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
