'use client';

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Trash2,
    Download,
    Building2,
    Users,
    ChevronRight,
    PlusCircle,
    FileJson,
    FileSpreadsheet
} from 'lucide-react';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/lib/storage';
import { CompanyList, Company } from '@/types';
import { MOCK_COMPANIES } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ListsPage() {
    const [lists, setLists] = useState<CompanyList[]>([]);
    const [newListName, setNewListName] = useState('');
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        // Initial empty list if none exist
        const savedLists = getFromStorage<CompanyList[]>(STORAGE_KEYS.LISTS, []);
        setLists(savedLists);
    }, []);

    const createList = () => {
        if (!newListName.trim()) return;
        const newList: CompanyList = {
            id: Math.random().toString(36).substr(2, 9),
            name: newListName,
            companyIds: [],
            createdAt: new Date().toISOString(),
        };
        const updated = [...lists, newList];
        setLists(updated);
        setToStorage(STORAGE_KEYS.LISTS, updated);
        setNewListName('');
        setShowCreate(false);
    };

    const deleteList = (id: string) => {
        const updated = lists.filter(l => l.id !== id);
        setLists(updated);
        setToStorage(STORAGE_KEYS.LISTS, updated);
    };

    const exportAsJSON = (list: CompanyList) => {
        const companies = MOCK_COMPANIES.filter(c => list.companyIds.includes(c.id));
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companies, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${list.name.toLowerCase().replace(/\s+/g, '_')}_export.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const exportAsCSV = (list: CompanyList) => {
        const companies = MOCK_COMPANIES.filter(c => list.companyIds.includes(c.id));
        const headers = ['Name', 'Website', 'Sector', 'Stage', 'Location', 'Description'];
        const rows = companies.map(c => [
            c.name,
            c.website,
            c.sector,
            c.stage,
            c.location,
            `"${c.description.replace(/"/g, '""')}"`
        ]);

        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${list.name.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Lists</h1>
                    <p className="text-slate-500">Manage and export your collections of target companies.</p>
                </div>
                {!showCreate ? (
                    <button
                        onClick={() => setShowCreate(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        New List
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <input
                            autoFocus
                            className="rounded-md border-slate-200 text-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5"
                            placeholder="List name..."
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && createList()}
                        />
                        <button
                            onClick={createList}
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setShowCreate(false)}
                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lists.length > 0 ? (
                    lists.map((list) => (
                        <div key={list.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-indigo-200 transition-colors">
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => exportAsJSON(list)}
                                            title="Export JSON"
                                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all"
                                        >
                                            <FileJson className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => exportAsCSV(list)}
                                            title="Export CSV"
                                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all"
                                        >
                                            <FileSpreadsheet className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteList(list.id)}
                                            title="Delete List"
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mt-4">{list.name}</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    {list.companyIds.length} companies saved
                                </p>

                                <div className="mt-6 space-y-3">
                                    {list.companyIds.slice(0, 3).map(compId => {
                                        const company = MOCK_COMPANIES.find(c => c.id === compId);
                                        return company ? (
                                            <Link
                                                key={compId}
                                                href={`/companies/${compId}`}
                                                className="flex items-center justify-between text-xs text-slate-600 hover:text-indigo-600 py-1"
                                            >
                                                <span className="font-medium">{company.name}</span>
                                                <ChevronRight className="h-3 w-3" />
                                            </Link>
                                        ) : null;
                                    })}
                                    {list.companyIds.length > 3 && (
                                        <p className="text-[10px] text-slate-400 font-medium">+ {list.companyIds.length - 3} more companies</p>
                                    )}
                                    {list.companyIds.length === 0 && (
                                        <p className="text-xs italic text-slate-400">Empty list. Add companies from their profiles.</p>
                                    )}
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
                                <Link
                                    href="/companies"
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase flex items-center gap-1"
                                >
                                    <PlusCircle className="h-3 w-3" />
                                    Add Companies
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-slate-50 rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
                        <PlusCircle className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                        <h3 className="font-semibold text-slate-700 text-lg">No lists created yet</h3>
                        <p className="text-sm mt-1 mb-6 max-w-sm mx-auto">Create a list to organize startups by investment thesis, sector interest, or deal stage.</p>
                        <button
                            onClick={() => setShowCreate(true)}
                            className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
