'use client';

import React, { useState, useEffect } from 'react';
import {
    Search,
    Clock,
    ArrowRight,
    Trash2,
    Play,
    Filter,
    ExternalLink
} from 'lucide-react';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/lib/storage';
import { SavedSearch } from '@/types';
import Link from 'next/link';

export default function SavedSearchesPage() {
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

    useEffect(() => {
        const saved = getFromStorage<SavedSearch[]>(STORAGE_KEYS.SAVED_SEARCHES, []);
        setSavedSearches(saved);
    }, []);

    const deleteSearch = (id: string) => {
        const updated = savedSearches.filter(s => s.id !== id);
        setSavedSearches(updated);
        setToStorage(STORAGE_KEYS.SAVED_SEARCHES, updated);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Saved Searches</h1>
                    <p className="text-slate-500">Quickly re-run your most important discovery filters.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {savedSearches.length > 0 ? (
                    savedSearches.map((search) => (
                        <div key={search.id} className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between hover:border-indigo-200 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">{search.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        {Object.entries(search.filters).map(([key, value]) => value && (
                                            <span key={key} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                                                {key}: {value}
                                            </span>
                                        ))}
                                        <span className="text-[10px] text-slate-400 ml-2">Saved {new Date(search.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/companies?${new URLSearchParams(search.filters as Record<string, string>).toString()}`}
                                    className="inline-flex items-center gap-2 rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-all"
                                >
                                    <Play className="h-3 w-3" />
                                    Run Search
                                </Link>
                                <button
                                    onClick={() => deleteSearch(search.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
                        <Filter className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                        <h3 className="font-semibold text-slate-700">No saved searches</h3>
                        <p className="text-sm mt-1 mb-6">Save your common search criteria from the Discover page to access them instantly.</p>
                        <Link
                            href="/companies"
                            className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
                        >
                            Go to Discover
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
