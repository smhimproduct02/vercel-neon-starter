'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PILLARS, MASTER_TASKS, Task } from '../../data';

export default function SegmentTasksPage() {
    const params = useParams();
    const segmentSlug = params.segment as string;

    const pillar = PILLARS.find(p => p.slug === segmentSlug);

    // Filter tasks initially by the segment category
    const initialTasks = MASTER_TASKS.filter(t => t.category === pillar?.categoryFilter);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [filterStatus, setFilterStatus] = useState('All');

    if (!pillar) {
        return <div className="p-8 text-center">Segment not found</div>;
    }

    const filteredTasks = tasks.filter(task => {
        const matchStatus = filterStatus === 'All' ||
            (filterStatus === 'Completed' && task.isCompleted) ||
            (filterStatus === 'Pending' && !task.isCompleted);
        return matchStatus;
    });

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted, completedAt: !t.isCompleted ? new Date().toISOString().split('T')[0] : null } : t
        ));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-100 dark:border-red-800';
            case 'Medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 border-orange-100 dark:border-orange-800';
            case 'Low': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800';
            default: return 'text-slate-600 bg-slate-50 border-slate-100';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 md:pb-12">
            {/* Top Decoration */}
            <div className={`absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-${pillar.color}-600/10 to-transparent pointer-events-none`}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href={`/crm-implementation/${segmentSlug}/dashboard`} className="hover:text-blue-600 transition-colors capitalize flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                {pillar.title} Dashboard
                            </Link>
                            <span className="text-slate-300">/</span>
                            <span>Tasks</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                            {pillar.title} Checklist
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm md:text-base">
                            <span className="font-bold text-emerald-600">{tasks.filter(t => t.isCompleted).length}</span> completed out of <span className="font-bold">{tasks.length}</span> tasks
                        </p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className={`w-full md:w-auto px-5 py-2.5 text-white rounded-xl transition-all font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 ${pillar.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                                pillar.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                                    pillar.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                                        pillar.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                                            'bg-indigo-600 hover:bg-indigo-700'
                            }`}>
                            Reset Tasks
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', 'Completed', 'Pending'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filterStatus === status
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Tasks List (Mobile Cards & Desktop Table) */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">

                    {/* Desktop Table View (Hidden on Mobile) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 w-16 text-center">#</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 w-16">Status</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Task</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Priority</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Assigned To</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 text-right">Completed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                {filteredTasks.map((task) => (
                                    <tr
                                        key={task.id}
                                        className={`group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${task.isCompleted ? 'bg-slate-50/50 dark:bg-slate-900/20' : ''}`}
                                    >
                                        <td className="p-4 text-center text-sm text-slate-400 font-mono">
                                            {task.orderNo}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleTask(task.id)}
                                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.isCompleted
                                                        ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
                                                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:scale-110'
                                                    }`}
                                            >
                                                {task.isCompleted && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-sm font-medium block ${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                                                {task.title}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold uppercase border border-slate-200 dark:border-slate-600">
                                                    {task.assignedTo?.substring(0, 2)}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{task.assignedTo}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right text-sm text-slate-500 font-mono">
                                            {task.completedAt || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View (Visible on Mobile) */}
                    <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className={`p-4 flex gap-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors ${task.isCompleted ? 'bg-slate-50/50 dark:bg-slate-900/20' : ''}`}
                                onClick={() => toggleTask(task.id)}
                            >
                                {/* Checkbox Column */}
                                <div className="flex-shrink-0 pt-1">
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.isCompleted
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'border-slate-300 dark:border-slate-600'
                                        }`}>
                                        {task.isCompleted && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm font-semibold leading-snug ${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                                            {task.title}
                                        </h4>
                                        <span className="text-xs text-slate-400 font-mono ml-2">#{task.orderNo}</span>
                                    </div>

                                    <div className="flex items-center gap-3 mt-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                            <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold uppercase">
                                                {task.assignedTo?.substring(0, 2)}
                                            </div>
                                            <span>{task.assignedTo}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
