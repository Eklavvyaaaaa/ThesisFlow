'use client';

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

export function Header() {
    const [query, setQuery] = useState('');

    return (
        <header className="h-[52px] border-b border-default bg-page flex items-center justify-between px-8 w-full">

            {/* Global Search Input */}
            <div className="flex-1 max-w-md relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted group-focus-within:text-primary transition-editorial" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search companies, sectors, tags..."
                    className="w-full bg-transparent border-none pl-9 py-1.5 text-[14px] text-primary focus:outline-none placeholder:text-muted focus:ring-0 font-sans"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 justify-end">
                <Link href="/lists" className="btn-ghost gap-2">
                    <Plus className="h-4 w-4" />
                    New List
                </Link>

                {/* Avatar Placeholder */}
                <div className="h-7 w-7 rounded border border-strong bg-subtle flex items-center justify-center text-[11px] font-mono text-secondary cursor-pointer hover:border-accent transition-editorial">
                    AC
                </div>
            </div>
        </header>
    );
}
