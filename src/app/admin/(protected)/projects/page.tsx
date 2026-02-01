import Link from 'next/link';
import { Plus, Edit, FolderKanban, ExternalLink } from 'lucide-react';
import Project from '@/models/Project';
import connectToDatabase from '@/lib/db';
import ProjectDeleteButton from '@/components/admin/ProjectDeleteButton';
import { Button, Badge, Card } from '@/components/ui';

export const dynamic = 'force-dynamic';

async function getProjects() {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return projects;
}

export default async function AdminProjects() {
    const projects = await getProjects();

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Projects</h1>
                    <p className="text-secondary text-lg">Manage your showcase and case studies.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="group">
                        <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
                        New Project
                    </Button>
                </Link>
            </header>

            <Card padding="none" className="overflow-hidden bg-surface/30 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surfaceHighlight/50 border-b border-border">
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Project</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Tags</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest text-center">Order</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {projects.map((project: any) => (
                                <tr key={project._id} className="hover:bg-surfaceHighlight/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-surfaceHighlight flex items-center justify-center overflow-hidden border border-border group-hover:border-accent/40 transition-colors">
                                                {project.image ? (
                                                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <FolderKanban size={24} className="text-secondary/40" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-primary font-bold group-hover:text-accent transition-colors">{project.title}</p>
                                                <p className="text-xs text-secondary/50 truncate max-w-[200px]">{project.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex gap-2 flex-wrap">
                                            {project.tags.slice(0, 3).map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="text-[10px] py-0">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="text-[10px] text-secondary/40">+{project.tags.length - 3} more</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className="font-mono text-sm text-secondary">{project.order}</span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-end gap-3 items-center">
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 text-secondary hover:text-accent transition-colors">
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                            <Link href={`/admin/projects/${project._id}`} className="p-2 text-secondary hover:text-primary transition-colors">
                                                <Edit size={18} />
                                            </Link>
                                            <ProjectDeleteButton id={project._id.toString()} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-4 py-8">
                                            <FolderKanban size={48} className="text-secondary/20" />
                                            <p className="text-secondary text-lg italic">No projects found. Launch your first one!</p>
                                            <Link href="/admin/projects/new">
                                                <Button variant="outline" size="sm">Create Project</Button>
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
