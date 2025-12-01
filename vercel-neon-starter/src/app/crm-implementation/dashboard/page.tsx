'use client';

import React from 'react';
import Link from 'next/link';
import { ProgressCircle } from '../components/ProgressCircle';
import { PILLARS, MASTER_TASKS } from '../data';

export default function CrmDashboardPage() {
    // Calculate progress for each pillar dynamically
    const pillarsWithStats = PILLARS.map(pillar => {
        const tasks = MASTER_TASKS.filter(t => t.category === pillar.categoryFilter);
        const completed = tasks.filter(t => t.isCompleted).length;
        const total = tasks.length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { ...pillar, progress, tasks: tasks.slice(0, 4) }; // Show first 4 tasks as preview
    });

    const getColorClass = (color: string) => {
        switch (color) {
            case 'emerald': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
            case 'blue': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
            case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
            case 'orange': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
            case 'indigo': return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                            CRM Structure & Workflow
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Daily Operational Dashboard
                        </p>
                    </div>
                    <Link
                        href="/crm-implementation/tasks"
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        View Master Checklist
                    </Link>
                </div>

                {/* Central Goal Section */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="text-center md:text-left max-w-lg">
                            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                                Target: <span className="text-emerald-600 dark:text-emerald-400">30% Repeat Order</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                "Pastikan semua database & device ready, rancang promosi yang berkesan, kawal pengalaman customer, dan monitor order flow secara konsisten."
                            </p>
                        </div>
                        <div className="relative">
                            <ProgressCircle percentage={30} size={200} strokeWidth={15} color="text-emerald-500" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                Current Rate
                            </div>
                        </div>
                    </div>
                </div>

                {/* The 5 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillarsWithStats.map((pillar, idx) => (
                        <Link
                            key={idx}
                            href={`/crm-implementation/${pillar.slug}/dashboard`}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col h-full hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group"
                        >
                            {/* Header */}
                            <div className={`p-4 rounded-xl border mb-4 ${getColorClass(pillar.color)}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg uppercase group-hover:underline decoration-2 underline-offset-4">{pillar.title}</h3>
                                    <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded">
                                        {pillar.progress}%
                                    </span>
                                </div>
                                <div className="text-xs font-bold opacity-80 uppercase tracking-wider">
                                    {pillar.team}
                                </div>
                            </div>

                            {/* Objective */}
                            <div className="mb-6 flex-grow">
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Objektif</h4>
                                <p className="text-slate-700 dark:text-slate-300 text-sm italic">
                                    "{pillar.objective}"
                                </p>
                            </div>

                            {/* Mini Tasks Preview */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Workflow Preview</h4>
                                <div className="space-y-2">
                                    {pillar.tasks.map((task, tIdx) => (
                                        <div key={tIdx} className="flex items-center gap-3 text-sm">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${task.isCompleted
                                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                                    : 'border-slate-300 dark:border-slate-600'
                                                }`}>
                                                {task.isCompleted && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <span className={task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}>
                                                {task.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center text-xs font-bold text-blue-600 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to manage segment →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
