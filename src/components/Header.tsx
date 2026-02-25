'use client';

import React from 'react';
import { Search, Bell, User, MoreHorizontal } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-background/80 backdrop-blur-md px-8">
            <div className="flex w-full max-w-lg items-center">
                <div className="relative w-full group">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 premium-transition" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-2xl border-none bg-slate-100/50 py-2.5 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:text-sm premium-transition"
                        placeholder="Search for companies or signals..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-slate-400 hover:text-slate-900 premium-transition">
                    <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100/80">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-slate-900">Eklavvya</span>
                        <span className="text-[10px] text-slate-400">Pro Analyst</span>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-100 shadow-sm">
                        EK
                    </div>
                </div>
            </div>
        </header>
    );
}
