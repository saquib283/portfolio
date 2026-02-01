"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Eye } from 'lucide-react';
import Link from 'next/link';

export interface ProjectType {
    _id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
    likes?: number;
    views?: number;
}

import BentoGrid from './BentoGrid';

const Projects = ({ projects, showViewCounter = true }: { projects: ProjectType[], showViewCounter?: boolean }) => {
    // Local state for optimistic updates
    const [projectsState, setProjectsState] = useState(projects);
    const [likedProjects, setLikedProjects] = useState<string[]>([]);

    const handleLike = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (likedProjects.includes(id)) return; // Prevent spamming

        // Optimistic update
        setProjectsState(prev => prev.map(p =>
            p._id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
        ));
        setLikedProjects(prev => [...prev, id]);

        try {
            await fetch(`/api/projects/${id}/like`, { method: 'POST' });
        } catch (error) {
            // Revert on error (optional, skipping for simplicity)
        }
    };

    const displayProjects = projectsState.length > 0 ? projectsState : [];

    return (
        <section id="projects" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-5xl font-bold mb-16 text-primary text-center md:text-left tracking-tighter"
                >
                    Selected <span className="text-secondary/40 italic">Works</span>
                </motion.h2>

                <BentoGrid
                    projects={displayProjects}
                    showViewCounter={showViewCounter}
                    likedProjects={likedProjects}
                    onLike={handleLike}
                />
            </div>
        </section>
    );
};

export default Projects;
