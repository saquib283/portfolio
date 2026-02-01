import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'glass' | 'default';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
    children,
    className = '',
    variant = 'default',
    padding = 'md'
}: CardProps) {
    const paddings = {
        none: "",
        sm: "p-4",
        md: "p-6 md:p-8",
        lg: "p-10"
    };

    const variants = {
        default: "bg-surface border border-border rounded-2xl",
        glass: "glass"
    };

    return (
        <div className={`${variants[variant]} ${paddings[padding]} ${className}`}>
            {children}
        </div>
    );
}
