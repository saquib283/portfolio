"use client";

import { useState, useCallback } from 'react';

export type TerminalLine = {
    type: 'input' | 'output' | 'error';
    content: string;
};

export function useTerminal(projects: any[] = [], experience: any[] = []) {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'output', content: 'Welcome to MRS-OS v1.0.0' },
        { type: 'output', content: 'Type "help" for a list of available commands.' }
    ]);

    const processCommand = useCallback((cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        setHistory(prev => [...prev, { type: 'input', content: cmd }]);

        switch (trimmedCmd) {
            case 'help':
                setHistory(prev => [...prev, {
                    type: 'output',
                    content: 'Available commands: whoami, projects, experience, clear, exit, help'
                }]);
                break;
            case 'whoami':
                setHistory(prev => [...prev, {
                    type: 'output',
                    content: 'A Full Stack Developer & Creative Technologist focused on building high-end digital experiences.'
                }]);
                break;
            case 'projects':
                if (projects.length === 0) {
                    setHistory(prev => [...prev, { type: 'output', content: 'No projects found.' }]);
                } else {
                    projects.forEach(p => {
                        setHistory(prev => [...prev, { type: 'output', content: `> ${p.title} - ${p.description.substring(0, 50)}...` }]);
                    });
                }
                break;
            case 'experience':
                if (experience.length === 0) {
                    setHistory(prev => [...prev, { type: 'output', content: 'No experience data found.' }]);
                } else {
                    experience.forEach(exp => {
                        setHistory(prev => [...prev, { type: 'output', content: `> ${exp.role} @ ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})` }]);
                    });
                }
                break;
            case 'clear':
                setHistory([]);
                break;
            default:
                if (trimmedCmd !== '') {
                    setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${trimmedCmd}` }]);
                }
                break;
        }
    }, [projects, experience]);

    return { history, processCommand };
}
