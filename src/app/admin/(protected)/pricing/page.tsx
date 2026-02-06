"use client";

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Plus, Trash2, Pencil, X, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Input, Button, Badge } from '@/components/ui';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface ListEditorProps {
    label: string;
    items: string[];
    setItems: (items: string[]) => void;
    placeholder?: string;
}

const ListEditor = ({ label, items, setItems, placeholder }: ListEditorProps) => {
    const [newItem, setNewItem] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        setItems([...items, newItem.trim()]);
        setNewItem("");
    };

    const handleRemove = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd(e as any);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-secondary mb-1">{label}</label>
            <div className="flex gap-2 mb-2">
                <input
                    className="flex-1 bg-surface border border-border rounded-lg p-2 text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                />
                <Button type="button" size="sm" onClick={handleAdd} disabled={!newItem.trim()}>
                    <Plus size={18} />
                </Button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex justify-between items-center bg-surface border border-border rounded px-3 py-2 text-sm text-primary"
                        >
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() => handleRemove(i)}
                                className="text-secondary hover:text-red-500 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {items.length === 0 && (
                    <div className="text-secondary text-xs italic p-2 text-center border border-dashed border-border rounded">
                        No items added.
                    </div>
                )}
            </div>
        </div>
    );
};

export default function PricingPage() {
    const { data: tiers, error, isLoading } = useSWR('/api/admin/pricing', fetcher);

    // Form State
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [priceINR, setPriceINR] = useState("");
    const [description, setDescription] = useState("");
    const [features, setFeatures] = useState<string[]>([]);
    const [services, setServices] = useState<string[]>([]);
    const [deliveryTime, setDeliveryTime] = useState("");
    const [revisions, setRevisions] = useState("");
    const [isPopular, setIsPopular] = useState(false);
    const [buttonText, setButtonText] = useState("Get Started");
    const [buttonLink, setButtonLink] = useState("/#contact");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !price.trim()) {
            alert("Title and Price are required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const url = editingId ? `/api/admin/pricing/${editingId}` : '/api/admin/pricing';
            const method = editingId ? 'PUT' : 'POST';

            // Convert features string to array
            // const featureList = features.split('\n').filter(f => f.trim() !== "");
            // const serviceList = services.split('\n').filter(s => s.trim() !== "");

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    price,
                    priceINR,
                    description,
                    features,
                    services,
                    deliveryTime,
                    revisions,
                    isPopular,
                    buttonText,
                    buttonLink
                })
            });

            if (res.ok) {
                resetForm();
                mutate('/api/admin/pricing');
                // alert(editingId ? "Tier updated!" : "Tier created!");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to save.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (tier: any) => {
        setTitle(tier.title);
        setPrice(tier.price);
        setPriceINR(tier.priceINR || "");
        setDescription(tier.description);
        setFeatures(tier.features || []);
        setServices(tier.services || []);
        setDeliveryTime(tier.deliveryTime || "");
        setRevisions(tier.revisions || "");
        setIsPopular(tier.isPopular);
        setButtonText(tier.buttonText);
        setButtonLink(tier.buttonLink);
        setEditingId(tier._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setTitle("");
        setPrice("");
        setPriceINR("");
        setDescription("");
        setFeatures([]);
        setServices([]);
        setDeliveryTime("");
        setRevisions("");
        setIsPopular(false);
        setButtonText("Get Started");
        setButtonLink("/#contact");
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this pricing tier?')) return;
        try {
            await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
            mutate('/api/admin/pricing');
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div className="text-secondary">Loading pricing...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
            <header>
                <h1 className="text-4xl font-display font-bold text-primary tracking-tight mb-2">Pricing Tiers</h1>
                <p className="text-secondary text-lg">Manage your service packages and offers.</p>
            </header>

            {/* Form */}
            <Card padding="md" className="bg-surface/30 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Basic"
                        />
                        <Input
                            label="Price (USD)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="$499"
                        />
                        <Input
                            label="Price (INR)"
                            value={priceINR}
                            onChange={(e) => setPriceINR(e.target.value)}
                            placeholder="₹15,000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Description</label>
                        <textarea
                            className="w-full bg-surface border border-border rounded-lg p-3 text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all h-20 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short description of the package..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ListEditor
                            label="Services"
                            items={services}
                            setItems={setServices}
                            placeholder="Add a service..."
                        />
                        <ListEditor
                            label="Features"
                            items={features}
                            setItems={setFeatures}
                            placeholder="Add a feature..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Delivery Time"
                            value={deliveryTime}
                            onChange={(e) => setDeliveryTime(e.target.value)}
                            placeholder="e.g. 3-5 Days"
                        />
                        <Input
                            label="Revisions"
                            value={revisions}
                            onChange={(e) => setRevisions(e.target.value)}
                            placeholder="e.g. Unlimited"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Button Text"
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                        />
                        <Input
                            label="Button Link"
                            value={buttonLink}
                            onChange={(e) => setButtonLink(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isPopular"
                            checked={isPopular}
                            onChange={(e) => setIsPopular(e.target.checked)}
                            className="w-5 h-5 rounded border-border bg-surface text-accent focus:ring-accent"
                        />
                        <label htmlFor="isPopular" className="text-primary font-medium cursor-pointer">Mark as Popular</label>
                    </div>

                    <div className="flex gap-2 justify-end">
                        {editingId && (
                            <Button type="button" variant="outline" onClick={resetForm}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting} className="min-w-[150px]">
                            {editingId ? "Update Tier" : "Create Tier"}
                        </Button>
                    </div>
                </form>
            </Card>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {tiers?.map((tier: any) => (
                        <motion.div
                            key={tier._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`relative flex flex-col p-6 rounded-2xl border ${tier.isPopular ? 'border-accent bg-accent/5' : 'border-border bg-surface/30'} backdrop-blur-sm group transition-all hover:border-accent/50`}
                        >
                            {tier.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                                    <Star size={10} fill="currentColor" /> Popular
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-primary">{tier.title}</h3>
                                    <p className="text-2xl font-light text-accent mt-1">{tier.price}</p>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(tier)} className="p-2 text-secondary hover:text-accent rounded-lg border border-transparent hover:border-border">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(tier._id)} className="p-2 text-secondary hover:text-red-500 rounded-lg border border-transparent hover:border-border">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-secondary text-sm mb-6 min-h-[40px]">{tier.description}</p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feat: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-primary/80">
                                        <Check size={14} className="text-accent shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="space-y-2 mb-6">
                                {tier.services && tier.services.length > 0 && (
                                    <div className="text-sm">
                                        <span className="font-semibold text-primary">Services:</span>
                                        <ul className="list-disc list-inside text-secondary pl-1">
                                            {tier.services.map((svc: string, i: number) => (
                                                <li key={i}>{svc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {(tier.deliveryTime || tier.revisions) && (
                                    <div className="flex gap-4 text-xs text-secondary border-t border-border/50 pt-2">
                                        {tier.deliveryTime && <span>🕒 {tier.deliveryTime}</span>}
                                        {tier.revisions && <span>🔄 {tier.revisions}</span>}
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-border/50">
                                <div className="w-full py-2 text-center text-xs text-secondary bg-surface rounded border border-border">
                                    {tier.buttonText} → {tier.buttonLink}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {
                !isLoading && tiers?.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-border rounded-3xl text-secondary">
                        No pricing tiers found. Create your first package above.
                    </div>
                )
            }
        </div >
    );
}
