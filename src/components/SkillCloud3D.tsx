"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

function Word({ children, ...props }: { children: string } & any) {
    const { theme } = useTheme();
    const color = theme === 'dark' ? '#fff' : '#000';
    const fontProps = { font: '/fonts/Inter-Bold.woff', fontSize: 0.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<THREE.Group>(null!);

    useFrame(({ camera }) => {
        // Correcting billboard behavior: make text always face camera
        ref.current.quaternion.copy(camera.quaternion);
    });

    return (
        <group ref={ref} {...props}>
            <Text
                anchorX="center"
                anchorY="middle"
                color={color}
                fillOpacity={0.8}
                fontSize={0.4}
                maxWidth={2}
                textAlign="center"
            >
                {children}
            </Text>
        </group>
    );
}

function Cloud({ count = 4, radius = 5, skills }: { count?: number, radius?: number, skills: string[] }) {
    const words = useMemo(() => {
        const temp = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (skills.length + 1);
        const thetaSpan = (Math.PI * 2) / skills.length;

        for (let i = 0; i < skills.length; i++) {
            // Distribute points somewhat evenly on a sphere
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;

            const pos = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
            temp.push([pos, skills[i]]);
        }
        return temp;
    }, [radius, skills]);

    return (
        <group>
            {words.map(([pos, word], index) => (
                <Word key={index} position={pos}>
                    {word}
                </Word>
            ))}
        </group>
    );
}

export default function SkillCloud3D({ skills }: { skills: string[] }) {
    return (
        <div className="w-full h-[400px] cursor-grab active:cursor-grabbing border border-border/10 rounded-3xl bg-surfaceHighlight/30 overflow-hidden relative">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 35 }}>
                <fog attach="fog" args={['#202025', 0, 80]} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Cloud radius={6} skills={skills} />
                <TrackballControls noPan noZoom rotateSpeed={2} />
            </Canvas>

            {/* Visual Guide Overlay */}
            <div className="absolute bottom-4 right-6 pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-secondary/40 font-bold">Interactive 3D Arsenal</span>
            </div>
        </div>
    );
}
