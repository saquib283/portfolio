"use client";

import { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    // Disabled smooth scroll animations per user request
    return <>{children}</>;
}
