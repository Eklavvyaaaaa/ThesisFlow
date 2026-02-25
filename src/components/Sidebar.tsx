'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Building2,
    ListTodo,
    Search,
    Settings,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Discovery', href: '/companies', icon: Search },
    { name: 'My Lists', href: '/lists', icon: ListTodo },
    { name: 'Database', href: '/database', icon: Building2 }, // Placeholder for broader data
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-60 flex-col border-r border-slate-200/60 bg-white/50 backdrop-blur-sm">
            <div className="flex h-20 items-center px-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 premium-transition group-hover:scale-105">
                        <Zap className="h-5 w-5 text-white fill-white/20" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900">Antigravity</span>
                </Link>
            </div>

            <div className="flex-1 px-4 py-8 space-y-8">
                <div>
                    <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Core</h3>
                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'group flex items-center rounded-xl px-4 py-2.5 text-sm font-medium premium-transition',
                                        isActive
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    )}
                                >
                                    <item.icon className={cn(
                                        'mr-3 h-4 w-4 shrink-0',
                                        isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                                    )} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100/80">
                <button className="flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 premium-transition">
                    <Settings className="mr-3 h-4 w-4 text-slate-400" />
                    Settings
                </button>
            </div>
        </aside>
    );
}
