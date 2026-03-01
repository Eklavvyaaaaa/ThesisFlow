'use client';

import React from 'react';
import {
    BarChart3,
    TrendingUp,
    Zap,
    ArrowUpRight,
    Activity,
    Globe,
    Sparkles,
    Filter,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function InsightsPage() {
    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="font-sans text-[34px] font-black tracking-tight text-primary uppercase leading-none">Market Intelligence</h1>
                <p className="text-[14px] text-primary font-bold">Venture trends and proprietary signals extracted across the universe.</p>
            </div>

            {/* Market Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-page border-2 border-primary p-6 shadow-sm flex flex-col justify-between min-h-[160px] group transition-editorial">
                    <div className="flex items-start justify-between">
                        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.15em] text-primary flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            Velocity Signal
                        </h3>
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200 font-mono text-[11px] font-bold uppercase flex items-center gap-1 rounded-[4px]">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            14%
                        </span>
                    </div>
                    <div className="mt-8">
                        <p className="font-sans text-[36px] font-black text-primary tracking-tighter leading-none">High Growth</p>
                        <p className="text-[13px] text-secondary font-bold mt-3 leading-snug">Early-stage entry points are expanding in AI Infrastructure and Biotech segments.</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-page border-2 border-primary p-6 shadow-sm flex flex-col justify-between min-h-[160px] group transition-editorial">
                    <div className="flex items-start justify-between">
                        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.15em] text-primary flex items-center gap-2">
                            <Activity className="h-4 w-4 text-amber-500" />
                            Signal Density
                        </h3>
                        <span className="text-amber-500 bg-white px-2.5 py-1 border border-amber-200 font-sans text-[10px] font-black uppercase rounded-[4px] flex items-center gap-1">
                            Stable
                        </span>
                    </div>
                    <div className="mt-8">
                        <p className="font-sans text-[36px] font-black text-primary tracking-tighter leading-none">Concentrated</p>
                        <p className="text-[13px] text-secondary font-bold mt-3 leading-snug">Discovery signals are focusing on Series A consolidation within the FinTech sector.</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-page border-2 border-primary p-6 shadow-sm flex flex-col justify-between min-h-[160px] group transition-editorial">
                    <div className="flex items-start justify-between">
                        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.15em] text-primary flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            AI Thesis
                        </h3>
                    </div>
                    <div className="mt-8">
                        <p className="font-sans text-[36px] font-black text-primary tracking-tighter leading-none">Vertical AI</p>
                        <p className="text-[13px] text-primary italic font-bold mt-3 leading-snug">Proprietary model layers are losing ground to specialized application stacks.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
                {/* Sector Activity */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b-2 border-strong pb-4">
                        <h2 className="font-mono text-[11px] uppercase tracking-wide text-primary flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Sector Distribution
                        </h2>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Artificial Intelligence', count: 42, color: 'bg-primary' },
                            { name: 'FinTech', count: 28, color: 'bg-accent' },
                            { name: 'HealthTech', count: 24, color: 'bg-emerald-600' },
                            { name: 'SaaS', count: 18, color: 'bg-amber-600' },
                            { name: 'Cybersecurity', count: 12, color: 'bg-secondary' },
                        ].map((sector) => (
                            <div key={sector.name} className="space-y-2">
                                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide">
                                    <span className="text-primary font-bold">{sector.name}</span>
                                    <span className="text-muted">{sector.count}% Universe</span>
                                </div>
                                <div className="h-2 w-full bg-subtle rounded-sm border border-default overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-sm transition-all duration-1000", sector.color)}
                                        style={{ width: `${sector.count}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fresh Signals */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b-2 border-strong pb-4">
                        <h2 className="font-mono text-[11px] uppercase tracking-wide text-primary flex items-center gap-2">
                            <Zap className="h-4 w-4 text-amber-500" />
                            Proprietary Signals
                        </h2>
                        <Link href="/companies" className="font-mono text-[11px] font-bold text-accent uppercase tracking-wide hover:underline">View Universe</Link>
                    </div>
                    <div className="space-y-3">
                        {[
                            { entity: 'Scale AI', event: 'New Headcount Spike', type: 'Growth', delta: '+12%' },
                            { entity: 'Pinecone', event: 'Technical Debt Reduction', type: 'Health', delta: 'High' },
                            { entity: 'Vercel', event: 'Market Expansion', type: 'Strategy', delta: 'Global' },
                            { entity: 'Mistral', event: 'Talent Acquisition', type: 'Team', delta: 'Ex-Google' },
                        ].map((signal, i) => (
                            <Link href={`/companies/${i + 1}`} key={i} className="bg-card border border-default hover:border-strong p-4 transition-editorial flex items-center justify-between group cursor-pointer block">
                                <div className="flex items-center gap-4">
                                    <div className="h-9 w-9 border border-default bg-subtle group-hover:bg-white flex items-center justify-center font-bold text-[12px] text-primary transition-editorial">
                                        {signal.entity[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-primary">{signal.entity}</span>
                                        <span className="font-mono text-[10px] text-secondary uppercase tracking-wide mt-0.5">{signal.event}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[10px] bg-subtle text-secondary px-2 py-1 border border-default group-hover:bg-white transition-editorial uppercase">
                                        {signal.type}
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
