'use client';

import React, { useState, useEffect } from 'react';
import {
    Play,
    Trash2
} from 'lucide-react';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/lib/storage';
import { SavedSearch } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SavedSearchesPage() {
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

    useEffect(() => {
        const saved = getFromStorage<SavedSearch[]>(STORAGE_KEYS.SAVED_SEARCHES, []);
        setTimeout(() => setSavedSearches(saved), 0);
    }, []);

    const deleteSearch = (id: string) => {
        const updated = savedSearches.filter(s => s.id !== id);
        setSavedSearches(updated);
        setToStorage(STORAGE_KEYS.SAVED_SEARCHES, updated);
    };

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div>
                <h1 className="font-display text-[28px] text-primary tracking-tight">Saved Searches</h1>
            </div>

            <div className="flex flex-col gap-0 border-t border-default">
                {savedSearches.length > 0 ? (
                    savedSearches.map((search) => {
                        const filterSummary = Object.entries(search.filters)
                            .filter(([_, value]) => value && value !== 'All')
                            .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
                            .join(' · ');

                        return (
                            <div key={search.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-default hover:bg-subtle transition-editorial group">
                                <div className="space-y-1">
                                    <h3 className="text-[14px] font-semibold text-primary">{search.name}</h3>
                                    <p className="font-mono text-[12px] text-muted">
                                        {filterSummary || "No filters applied"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                                    <Link
                                        href={`/companies?${new URLSearchParams(search.filters as Record<string, string>).toString()}`}
                                        className="btn-ghost text-[14px] shadow-sm bg-card border border-default hover:border-strong"
                                    >
                                        Run Search <span className="ml-1 font-mono text-[11px]">→</span>
                                    </Link>
                                    <button
                                        onClick={() => deleteSearch(search.id)}
                                        title="Delete Query"
                                        className="p-1.5 text-muted hover:text-red-600 transition-editorial bg-transparent"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="py-24 text-center border-b border-default space-y-4">
                        <h3 className="font-display italic text-[24px] text-primary">No saved searches</h3>
                        <p className="text-[15px] text-secondary max-w-sm mx-auto">Save your complex filters from the Companies view to reuse them instantly.</p>
                        <Link
                            href="/companies"
                            className="btn-primary inline-flex mt-2"
                        >
                            Explore Companies
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
