"use client";

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RandomizedLight, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

function AbstractShape({ position, color }: { position: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={hovered ? 1.2 : 1}
            >
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={hovered ? "#ff3333" : color}
                    metalness={0.8}
                    roughness={0.1}
                    wireframe={true}
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </Float>
    );
}

function Particles({ color }: { color: string }) {
    const ref = useRef<THREE.Points>(null!);

    const { positions, count } = useMemo(() => {
        const count = 1500;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return { positions, count };
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 20;
        ref.current.rotation.y -= delta / 30;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color={color} sizeAttenuation transparent opacity={0.3} />
        </points>
    );
}

export default function Scene() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Theme-based colors
    const shapeColor = isDark ? "#ffffff" : "#1a1a1a";
    const particleColor = isDark ? "#ffffff" : "#666666";
    const accentColor = "#ff3333";

    return (
        <div className="absolute -inset-y-20 inset-x-0 z-20 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={isDark ? 0.4 : 0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={accentColor} />
                <pointLight position={[-10, -10, -10]} intensity={1} color={isDark ? "#3333ff" : "#0066ff"} />

                <Stars
                    radius={100}
                    depth={50}
                    count={isDark ? 5000 : 1000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                <Particles color={particleColor} />

                {/* Floating Shapes positioned to frame the center content without fully obscuring it */}
                <AbstractShape position={[2.5, 1.2, -1]} color={shapeColor} />
                <AbstractShape position={[-2.8, -1.2, -2]} color={shapeColor} />
                <AbstractShape position={[0.8, -1.5, 1]} color={shapeColor} />

                <RandomizedLight
                    amount={8}
                    radius={10}
                    ambient={0.5}
                    intensity={1}
                    position={[5, 5, -10]}
                    bias={0.001}
                />
            </Canvas>
        </div>
    );
}
