"use client";

import { motion } from "framer-motion";
import useSWR from "swr";
import { Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { useState, useEffect } from "react";

import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface PricingTier {
    _id: string;
    title: string;
    price: string;
    priceINR?: string;
    description: string;
    features: string[];
    services?: string[];
    deliveryTime?: string;
    revisions?: string;
    isPopular: boolean;
    buttonText: string;
    buttonLink: string;
}

export default function Pricing() {
    const { data: tiers, error } = useSWR<PricingTier[]>('/api/admin/pricing', fetcher);
    const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

    useEffect(() => {
        // Simple region detection via Timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.includes('Asia/Kolkata') || timezone.includes('India')) {
            setCurrency('INR');
        }
    }, []);

    const formatPrice = (price: string, curr: 'USD' | 'INR') => {
        if (!price) return "";
        // If price is strictly numeric (allowing commas/dots), add symbol
        if (/^[\d,.]+$/.test(price.trim())) {
            return curr === 'INR' ? `₹${price}` : `$${price}`;
        }
        return price; // Return as-is for "Contact Us", "Free", etc.
    };

    if (!tiers || tiers.length === 0) return null;

    return (
        <section id="pricing" className="py-24 px-6 bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-5xl font-bold text-primary"
                    >
                        Invest in your <span className="text-accent">Growth</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-secondary text-lg max-w-2xl mx-auto"
                    >
                        Transparent pricing for projects of all sizes. No hidden fees.
                    </motion.p>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="bg-surface border border-border rounded-full p-1 flex items-center relative">
                        <button
                            onClick={() => setCurrency('USD')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all z-10 ${currency === 'USD' ? 'text-white' : 'text-secondary hover:text-primary'}`}
                        >
                            USD ($)
                        </button>
                        <button
                            onClick={() => setCurrency('INR')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all z-10 ${currency === 'INR' ? 'text-white' : 'text-secondary hover:text-primary'}`}
                        >
                            INR (₹)
                        </button>
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-full transition-all duration-300 ${currency === 'USD' ? 'left-1' : 'left-[calc(50%+4px)]'
                                }`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl border flex flex-col h-full 
                                ${tier.isPopular
                                    ? 'bg-surface border-accent shadow-xl md:-mt-8 md:mb-8'
                                    : 'bg-surface border-border/20 hover:border-accent/50 shadow-sm hover:shadow-lg'
                                }
                                transition-all duration-300
                            `}
                        >
                            {tier.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                    <Star size={12} fill="currentColor" /> Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-secondary mb-2">{tier.title}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                                        {formatPrice(
                                            (currency === 'INR' && tier.priceINR) ? tier.priceINR : tier.price,
                                            currency
                                        )}
                                    </span>
                                    {/* Handle "/month" or similar if needed, distinct from price string? For now assume price string includes currency */}
                                </div>
                                <p className="text-secondary/80 mt-4 leading-relaxed text-sm">
                                    {tier.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {/* Services Section */}
                                {tier.services && tier.services.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Includes</p>
                                        <ul className="space-y-3">
                                            {tier.services.map((service, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-primary font-medium">
                                                    <div className="mt-0.5 p-0.5 rounded-full bg-accent text-white">
                                                        <Check size={10} strokeWidth={4} />
                                                    </div>
                                                    <span>{service}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Features Section */}
                                {tier.features && tier.features.length > 0 && (
                                    <div>
                                        {tier.services && tier.services.length > 0 && <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3 mt-4">Features</p>}
                                        <ul className="space-y-3">
                                            {tier.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-primary/80">
                                                    <div className="mt-0.5 p-0.5 rounded-full bg-accent/10 text-accent">
                                                        <Check size={12} strokeWidth={3} />
                                                    </div>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </ul>

                            {(tier.deliveryTime || tier.revisions) && (
                                <div className="flex items-center justify-between text-xs text-secondary mb-6 px-1">
                                    {tier.deliveryTime && (
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-accent">🕒</span>
                                            <span className="font-medium">{tier.deliveryTime} Delivery</span>
                                        </div>
                                    )}
                                    {tier.revisions && (
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-accent">🔄</span>
                                            <span className="font-medium">{tier.revisions} Revisions</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Link
                                href={(tier.buttonLink === "/contact") ? "/#contact" : (tier.buttonLink || "/#contact")}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 group
                                    ${tier.isPopular
                                        ? 'bg-accent text-white shadow-lg hover:shadow-accent/40 hover:scale-[1.02]'
                                        : 'bg-primary text-background hover:bg-primary/90 hover:scale-[1.02]'
                                    }
                                `}
                            >
                                {tier.buttonText}
                                <ArrowRight size={16} className={`transition-transform duration-300 ${tier.isPopular ? 'group-hover:translate-x-1' : ''}`} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
