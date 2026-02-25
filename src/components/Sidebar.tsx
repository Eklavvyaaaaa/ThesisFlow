'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    ListTodo,
    Search,
    Settings,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Lists', href: '/lists', icon: ListTodo },
    { name: 'Saved Searches', href: '/saved', icon: Search },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xl">V</div>
                    <span className="text-xl font-bold tracking-tight">VC Intel</span>
                </Link>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            )}
                        >
                            <item.icon className={cn(
                                'mr-3 h-5 w-5 flex-shrink-0',
                                isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                            )} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-slate-800 p-4">
                <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                </button>
            </div>
        </div>
    );
}
