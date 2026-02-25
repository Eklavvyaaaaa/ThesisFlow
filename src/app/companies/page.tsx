'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    ChevronDown,
    ArrowUpDown,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
    Globe
} from 'lucide-react';
import { MOCK_COMPANIES } from '@/lib/data';
import { Company, CompanyStage } from '@/types';
import { cn } from '@/lib/utils';

export default function CompaniesPage() {
    const [search, setSearch] = useState('');
    const [sectorFilter, setSectorFilter] = useState('All');
    const [stageFilter, setStageFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Company; direction: 'asc' | 'desc' } | null>(null);

    const sectors = useMemo(() => ['All', ...new Set(MOCK_COMPANIES.map(c => c.sector))].sort(), []);
    const stages = useMemo(() => ['All', 'Seed', 'Series A', 'Series B', 'Series C', 'Late Stage', 'Exit'], []);

    const filteredCompanies = useMemo(() => {
        let result = MOCK_COMPANIES.filter(company => {
            const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
                company.description.toLowerCase().includes(search.toLowerCase());
            const matchesSector = sectorFilter === 'All' || company.sector === sectorFilter;
            const matchesStage = stageFilter === 'All' || company.stage === stageFilter;
            return matchesSearch && matchesSector && matchesStage;
        });

        if (sortConfig) {
            result.sort((a, b) => {
                const aVal = String(a[sortConfig.key]);
                const bVal = String(b[sortConfig.key]);
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [search, sectorFilter, stageFilter, sortConfig]);

    const requestSort = (key: keyof Company) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Universe Discovery</h1>
                    <p className="text-slate-500 text-sm font-medium">Monitoring {MOCK_COMPANIES.length} high-signal startups across all sectors.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white premium-transition shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95">
                    <Plus className="h-4 w-4" />
                    New Company
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-2 rounded-[1.5rem] border border-slate-200 flex flex-col md:flex-row items-center gap-2 subtle-shadow">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, website, or keywords..."
                        className="w-full bg-transparent border-none py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="h-8 w-[1px] bg-slate-100 hidden md:block" />

                <div className="flex items-center gap-2 px-2 w-full md:w-auto">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 ml-2" />
                    <select
                        className="bg-transparent border-none text-xs font-bold text-slate-600 focus:ring-0 cursor-pointer min-w-[120px]"
                        value={sectorFilter}
                        onChange={(e) => setSectorFilter(e.target.value)}
                    >
                        {sectors.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sectors' : s}</option>)}
                    </select>
                </div>

                <div className="h-8 w-[1px] bg-slate-100 hidden md:block" />

                <div className="flex items-center gap-2 px-2 w-full md:w-auto pr-4">
                    <select
                        className="bg-transparent border-none text-xs font-bold text-slate-600 focus:ring-0 cursor-pointer min-w-[120px]"
                        value={stageFilter}
                        onChange={(e) => setStageFilter(e.target.value)}
                    >
                        {stages.map(s => <option key={s} value={s}>{s === 'All' ? 'All Stages' : s}</option>)}
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] border border-slate-200 overflow-hidden subtle-shadow">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th
                                className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                                onClick={() => requestSort('name')}
                            >
                                <div className="flex items-center gap-2">
                                    Entity <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">Sector</th>
                            <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">Stage</th>
                            <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">Location</th>
                            <th className="relative px-8 py-5"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company) => (
                                <tr key={company.id} className="hover:bg-indigo-50/30 transition-all group">
                                    <td className="px-8 py-5">
                                        <Link href={`/companies/${company.id}`} className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 premium-transition">
                                                {company.name}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                                <Globe className="h-3 w-3" />
                                                {company.website.replace('https://', '')}
                                            </span>
                                        </Link>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                            {company.sector}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={cn(
                                            "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold",
                                            company.stage === 'Seed' ? "bg-emerald-50 text-emerald-700" :
                                                company.stage.startsWith('Series') ? "bg-indigo-50 text-indigo-700" :
                                                    "bg-amber-50 text-amber-700"
                                        )}>
                                            {company.stage}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-medium text-slate-500">
                                        {company.location}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <Link
                                            href={`/companies/${company.id}`}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 hover:bg-white hover:text-indigo-600 hover:shadow-lg premium-transition active:scale-95"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
                                        <div className="h-16 w-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center">
                                            <Search className="h-8 w-8 text-slate-200" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-bold text-slate-900">No entities found</p>
                                            <p className="text-sm text-slate-500 font-medium">Try broadening your search or resetting filters to find matching companies.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer */}
            <div className="flex items-center justify-between pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Showing <span className="text-slate-900">{filteredCompanies.length}</span> of {MOCK_COMPANIES.length} Entities
                </p>
                <div className="flex gap-3">
                    <button className="rounded-xl border border-slate-200 px-5 py-2 text-xs font-bold text-slate-500 hover:bg-white hover:text-slate-900 premium-transition disabled:opacity-30 subtle-shadow" disabled>
                        Previous
                    </button>
                    <button className="rounded-xl border border-slate-200 px-5 py-2 text-xs font-bold text-slate-500 hover:bg-white hover:text-slate-900 premium-transition subtle-shadow">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
