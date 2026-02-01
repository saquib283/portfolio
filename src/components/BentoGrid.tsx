"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Heart, Eye } from 'lucide-react';
import { ProjectType } from './Projects';
import { useState } from 'react';

function BentoCard({ project, index, showViewCounter, liked, onLike }: {
    project: ProjectType,
    index: number,
    showViewCounter: boolean,
    liked: boolean,
    onLike: (id: string, e: React.MouseEvent) => void
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Determine span based on index for a bento feel
    const isLarge = index === 0 || index === 5;
    const isTall = index === 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative group rounded-3xl overflow-hidden border border-border/10 bg-surfaceHighlight/20 backdrop-blur-sm transition-colors hover:border-accent/40 ${isLarge ? 'md:col-span-2 md:row-span-1' : isTall ? 'md:row-span-2' : ''
                }`}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-4 z-20 flex flex-col justify-between pointer-events-none"
            >
                <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                        {showViewCounter && project.views !== undefined && (
                            <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-white/80 text-[10px] font-bold border border-white/5">
                                <Eye size={12} />
                                <span>{project.views}</span>
                            </div>
                        )}
                        <button
                            onClick={(e) => project._id && onLike(project._id, e)}
                            className={`pointer-events-auto bg-black/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold border border-white/5 transition-all hover:scale-110 ${liked ? 'text-red-500' : 'text-white/80 hover:text-red-400'}`}
                        >
                            <Heart size={12} className={liked ? 'fill-current' : ''} />
                            {project.likes && <span>{project.likes}</span>}
                        </button>
                    </div>
                    <div className="p-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                        <ArrowUpRight size={16} className="text-white" />
                    </div>
                </div>

                <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/60 backdrop-blur-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{project.title}</h3>
                    <p className="text-white/50 text-xs line-clamp-2 max-w-[250px]">{project.description}</p>
                </div>
            </div>

            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </motion.div>

            <a
                href={project._id ? `/projects/${project._id}` : (project.link || '#')}
                className="absolute inset-0 z-30 pointer-events-auto"
            />
        </motion.div>
    );
}

export default function BentoGrid({ projects, showViewCounter, likedProjects, onLike }: {
    projects: ProjectType[],
    showViewCounter: boolean,
    likedProjects: string[],
    onLike: (id: string, e: React.MouseEvent) => void
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {projects.map((project, idx) => (
                <BentoCard
                    key={project._id || idx}
                    project={project}
                    index={idx}
                    showViewCounter={showViewCounter}
                    liked={likedProjects.includes(project._id || '')}
                    onLike={onLike}
                />
            ))}
        </div>
    );
}
