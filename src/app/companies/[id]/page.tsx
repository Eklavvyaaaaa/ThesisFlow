'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Building2,
    Globe,
    MapPin,
    Tag,
    Calendar,
    Save,
    Zap,
    Check,
    AlertCircle,
    Loader2,
    ChevronLeft,
    FileText
} from 'lucide-react';
import { MOCK_COMPANIES } from '@/lib/data';
import { Company, EnrichmentData } from '@/types';
import { cn } from '@/lib/utils';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/lib/storage';

export default function CompanyProfilePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [company, setCompany] = useState<Company | null>(null);
    const [notes, setNotes] = useState('');
    const [isEnriching, setIsEnriching] = useState(false);
    const [enrichment, setEnrichment] = useState<EnrichmentData | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const found = MOCK_COMPANIES.find(c => c.id === id);
        if (!found) {
            router.push('/companies');
            return;
        }
        setCompany(found);

        // Load notes from localStorage
        const savedNotes = getFromStorage(`${STORAGE_KEYS.NOTES_PREFIX}${id}`, '');
        setNotes(savedNotes);

        // Load cached enrichment
        const cachedEnrichment = getFromStorage<EnrichmentData | null>(`${STORAGE_KEYS.CACHED_ENRICHMENT_PREFIX}${id}`, null);
        setEnrichment(cachedEnrichment);

        // Check if saved to list (mock logic)
        const lists = getFromStorage<any[]>(STORAGE_KEYS.LISTS, []);
        const saved = lists.some(list => list.companyIds.includes(id));
        setIsSaved(saved);
    }, [id, router]);

    const handleSaveNote = () => {
        setToStorage(`${STORAGE_KEYS.NOTES_PREFIX}${id}`, notes);
        // Visual feedback would be nice here
    };

    const handleEnrich = async () => {
        if (!company) return;
        setIsEnriching(true);
        try {
            const resp = await fetch('/api/enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ website: company.website })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);

            setEnrichment(data);
            setToStorage(`${STORAGE_KEYS.CACHED_ENRICHMENT_PREFIX}${id}`, data);
        } catch (err) {
            console.error(err);
            alert('Failed to enrich company data. Please try again.');
        } finally {
            setIsEnriching(false);
        }
    };

    if (!company) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <button
                onClick={() => router.back()}
                className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Research
            </button>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <Building2 className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{company.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                            <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-600 underline underline-offset-2 transition-colors">
                                <Globe className="h-4 w-4" />
                                {company.website.replace('https://', '')}
                            </a>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {company.location}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleEnrich}
                        disabled={isEnriching}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50",
                            enrichment ? "bg-slate-100 text-slate-700" : "bg-indigo-600 text-white hover:bg-indigo-500"
                        )}
                    >
                        {isEnriching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                        {enrichment ? "Refresh Enrichment" : "Enrich Profile"}
                    </button>
                    <button
                        className={cn(
                            "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold border shadow-sm transition-all active:scale-95",
                            isSaved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                        )}
                    >
                        {isSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {isSaved ? "Saved to List" : "Save to List"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Details & Enrichment */}
                <div className="md:col-span-2 space-y-8">
                    {/* Overview */}
                    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-semibold text-slate-900">General Overview</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-600 leading-relaxed">{company.description}</p>
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Sector</label>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{company.sector}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Stage</label>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{company.stage}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Enrichment Results */}
                    {isEnriching && (
                        <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-12 flex flex-col items-center justify-center gap-3 text-indigo-600 animate-pulse">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <p className="font-medium">Scaling the web and extracting intelligence...</p>
                        </div>
                    )}

                    {enrichment && !isEnriching && (
                        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="px-6 py-4 border-b border-slate-100 bg-indigo-50/30 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-indigo-600 fill-indigo-600" />
                                    <h3 className="font-semibold text-slate-900">AI Enrichment Results</h3>
                                </div>
                                <span className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-100 px-2 py-0.5 rounded">Live Data</span>
                            </div>
                            <div className="p-6 space-y-8">
                                <div>
                                    <p className="text-slate-700 italic border-l-4 border-indigo-200 pl-4 py-1">{enrichment.summary}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        Core Capabilities
                                    </h4>
                                    <ul className="grid grid-cols-1 gap-2">
                                        {enrichment.whatTheyDo.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-3">Derived Signals</h4>
                                        <div className="space-y-2">
                                            {enrichment.derivedSignals.map((signal, idx) => (
                                                <div key={idx} className="bg-slate-50 border border-slate-100 rounded p-2 text-xs text-slate-600">
                                                    {signal}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-3">Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {enrichment.keywords.map((kw, idx) => (
                                                <span key={idx} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                                    <div className="flex gap-4">
                                        <span>Sources: {enrichment.sources.length} pages scraped</span>
                                        <span>Last updated: {new Date(enrichment.sources[0].timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {!enrichment && !isEnriching && (
                        <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
                            <Zap className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                            <h3 className="font-semibold text-slate-700">No Enrichment Data Available</h3>
                            <p className="text-sm mt-1 mb-6">Run enrichment to discover deeper signals and automated summaries.</p>
                            <button
                                onClick={handleEnrich}
                                className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
                            >
                                Start Enrichment Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Signals & Notes */}
                <div className="space-y-8">
                    {/* Timeline - Mocked */}
                    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <h3 className="font-semibold text-slate-900">Signal Timeline</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="relative pl-6 pb-6 border-l-2 border-indigo-100">
                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-indigo-500" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Oct 12, 2023</span>
                                    <h4 className="text-sm font-semibold text-slate-900 mt-1">Series A Funding Round</h4>
                                    <p className="text-xs text-slate-500 mt-1">Raised $14M led by Peak Ventures.</p>
                                </div>
                                <div className="relative pl-6 pb-2 border-l-2 border-indigo-100">
                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-slate-300" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Aug 05, 2023</span>
                                    <h4 className="text-sm font-semibold text-slate-900 mt-1">Product Launch</h4>
                                    <p className="text-xs text-slate-500 mt-1">v2.0 Beta released to public.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Notes */}
                    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-400" />
                                <h3 className="font-semibold text-slate-900">Personal Notes</h3>
                            </div>
                            <button
                                onClick={handleSaveNote}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase"
                            >
                                Auto-Saved
                            </button>
                        </div>
                        <div className="p-6">
                            <textarea
                                className="w-full min-h-[160px] rounded-md border-slate-200 text-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-slate-400"
                                placeholder="Add investment thesis notes, call summaries, or next steps..."
                                value={notes}
                                onChange={(e) => {
                                    setNotes(e.target.value);
                                    setToStorage(`${STORAGE_KEYS.NOTES_PREFIX}${id}`, e.target.value);
                                }}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
