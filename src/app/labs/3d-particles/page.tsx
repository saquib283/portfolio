"use client";

import React, { useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';



// Simpler implementation for stability
function SimpleParticles({ count = 2000 }) {
    const mesh = useRef<THREE.Points>(null!);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        mesh.current.rotation.y += delta * 0.05;
        mesh.current.rotation.x += delta * 0.02;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#60a5fa"
                sizeAttenuation
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Scene() {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 5, 25]} />
            <ambientLight intensity={0.5} />
            <SimpleParticles />
            <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
        </Canvas>
    )
}

export default function ParticlesPage() {
    return (
        <div className="h-screen w-full bg-[#050505] relative overflow-hidden">
            {/* Back Button */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-30 uppercase tracking-widest text-xs font-bold pointer-events-auto">
                <ArrowLeft size={16} />
                <span>Return to Base</span>
            </Link>

            {/* Overlay Text */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <p className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">WebGL Experiments</p>
                    <h1 className="text-6xl md:text-8xl font-display font-black text-white mix-blend-overlay tracking-tighter">
                        PARTICLE<br />FIELD
                    </h1>
                </motion.div>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>

            {/* Instructions */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase tracking-widest">
                Interact • Drag to Rotate
            </div>
        </div>
    );
}
