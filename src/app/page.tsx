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
  Plus
} from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Intelligence Dashboard</h1>
          <p className="text-slate-500 mt-2 text-lg">Welcome back. Discovery engine is live and monitoring 500+ signals.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 hover:-translate-y-0.5 transition-all"
          >
            Start Discovery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Companies</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">1,284</p>
          <div className="mt-4 flex items-center text-xs text-emerald-600 font-bold">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Enrichments Run</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">452</p>
          <div className="mt-4 flex items-center text-xs text-indigo-600 font-bold">
            <Clock className="h-3 w-3 mr-1" />
            84 this week
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
            <ListTodo className="h-6 w-6" />
          </div>
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Active Lists</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">18</p>
          <div className="mt-4 flex items-center text-xs text-slate-400 font-bold">
            4 shared with team
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <Link href="/companies" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View all</Link>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">New company added to "AI Thesis"</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Veridia AI • 2 hours ago</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/companies"
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group"
            >
              <div className="h-8 w-8 rounded bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                <Search className="h-4 w-4 text-slate-600 group-hover:text-indigo-600" />
              </div>
              <h4 className="font-bold text-slate-900">Search Startups</h4>
              <p className="text-xs text-slate-500 mt-1">Filter by sector, stage, and location.</p>
            </Link>
            <Link
              href="/lists"
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group"
            >
              <div className="h-8 w-8 rounded bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                <Plus className="h-4 w-4 text-slate-600 group-hover:text-indigo-600" />
              </div>
              <h4 className="font-bold text-slate-900">Create List</h4>
              <p className="text-xs text-slate-500 mt-1">Organize your pipeline effectively.</p>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold">Try AI Enrichment</h3>
              <p className="text-indigo-100 text-sm mt-2 max-w-[240px]">Deeply analyze startup websites using our proprietary LLM signal extraction.</p>
              <Link
                href="/companies"
                className="inline-flex items-center mt-6 text-sm font-bold bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all"
              >
                Launch Discovery
              </Link>
            </div>
            <Zap className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
