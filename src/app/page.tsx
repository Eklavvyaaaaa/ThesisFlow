import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Search,
  ListTodo,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Plus,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4">
      {/* Hero / Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Intelligence Engine Active
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Discover your next <span className="text-indigo-600">outlier.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Real-time signals and AI-powered enrichment for the modern venture team.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/companies"
            className="group inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white premium-transition hover:bg-slate-800 hover:-translate-y-1"
          >
            Start Research
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 premium-transition" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-200/60 premium-transition hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 group">
          <div className="flex items-center justify-between mb-6">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white premium-transition">
              <Building2 className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp className="h-3 w-3" />
              +12%
            </span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Universe</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">1,284</p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-200/60 premium-transition hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 group">
          <div className="flex items-center justify-between mb-6">
            <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white premium-transition">
              <Zap className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-violet-600 flex items-center gap-1 bg-violet-50 px-2 py-1 rounded-lg">
              <Clock className="h-3 w-3" />
              Live
            </span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Enrichments Run</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">452</p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-200/60 premium-transition hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 group">
          <div className="flex items-center justify-between mb-6">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white premium-transition">
              <ListTodo className="h-6 w-6" />
            </div>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active Pipelenes</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">18</p>
        </div>
      </div>

      {/* Detailed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-900">Recent Signals</h2>
            <Link href="/companies" className="text-sm font-bold text-indigo-600 hover:underline underline-offset-4">
              Explore All Signals
            </Link>
          </div>
          <div className="bg-white/40 border border-slate-200/50 rounded-[2rem] overflow-hidden backdrop-blur-sm">
            {[
              { id: 1, text: 'New company discovered in AgriTech', sub: 'TerraForma Labs • Nairobi', time: '2m ago' },
              { id: 2, text: 'Enrichment complete for QuantumScale', sub: 'Detected hiring surge in London', time: '1h ago' },
              { id: 3, text: 'Veridia AI moved to "Due Diligence"', sub: 'Updated by Alex Chen', time: '3h ago' },
              { id: 4, text: 'Sector alert: HealthTech', sub: '4 new Seed rounds detected today', time: '5h ago' },
            ].map((i) => (
              <div key={i.id} className="group p-6 flex items-center justify-between hover:bg-white/80 premium-transition border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-5">
                  <div className="h-10 w-10 rounded-xl bg-slate-100/50 flex items-center justify-center group-hover:bg-white premium-transition">
                    <Building2 className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 premium-transition" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{i.text}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{i.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{i.time}</span>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 premium-transition bg-indigo-50 text-indigo-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 px-2">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              href="/companies"
              className="flex items-center gap-4 p-6 bg-white border border-slate-200/60 rounded-[2rem] premium-transition hover:border-indigo-300 hover:shadow-lg group"
            >
              <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white premium-transition">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Run Filters</h4>
                <p className="text-xs text-slate-500">Segment universe</p>
              </div>
            </Link>

            <Link
              href="/lists"
              className="flex items-center gap-4 p-6 bg-white border border-slate-200/60 rounded-[2rem] premium-transition hover:border-indigo-300 hover:shadow-lg group"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white premium-transition">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Create Pipeline</h4>
                <p className="text-xs text-slate-500">Sync with colleagues</p>
              </div>
            </Link>

            <div className="p-8 rounded-[2rem] bg-indigo-600 text-white relative overflow-hidden group shadow-2xl shadow-indigo-200">
              <div className="relative z-10">
                <h3 className="text-lg font-bold">Deep Enrichment</h3>
                <p className="text-indigo-100 text-xs mt-2 leading-relaxed">
                  Extract precision signals from any URL using the Antigravity AI engine.
                </p>
                <Link
                  href="/companies"
                  className="inline-flex items-center mt-6 text-xs font-bold bg-white text-indigo-600 px-5 py-2.5 rounded-xl hover:scale-105 premium-transition"
                >
                  Start Discovery
                </Link>
              </div>
              <Zap className="absolute -right-4 -bottom-4 h-32 w-32 text-indigo-400/20 rotate-12 group-hover:scale-110 premium-transition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
