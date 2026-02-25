'use client';

import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
            <div className="flex w-full max-w-xl items-center">
                <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search companies, sectors, or signals (Cmd + K)"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Bell className="h-5 w-5" />
                </button>
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium text-sm border border-slate-300">
                    JD
                </div>
            </div>
        </header>
    );
}
