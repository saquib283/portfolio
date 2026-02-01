import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && <label className="block text-xs font-bold text-secondary/60 uppercase tracking-widest mb-2 px-1">{label}</label>}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 group-focus-within:text-accent transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    className={`w-full bg-surface border border-border rounded-xl p-3 text-primary focus:outline-none focus:border-accent transition-all ${icon ? 'pl-11' : ''} ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium mb-1.5 text-secondary">{label}</label>}
            <textarea
                className={`w-full bg-surface border border-border rounded-lg p-3 text-primary focus:outline-none focus:border-accent transition-colors ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
