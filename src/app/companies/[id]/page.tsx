'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Building2,
    Globe,
    MapPin,
    Calendar,
    Users,
    Zap,
    Plus,
    FileText,
    ArrowLeft,
    Check,
    Save,
    ExternalLink,
    Clock,
    Sparkles,
    ShieldCheck,
    Search,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { MOCK_COMPANIES } from '@/lib/data';
import { Company, EnrichmentData } from '@/types';
import { cn } from '@/lib/utils';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/lib/storage';

export default function CompanyProfilePage() {
    const { id } = useParams();
    const router = useRouter();
    const [company, setCompany] = useState<Company | null>(null);
    const [enrichment, setEnrichment] = useState<EnrichmentData | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isEnriching, setIsEnriching] = useState(false);
    const [note, setNote] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const found = MOCK_COMPANIES.find(c => c.id === id);
        if (found) {
            setCompany(found);
            // Load enrichment from storage if exists
            const cached = getFromStorage<EnrichmentData | null>(`${STORAGE_KEYS.CACHED_ENRICHMENT_PREFIX}${id}`, null);
            if (cached) setEnrichment(cached);

            // Load note from storage
            const savedNote = getFromStorage<string>(`${STORAGE_KEYS.NOTES_PREFIX}${id}`, '');
            if (savedNote) setNote(savedNote);

            // Check if saved
            const savedList = getFromStorage<string[]>(STORAGE_KEYS.SAVED_COMPANIES, []) || [];
            setIsSaved(savedList.includes(id as string));
        }
    }, [id]);

    const handleSaveNote = () => {
        setIsSaving(true);
        setTimeout(() => {
            setToStorage(`${STORAGE_KEYS.NOTES_PREFIX}${id}`, note);
            setIsSaving(false);
        }, 600);
    };

    const toggleSaveCompany = () => {
        const savedList = getFromStorage<string[]>(STORAGE_KEYS.SAVED_COMPANIES, []) || [];
        let newList;
        if (isSaved) {
            newList = savedList.filter(companyId => companyId !== id);
        } else {
            newList = [...savedList, id as string];
        }
        setToStorage(STORAGE_KEYS.SAVED_COMPANIES, newList);
        setIsSaved(!isSaved);
    };

    const handleEnrich = async () => {
        if (!company) return;
        setIsEnriching(true);
        try {
            const resp = await fetch('/api/enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    website: company.website,
                    companyName: company.name,
                    companyDescription: company.description
                })
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.error || `Enrichment failed with status ${resp.status}`);
            }

            setEnrichment(data);
            setToStorage(`${STORAGE_KEYS.CACHED_ENRICHMENT_PREFIX}${id}`, data);
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : 'Failed to enrich company data. Please try again.');
        } finally {
            setIsEnriching(false);
        }
    };

    if (!company) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
            <p className="text-slate-500 font-medium">Locating entity...</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4">
            {/* Breadcrumb / Actions */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 premium-transition"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 premium-transition" />
                    Back to Universe
                </button>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleSaveCompany}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold premium-transition",
                            isSaved
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 subtle-shadow"
                        )}
                    >
                        {isSaved ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        {isSaved ? 'In Pipeline' : 'Add to Pipeline'}
                    </button>
                    <button
                        onClick={handleEnrich}
                        disabled={isEnriching}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white premium-transition hover:bg-slate-800 disabled:opacity-50"
                    >
                        {isEnriching ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Zap className="h-3.5 w-3.5 fill-white/20" />
                        )}
                        {enrichment ? 'Re-Enrich Signals' : 'Extract Signals'}
                    </button>
                </div>
            </div>

            {/* Profile Header */}
            <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-200 p-10 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden subtle-shadow">
                <div className="h-24 w-24 rounded-[2rem] bg-indigo-600/5 border border-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 shrink-0 shadow-inner">
                    {company.name[0]}
                </div>
                <div className="flex-1 space-y-4 pt-2">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{company.name}</h1>
                        <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 border border-indigo-100/50">
                            {company.stage}
                        </span>
                    </div>
                    <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                        {company.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline underline-offset-4"
                        >
                            <Globe className="h-4 w-4" />
                            {company.website.replace('https://', '')}
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                            <MapPin className="h-4 w-4" />
                            {company.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                            <Building2 className="h-4 w-4" />
                            {company.sector}
                        </div>
                    </div>
                </div>
                <Sparkles className="absolute -right-8 -top-8 h-32 w-32 text-indigo-500/5 pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Intelligence */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Enrichment Display */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-indigo-600" />
                                <h2 className="text-xl font-bold text-slate-900">AI Intelligence</h2>
                            </div>
                            {enrichment && (
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <Clock className="h-3 w-3" />
                                    Signals Freshness: {new Date(enrichment.timestamp).toLocaleDateString()}
                                </span>
                            )}
                        </div>

                        {!enrichment && !isEnriching ? (
                            <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 p-12 text-center group hover:border-indigo-200 transition-colors">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-white flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm group-hover:scale-105 premium-transition">
                                    <Sparkles className="h-8 w-8 text-slate-200 group-hover:text-indigo-400 premium-transition" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">No signals extracted yet</h3>
                                <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto font-medium">
                                    Run the enrichment engine to analyze website content and extract deep startup intelligence.
                                </p>
                                <button
                                    onClick={handleEnrich}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:bg-white px-6 py-2 rounded-xl border border-transparent hover:border-indigo-100 premium-transition"
                                >
                                    Launch Analysis
                                </button>
                            </div>
                        ) : isEnriching ? (
                            <div className="bg-white/50 border border-slate-200 rounded-[2rem] p-16 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="relative">
                                    <div className="h-20 w-20 rounded-[1.5rem] border-2 border-indigo-100 flex items-center justify-center relative z-10 bg-white">
                                        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                                    </div>
                                    <div className="absolute -inset-4 bg-indigo-50 rounded-full blur-2xl animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900">Antigravity Engine Working</h3>
                                    <p className="text-slate-400 text-sm font-medium">Scraping website and extracting precision signals...</p>
                                </div>
                            </div>
                        ) : enrichment && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Summary Card */}
                                <div className="bg-white rounded-[2rem] border border-slate-200 p-8 subtle-shadow group">
                                    <p className="text-slate-900 text-lg leading-relaxed font-medium">
                                        {enrichment.summary}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Capabilities */}
                                    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 subtle-shadow">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                            <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                                            Core Capabilities
                                        </h4>
                                        <ul className="space-y-4">
                                            {enrichment.whatTheyDo.map((item, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <div className="h-5 w-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Check className="h-3 w-3 text-indigo-600" />
                                                    </div>
                                                    <span className="text-sm text-slate-600 leading-relaxed font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Derived Signals */}
                                    <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-6 flex items-center gap-2 relative z-10">
                                            <Zap className="h-3.5 w-3.5 fill-indigo-400/30" />
                                            Derived Signals
                                        </h4>
                                        <div className="space-y-4 relative z-10">
                                            {enrichment.derivedSignals.map((signal, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/5 hover:bg-white/20 premium-transition">
                                                    <div className="h-2 w-2 rounded-full bg-white opacity-40 animate-pulse" />
                                                    <span className="text-sm font-bold">{signal}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Building2 className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 rotate-12 group-hover:scale-110 premium-transition" />
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div className="bg-white rounded-[2rem] border border-slate-200 p-8 subtle-shadow">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Sector Keywords</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {enrichment.keywords.map((tag, i) => (
                                            <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 premium-transition cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sidebar Research */}
                <div className="space-y-10">
                    {/* Metrics / Info */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 px-2">Quick Stats</h2>
                        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden subtle-shadow">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Headcount</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">50-100</span>
                            </div>
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Founded</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">2021</span>
                            </div>
                        </div>
                    </div>

                    {/* Research Notes */}
                    <div className="space-y-6">
                        <div className="px-2 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">Research Notes</h2>
                            <FileText className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 space-y-4 subtle-shadow">
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Add internal thesis or feedback..."
                                className="w-full min-h-[160px] bg-slate-50/50 border-none rounded-2xl p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-0 resize-none premium-transition"
                            />
                            <button
                                onClick={handleSaveNote}
                                disabled={isSaving}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white premium-transition hover:bg-indigo-600 disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                                {isSaving ? 'Synching...' : 'Save Notes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
