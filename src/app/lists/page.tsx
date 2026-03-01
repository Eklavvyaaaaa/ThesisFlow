'use client';

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Trash2,
    Users,
    ChevronRight,
    PlusCircle,
    FileJson,
    FileSpreadsheet,
    ArrowUpRight
} from 'lucide-react';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/lib/storage';
import { CompanyList } from '@/types';
import { MOCK_COMPANIES } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ListsPage() {
    const [lists, setLists] = useState<CompanyList[]>([]);
    const [newListName, setNewListName] = useState('');
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        const savedLists = getFromStorage<CompanyList[]>(STORAGE_KEYS.LISTS, []);
        // Run after mount to avoid synchronous state update in effect during render phase
        setTimeout(() => setLists(savedLists), 0);
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
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="font-display text-[28px] text-primary tracking-tight">Lists</h1>
                {!showCreate && (
                    <button
                        onClick={() => setShowCreate(true)}
                        className="btn-primary"
                    >
                        Create List
                    </button>
                )}
            </div>

            {showCreate && (
                <div className="border border-default bg-card rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex items-center gap-4">
                        <input
                            autoFocus
                            className="input-editorial flex-1"
                            placeholder="e.g. Series A Fintech 2024"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && createList()}
                        />
                        <button onClick={createList} className="btn-primary">Confirm</button>
                        <button onClick={() => setShowCreate(false)} className="btn-ghost">Cancel</button>
                    </div>
                </div>
            )}

            {lists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lists.map((list) => (
                        <div key={list.id} className="border border-default bg-card rounded-xl p-[20px] flex flex-col hover:border-strong transition-editorial shadow-sm">

                            <div className="space-y-1 mb-6">
                                <h3 className="text-[15px] font-semibold text-primary">{list.name}</h3>
                                <div className="flex items-center justify-between">
                                    <p className="font-mono text-[12px] text-muted">
                                        {list.companyIds.length} companies
                                    </p>
                                    <p className="font-mono text-[11px] text-muted">
                                        {new Date(list.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-[-4px] mb-8 flex-1 pl-1">
                                {list.companyIds.slice(0, 3).map((compId, i) => {
                                    const company = MOCK_COMPANIES.find(c => c.id === compId);
                                    return company ? (
                                        <div
                                            key={compId}
                                            className="h-8 w-8 rounded bg-strong border-2 border-card flex items-center justify-center text-[10px] font-bold text-white shadow-sm -ml-2 first:ml-0"
                                            style={{ zIndex: 10 - i }}
                                            title={company.name}
                                        >
                                            {company.name[0]}
                                        </div>
                                    ) : null;
                                })}
                                {list.companyIds.length > 3 && (
                                    <div className="font-mono text-[11px] text-muted pl-3">
                                        +{list.companyIds.length - 3} more
                                    </div>
                                )}
                                {list.companyIds.length === 0 && (
                                    <div className="font-mono text-[11px] text-muted italic">
                                        No companies added
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 flex items-center gap-3">
                                <button
                                    onClick={() => exportAsCSV(list)}
                                    className="text-[13px] font-medium text-secondary hover:text-primary transition-editorial flex-1 text-left"
                                >
                                    Export CSV
                                </button>
                                <button
                                    onClick={() => exportAsJSON(list)}
                                    className="text-[13px] font-medium text-secondary hover:text-primary transition-editorial flex-1 text-center"
                                >
                                    JSON
                                </button>
                                <button
                                    onClick={() => deleteList(list.id)}
                                    className="text-[13px] font-medium text-red-600 hover:text-red-700 transition-editorial flex-1 text-right"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center space-y-4">
                    <h3 className="font-display italic text-[24px] text-primary">No lists yet</h3>
                    <p className="text-[15px] text-secondary max-w-sm mx-auto">Create a list to start organizing and tracking interesting companies.</p>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="btn-primary"
                    >
                        Create List
                    </button>
                </div>
            )}
        </div>
    );
}
