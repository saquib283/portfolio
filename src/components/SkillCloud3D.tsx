"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

function Word({ children, position, ...props }: { children: string, position: THREE.Vector3 } & any) {
    const { theme } = useTheme();
    const color = theme === 'dark' ? '#fff' : '#000';
    const ref = useRef<THREE.Group>(null!);

    // Random glitch trigger
    const glitchRef = useRef(0);
    const isGlitching = useRef(false);

    useFrame(({ camera, clock }) => {
        // Billboard behavior
        ref.current.quaternion.copy(camera.quaternion);

        // Subtle glitch effect
        if (Math.random() < 0.005) {
            isGlitching.current = true;
            glitchRef.current = clock.elapsedTime;
        }

        if (isGlitching.current) {
            if (clock.elapsedTime - glitchRef.current > 0.2) {
                isGlitching.current = false;
                ref.current.position.copy(position);
            } else {
                ref.current.position.x = position.x + (Math.random() - 0.5) * 0.2;
                ref.current.position.y = position.y + (Math.random() - 0.5) * 0.2;
            }
        }
    });

    return (
        <group ref={ref} position={position} {...props}>
            <Text
                anchorX="center"
                anchorY="middle"
                color={color}
                maxWidth={2}
                textAlign="center"
            >
                {children}
            </Text>
        </group>
    );
}

function Cloud({ count = 4, radius = 5, skills }: { count?: number, radius?: number, skills: string[] }) {
    const groupRef = useRef<THREE.Group>(null!);

    const words = useMemo(() => {
        const temp = [];
        const phiSpan = Math.PI / (skills.length + 1);
        const thetaSpan = (Math.PI * 2) / skills.length;

        for (let i = 0; i < skills.length; i++) {
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;
            const pos = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
            temp.push([pos, skills[i]]);
        }
        return temp;
    }, [radius, skills]);

    useFrame((state, delta) => {
        // Auto-rotation
        groupRef.current.rotation.y += delta * 0.1;
        groupRef.current.rotation.x += delta * 0.05;
    });

    return (
        <group ref={groupRef}>
            {words.map(([pos, word], index) => (
                <Word key={index} position={pos as THREE.Vector3}>
                    {word}
                </Word>
            ))}


        </group>
    );
}

export default function SkillCloud3D({ skills }: { skills: string[] }) {
    return (
        <div className="w-full h-[450px] flex items-center justify-center relative bg-gradient-to-b from-transparent to-surfaceHighlight/5 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 14], fov: 45 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ff3333" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#3333ff" />

                <Cloud radius={5.5} skills={skills} />

                <TrackballControls noPan noZoom rotateSpeed={1.5} />
            </Canvas>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1 opacity-60">
                <div className="w-1 h-8 bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">System Core</span>
            </div>
        </div>
    );
}
