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
    ChevronRight
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Discover Companies</h1>
                    <p className="text-slate-500">Search and filter through {MOCK_COMPANIES.length} startup profiles.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 active:scale-95 transition-all">
                    <Plus className="h-4 w-4" />
                    Add Company
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-y border-slate-200 py-4">
                <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        className="w-full rounded-md border-slate-200 pl-10 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sector</span>
                    <select
                        className="rounded-md border-slate-200 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={sectorFilter}
                        onChange={(e) => setSectorFilter(e.target.value)}
                    >
                        {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stage</span>
                    <select
                        className="rounded-md border-slate-200 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={stageFilter}
                        onChange={(e) => setStageFilter(e.target.value)}
                    >
                        {stages.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-900"
                                onClick={() => requestSort('name')}
                            >
                                <div className="flex items-center gap-1">
                                    Name <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Sector</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Stage</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Location</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company) => (
                                <tr key={company.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <Link href={`/companies/${company.id}`} className="flex flex-col">
                                            <span className="text-sm font-semibold text-indigo-600 group-hover:underline underline-offset-2">
                                                {company.name}
                                            </span>
                                            <span className="text-xs text-slate-400">{company.website}</span>
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                        {company.sector}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                            company.stage === 'Seed' ? "bg-emerald-100 text-emerald-800" :
                                                company.stage.startsWith('Series') ? "bg-blue-100 text-blue-800" :
                                                    "bg-amber-100 text-amber-800"
                                        )}>
                                            {company.stage}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                        {company.location}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <Link
                                            href={`/companies/${company.id}`}
                                            className="text-slate-400 hover:text-indigo-600 transition-colors"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="rounded-full bg-slate-100 p-3">
                                            <Search className="h-6 w-6 text-slate-400" />
                                        </div>
                                        <p className="text-lg font-medium">No companies found</p>
                                        <p className="text-sm">Try adjusting your filters or search query.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between py-3">
                <p className="text-sm text-slate-700">
                    Showing <span className="font-medium">{filteredCompanies.length}</span> results
                </p>
                <div className="flex gap-2">
                    <button className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50" disabled>
                        Previous
                    </button>
                    <button className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
