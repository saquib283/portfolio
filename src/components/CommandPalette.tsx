"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
    Home,
    Briefcase,
    User,
    Mail,
    FileText,
    Settings,
    Search,
    Github,
    Terminal
} from "lucide-react";

export function CommandPalette() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4">
            <div className="w-full max-w-[640px] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <Command label="Global Command Menu" className="bg-transparent">
                    <div className="flex items-center border-b border-white/10 px-4">
                        <Search className="w-5 h-5 text-secondary mr-3" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-secondary disabled:cursor-not-allowed disabled:opacity-50 text-white"
                        />
                    </div>
                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-2">
                        <Command.Empty className="py-6 text-center text-sm text-secondary">
                            No results found.
                        </Command.Empty>

                        <Command.Group heading="Navigation" className="text-xs font-medium text-secondary px-2 mb-2 mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/'))}
                                className="flex items-center px-2 py-3 text-sm text-white rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <Home className="mr-3 h-4 w-4 text-secondary" />
                                <span>Home</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/blog'))}
                                className="flex items-center px-2 py-3 text-sm text-white rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <FileText className="mr-3 h-4 w-4 text-secondary" />
                                <span>Blog</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/#projects'))}
                                className="flex items-center px-2 py-3 text-sm text-white rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <Briefcase className="mr-3 h-4 w-4 text-secondary" />
                                <span>Projects</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/#about'))}
                                className="flex items-center px-2 py-3 text-sm text-white rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <User className="mr-3 h-4 w-4 text-secondary" />
                                <span>About</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/#contact'))}
                                className="flex items-center px-2 py-3 text-sm text-white rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <Mail className="mr-3 h-4 w-4 text-secondary" />
                                <span>Contact</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Admin" className="text-xs font-medium text-secondary px-2 mb-2 mt-4">
                            <Command.Item
                                onSelect={() => runCommand(() => window.dispatchEvent(new Event('toggle-game')))}
                                className="flex items-center px-2 py-3 text-sm text-green-500 rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <Terminal className="mr-3 h-4 w-4 text-green-500" />
                                <span>Enter Hacker Mode</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/admin'))}
                                className="flex items-center px-2 py-3 text-sm text-white rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <Settings className="mr-3 h-4 w-4 text-secondary" />
                                <span>Admin Dashboard</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Socials" className="text-xs font-medium text-secondary px-2 mb-2 mt-4">
                            <Command.Item
                                onSelect={() => runCommand(() => window.open('https://github.com/StartDust28', '_blank'))}
                                className="flex items-center px-2 py-3 text-sm text-white rounded cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                            >
                                <Github className="mr-3 h-4 w-4 text-secondary" />
                                <span>GitHub</span>
                            </Command.Item>
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
