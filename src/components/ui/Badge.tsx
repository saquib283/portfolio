import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'accent' | 'secondary' | 'outline';
    className?: string;
}

export default function Badge({
    children,
    variant = 'secondary',
    className = ''
}: BadgeProps) {
    const variants = {
        accent: "bg-accent/10 text-accent border-accent/20",
        secondary: "bg-surfaceHighlight text-secondary border-border",
        outline: "bg-transparent text-secondary border-border"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
