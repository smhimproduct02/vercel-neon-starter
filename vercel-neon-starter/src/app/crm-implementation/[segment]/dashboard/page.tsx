'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { PILLARS, MASTER_TASKS } from '../../data';
import { StatCard } from '../../components/StatCard';
import { ProgressCircle } from '../../components/ProgressCircle';

export default function SegmentDashboardPage() {
    const params = useParams();
    const segmentSlug = params.segment as string;

    const pillar = PILLARS.find(p => p.slug === segmentSlug);

    if (!pillar) {
        return <div className="p-8 text-center">Segment not found</div>;
    }

    const tasks = MASTER_TASKS.filter(t => t.category === pillar.categoryFilter);
    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const pendingTasks = totalTasks - completedTasks;
    const highPriorityPending = tasks.filter(t => !t.isCompleted && t.priority === 'High').length;

    const getColorClass = (color: string) => {
        switch (color) {
            case 'emerald': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400';
            case 'blue': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
            case 'purple': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
            case 'orange': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
            case 'indigo': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <Link href="/crm-implementation/dashboard" className="hover:text-blue-600 transition-colors">
                                Main Dashboard
                            </Link>
                            <span>/</span>
                            <span className="capitalize">{pillar.title}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {pillar.title} Dashboard
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
                            {pillar.objective}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={`/crm-implementation/${segmentSlug}/tasks`}
                            className={`px-6 py-3 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2 ${pillar.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                                    pillar.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                                        pillar.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                                            pillar.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                                                'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            View Segment Tasks
                        </Link>
                    </div>
                </div>

                {/* Team & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Progress Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Segment Progress</h3>
                        <ProgressCircle
                            percentage={progress}
                            size={180}
                            strokeWidth={15}
                            color={`text-${pillar.color}-600`}
                        />
                        <div className={`mt-6 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${getColorClass(pillar.color)}`}>
                            Team: {pillar.team}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StatCard
                            title="Total Tasks"
                            value={totalTasks}
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                            color={pillar.color}
                        />
                        <StatCard
                            title="Completed"
                            value={completedTasks}
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                            color="green"
                        />
                        <StatCard
                            title="Pending"
                            value={pendingTasks}
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            color="orange"
                        />
                        <StatCard
                            title="High Priority Pending"
                            value={highPriorityPending}
                            subtext="Requires immediate attention"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                            color="red"
                        />
                    </div>
                </div>

                {/* Recent Activity / Tasks Preview */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Today's Tasks Preview</h3>
                    <div className="space-y-4">
                        {tasks.slice(0, 5).map(task => (
                            <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${task.isCompleted
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'border-slate-300 dark:border-slate-600'
                                        }`}>
                                        {task.isCompleted && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div>
                                        <h4 className={`font-medium ${task.isCompleted ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                                            {task.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-slate-500">Assigned to: {task.assignedTo}</span>
                                            {task.priority === 'High' && !task.isCompleted && (
                                                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">HIGH</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-slate-400 font-mono">#{task.orderNo}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <Link
                            href={`/crm-implementation/${segmentSlug}/tasks`}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                        >
                            View all {totalTasks} tasks →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
