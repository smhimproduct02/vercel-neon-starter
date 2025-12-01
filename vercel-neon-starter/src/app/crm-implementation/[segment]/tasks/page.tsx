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
            case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
            case 'Medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
            case 'Low': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href={`/crm-implementation/${segmentSlug}/dashboard`} className="hover:text-blue-600 transition-colors capitalize">
                                {pillar.title} Dashboard
                            </Link>
                            <span>/</span>
                            <span>Tasks</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {pillar.title} Checklist
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            {tasks.filter(t => t.isCompleted).length} of {tasks.length} tasks completed
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className={`px-4 py-2 text-white rounded-lg transition-colors font-medium text-sm ${pillar.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
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
                <div className="flex gap-4 overflow-x-auto pb-2">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Tasks Table */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 w-16 text-center">#</th>
                                    <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 w-16">Status</th>
                                    <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Task</th>
                                    <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Priority</th>
                                    <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Assigned To</th>
                                    <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 text-right">Completed</th>
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
                                                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${task.isCompleted
                                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-500'
                                                    }`}
                                            >
                                                {task.isCompleted && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-sm font-medium ${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                                                {task.title}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 flex items-center justify-center text-xs font-bold uppercase">
                                                    {task.assignedTo?.substring(0, 2)}
                                                </div>
                                                <span className="text-sm text-slate-600 dark:text-slate-400">{task.assignedTo}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right text-sm text-slate-500">
                                            {task.completedAt || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
