"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface BioSkillTreeProps {
    skills: (string | { name: string; icon?: string })[];
}

interface HexNode {
    x: number;
    y: number;
    skill: { name: string; icon?: string };
    id: string;
}

export default function BioSkillTree({ skills }: BioSkillTreeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<HexNode[]>([]);
    const [imgError, setImgError] = useState<Record<string, boolean>>({});
    const [containerHeight, setContainerHeight] = useState(650); // Default min height
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [clusterStyle, setClusterStyle] = useState({ width: 0, height: 0 });
    const [renderScale, setRenderScale] = useState(1);
    const { theme } = useTheme();

    const isMobile = dimensions.width < 768;

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!dimensions.width || !skills.length) return;

        const { width, height } = dimensions;
        const isMobile = width < 768;

        // Configuration
        const HEX_SIZE = isMobile ? 50 : 65;
        const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
        const HEX_HEIGHT = 2 * HEX_SIZE;

        // Visual Node Size (includes shadows/padding)
        const NODE_WIDTH = isMobile ? 90 : 130;
        const NODE_HEIGHT = isMobile ? 100 : 150;

        // Spacing with Gaps
        // Tight spacing for a dense honeycomb look
        const xGap = isMobile ? 4 : 4;
        const yGap = isMobile ? 4 : 4;

        // Center of the container
        // const centerX = width / 2;
        // const centerY = Math.max(height / 2, 350);

        // BFS Spiral Generator (Distance Sorted)
        // Ensures the cluster is always perfectly circular
        const getCircularCoords = (count: number) => {
            if (count === 0) return [];

            const center = { q: 0, r: 0 };
            const results = [center];
            const filled = new Set(['0,0']);

            // Initial neighbors
            const getNeighbors = (q: number, r: number) => [
                { q: q + 1, r: r - 1 }, { q: q + 1, r: r },
                { q: q, r: r + 1 }, { q: q - 1, r: r + 1 },
                { q: q - 1, r: r }, { q: q, r: r - 1 }
            ];

            let candidates = getNeighbors(0, 0);

            while (results.length < count) {
                // Sort candidates by distance from center (0,0)
                // Distance in Hex grid? Euclidean distance of the centerpoint is best for visual circularity
                candidates.sort((a, b) => {
                    // Convert hex to pixel offsets for accurate "visual" distance
                    // Just purely geometric approximation:
                    // x ~ q + r/2
                    // y ~ r
                    const getDistSq = (h: { q: number, r: number }) => {
                        const x = h.q + h.r / 2;
                        const y = h.r;
                        return x * x + y * y;
                    };
                    return getDistSq(a) - getDistSq(b);
                });

                // Pick the closest unique candidate
                let next = candidates.shift();
                while (next && filled.has(`${next.q},${next.r}`)) {
                    next = candidates.shift();
                }

                if (next) {
                    results.push(next);
                    filled.add(`${next.q},${next.r}`);

                    // Add new neighbors
                    const neighbors = getNeighbors(next.q, next.r);
                    neighbors.forEach(n => {
                        if (!filled.has(`${n.q},${n.r}`)) {
                            candidates.push(n);
                        }
                    });
                } else {
                    break; // Should not happen
                }
            }
            return results;
        };

        // Spiral Gen
        const spiralMap = getCircularCoords(skills.length);

        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;

        // Pass 1: Generate Raw Coords from Spiral
        const tempNodes = skills.map((skill, i) => {
            const { q, r } = spiralMap[i];

            const w = HEX_WIDTH + xGap;
            const h_step = (HEX_HEIGHT * 0.75) + yGap;

            const x = w * (q + r / 2);
            const y = h_step * r;

            return { x, y, skill: typeof skill === 'string' ? { name: skill } : skill, id: `hex-${i}` };
        });

        // Pass 2: Calculate Visual Bounding Box (Edges)
        // We look at the actual visual extent of the nodes, not just centers.
        let minLeft = Infinity;
        let maxRight = -Infinity;
        let minTop = Infinity;
        let maxBottom = -Infinity;

        tempNodes.forEach(node => {
            minLeft = Math.min(minLeft, node.x - NODE_WIDTH / 2);
            maxRight = Math.max(maxRight, node.x + NODE_WIDTH / 2);
            minTop = Math.min(minTop, node.y - NODE_HEIGHT / 2);
            maxBottom = Math.max(maxBottom, node.y + NODE_HEIGHT / 2);
        });

        // Calculate size and center
        const clusterW = maxRight - minLeft;
        const clusterH = maxBottom - minTop;
        const centerX = (minLeft + maxRight) / 2;
        const centerY = (minTop + maxBottom) / 2;

        setClusterStyle({ width: clusterW, height: clusterH });

        // Calculate Responsive Scale & Container Height
        const padding = isMobile ? 20 : 40;
        const availableWidth = Math.max(0, width - padding);
        const scale = clusterW > availableWidth ? availableWidth / clusterW : 1;
        setRenderScale(scale);

        // Dynamic Height
        const verticalPadding = isMobile ? 60 : 100;
        const finalHeight = (clusterH * scale) + verticalPadding;
        setContainerHeight(finalHeight);

        // Normalize Coordinates: Shift so Bounding Box Center becomes (0,0)
        const finalNodes = tempNodes.map(node => ({
            ...node,
            x: node.x - centerX,
            y: node.y - centerY
        }));

        setNodes(finalNodes);

    }, [skills, dimensions.width]);

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-inner transition-all duration-300 ease-in-out"
            style={{ height: containerHeight }}
        >
            {/* Background Mesh */}
            <div className={`absolute inset-0 opacity-10 pointer-events-none rounded-3xl overflow-hidden ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent' : ''}`} />

            {/* Absolute Centered Cluster Wrapper */}
            <div
                className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out origin-center"
                style={{
                    width: 0,
                    height: 0,
                    transform: `scale(${renderScale})`
                }}
            >
                {nodes.map((node, i) => {
                    const isMobile = dimensions.width < 768;
                    return (
                        <motion.div
                            key={node.id}
                            className="absolute"
                            style={{
                                left: node.x,
                                top: node.y,
                                transform: 'translate(-50%, -50%)',
                                width: isMobile ? 90 : 130,
                                height: isMobile ? 100 : 150,
                                zIndex: 10
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.03,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }}
                            whileHover={{ scale: 1.15, zIndex: 50 }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">

                                {/* SVG Hexagon Background */}
                                <svg
                                    viewBox="0 0 100 100"
                                    className="absolute inset-0 w-full h-full drop-shadow-md"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <path
                                        d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                                        className={`transition-colors duration-300 stroke-1 
                                            ${theme === 'dark'
                                                ? 'fill-neutral-900/90 stroke-neutral-700 group-hover:fill-neutral-800'
                                                : 'fill-white/90 stroke-neutral-200 group-hover:fill-white'} 
                                        `}
                                    />
                                </svg>

                                {/* Content Layer */}
                                <div className="relative z-10 flex flex-col items-center justify-center gap-2 transform transition-transform group-hover:scale-105">
                                    {/* Icon */}
                                    <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full  ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'} p-1.5`}>
                                        {node.skill.icon && !imgError[node.id] ? (
                                            <img
                                                src={node.skill.icon}
                                                alt={node.skill.name}
                                                className="w-full h-full object-contain"
                                                onError={() => setImgError(prev => ({ ...prev, [node.id]: true }))}
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                        )}
                                    </div>

                                    {/* Text */}
                                    <span className={`text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-center max-w-[80%] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                        {node.skill.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}
