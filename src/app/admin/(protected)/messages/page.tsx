export const dynamic = 'force-dynamic';

import connectToDatabase from '@/lib/db';
import Message from '@/models/Message';
import { Card, Badge } from '@/components/ui';
import { Mail, User, Clock, Trash2 } from 'lucide-react';

async function getMessages() {
    await connectToDatabase();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return messages;
}

export default async function MessagesPage() {
    const messages = await getMessages();

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Inbox</h1>
                <p className="text-secondary text-lg">Direct inquiries from your portfolio contact form.</p>
            </header>

            <Card padding="none" className="overflow-hidden bg-surface/30 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surfaceHighlight/50 border-b border-border">
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Sender</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest">Message Body</th>
                                <th className="p-6 text-xs font-bold text-secondary uppercase tracking-widest text-right">Received</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {messages.map((msg: any) => (
                                <tr key={msg._id} className="hover:bg-surfaceHighlight/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-accent border border-border">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-primary font-bold group-hover:text-accent transition-colors">{msg.name}</p>
                                                <a href={`mailto:${msg.email}`} className="text-xs text-secondary/50 hover:text-primary transition-colors flex items-center gap-1 mt-0.5">
                                                    <Mail size={10} />
                                                    {msg.email}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="bg-surfaceHighlight/20 p-4 rounded-xl border border-border/50 max-w-xl">
                                            <p className="text-sm text-secondary leading-relaxed whitespace-pre-wrap italic">
                                                "{msg.message}"
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right whitespace-nowrap">
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="flex items-center gap-2 text-sm text-primary font-mono">
                                                <Clock size={14} className="text-secondary/30" />
                                                <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <span className="text-[10px] text-secondary/40 uppercase tracking-widest font-mono">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {messages.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-4 py-8">
                                            <Mail size={48} className="text-secondary/20" />
                                            <p className="text-secondary text-lg italic">Your inbox is currently empty.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
