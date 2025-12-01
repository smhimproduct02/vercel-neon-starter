'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- Types ---
interface Task {
    id: string;
    title: string;
    category: string;
    isCompleted: boolean;
    assignedTo: string | null;
    completedAt: string | null;
    orderNo: number;
    priority: 'High' | 'Medium' | 'Low';
}

// --- Dummy Data: Detailed CRM Tasks ---
const MASTER_TASKS: Task[] = [
    // 1. Database & Device Management (AA & AMIR)
    { id: '101', orderNo: 1, category: 'Database & Device', title: 'Verify WSAPME connection status (4 devices)', isCompleted: true, assignedTo: 'AA', completedAt: '2025-12-02', priority: 'High' },
    { id: '102', orderNo: 2, category: 'Database & Device', title: 'Check physical device battery (>80%) & internet', isCompleted: true, assignedTo: 'AA', completedAt: '2025-12-02', priority: 'High' },
    { id: '103', orderNo: 3, category: 'Database & Device', title: 'Export daily sales CSV from Ecommerce/Shopee', isCompleted: true, assignedTo: 'Amir', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '104', orderNo: 4, category: 'Database & Device', title: 'Clean database (remove duplicates & format +60)', isCompleted: true, assignedTo: 'Amir', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '105', orderNo: 5, category: 'Database & Device', title: 'Distribute leads to Main vs Backup devices', isCompleted: true, assignedTo: 'Amir', completedAt: '2025-12-02', priority: 'High' },
    { id: '106', orderNo: 6, category: 'Database & Device', title: 'Manual entry for TikTok leads', isCompleted: false, assignedTo: 'Amir', completedAt: null, priority: 'Medium' },
    { id: '107', orderNo: 7, category: 'Database & Device', title: 'Check SIM credit balance (Topup if <RM10)', isCompleted: false, assignedTo: 'AA', completedAt: null, priority: 'Low' },
    { id: '108', orderNo: 8, category: 'Database & Device', title: 'Perform SIM warming (Scroll FB/IG for 10 mins)', isCompleted: false, assignedTo: 'AA', completedAt: null, priority: 'Low' },
    { id: '109', orderNo: 9, category: 'Database & Device', title: 'Log daily new leads & device downtime', isCompleted: false, assignedTo: 'Amir', completedAt: null, priority: 'Medium' },

    // 2. Product & Stock Management (PINUK & POKLOH)
    { id: '201', orderNo: 10, category: 'Product & Stock', title: 'Pull daily sales report from Bizapp', isCompleted: true, assignedTo: 'Pinuk', completedAt: '2025-12-02', priority: 'High' },
    { id: '202', orderNo: 11, category: 'Product & Stock', title: 'Update inventory count in Master Sheet', isCompleted: true, assignedTo: 'Pinuk', completedAt: '2025-12-02', priority: 'High' },
    { id: '203', orderNo: 12, category: 'Product & Stock', title: 'Identify top 3 bestsellers & slow-moving items', isCompleted: true, assignedTo: 'Pokloh', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '204', orderNo: 13, category: 'Product & Stock', title: 'Decide "Product of the Day" for push', isCompleted: true, assignedTo: 'Pokloh', completedAt: '2025-12-02', priority: 'High' },
    { id: '205', orderNo: 14, category: 'Product & Stock', title: 'Draft promo copy (Soft/Hard sell variations)', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'High' },
    { id: '206', orderNo: 15, category: 'Product & Stock', title: 'Determine offer structure (Bundle/Free Gift)', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'Medium' },
    { id: '207', orderNo: 16, category: 'Product & Stock', title: 'Update Promo Calendar for next 3 days', isCompleted: false, assignedTo: 'Pokloh', completedAt: null, priority: 'Medium' },
    { id: '208', orderNo: 17, category: 'Product & Stock', title: 'Analyze yesterday\'s promo conversion rate', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'Low' },

    // 3. Flow, Skrip & Service (AIN, FATHIN, PINUK)
    { id: '301', orderNo: 18, category: 'Flow & Service', title: 'Check WSAPME chatbot triggers & keywords', isCompleted: true, assignedTo: 'Ain', completedAt: '2025-12-02', priority: 'High' },
    { id: '302', orderNo: 19, category: 'Flow & Service', title: 'Test "Greeting" flow with dummy number', isCompleted: true, assignedTo: 'Ain', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '303', orderNo: 20, category: 'Flow & Service', title: 'Submit poster request to Media Team', isCompleted: true, assignedTo: 'Fathin', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '304', orderNo: 21, category: 'Flow & Service', title: 'Approve final visuals for broadcast', isCompleted: false, assignedTo: 'Fathin', completedAt: null, priority: 'Medium' },
    { id: '305', orderNo: 22, category: 'Flow & Service', title: 'Setup broadcast batch (Target: 60+ days inactive)', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'High' },
    { id: '306', orderNo: 23, category: 'Flow & Service', title: 'Monitor first 50 blasts for errors/bans', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'High' },
    { id: '307', orderNo: 24, category: 'Flow & Service', title: 'Calculate Reply Rate & Closing Rate', isCompleted: false, assignedTo: 'Ain', completedAt: null, priority: 'Medium' },
    { id: '308', orderNo: 25, category: 'Flow & Service', title: 'Update daily service report', isCompleted: false, assignedTo: 'Fathin', completedAt: null, priority: 'Low' },

    // 4. Customer Relation & Order (AIDA, AISYAH, DELLY...)
    { id: '401', orderNo: 26, category: 'Customer & Order', title: 'Verify payment receipts (Bank/QR)', isCompleted: true, assignedTo: 'Aida', completedAt: '2025-12-02', priority: 'High' },
    { id: '402', orderNo: 27, category: 'Customer & Order', title: 'Key in order details to Bizapp', isCompleted: true, assignedTo: 'Aida', completedAt: '2025-12-02', priority: 'High' },
    { id: '403', orderNo: 28, category: 'Customer & Order', title: 'Apply correct tagging (New/Repeat/Loyal)', isCompleted: true, assignedTo: 'Aida', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '404', orderNo: 29, category: 'Customer & Order', title: 'Post payment proof to Telegram Group', isCompleted: true, assignedTo: 'Aisyah', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '405', orderNo: 30, category: 'Customer & Order', title: 'Reply to customer inquiries (<10 mins)', isCompleted: false, assignedTo: 'Delly', completedAt: null, priority: 'High' },
    { id: '406', orderNo: 31, category: 'Customer & Order', title: 'Follow up on "Seen but No Reply" (24hrs)', isCompleted: false, assignedTo: 'Nazira', completedAt: null, priority: 'Medium' },
    { id: '407', orderNo: 32, category: 'Customer & Order', title: 'Report device lag/delay issues', isCompleted: false, assignedTo: 'Syamira', completedAt: null, priority: 'High' },
    { id: '408', orderNo: 33, category: 'Customer & Order', title: 'Update daily personal sales target', isCompleted: false, assignedTo: 'All', completedAt: null, priority: 'Low' },
];

export default function CrmTasksPage() {
    const [tasks, setTasks] = useState<Task[]>(MASTER_TASKS);
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const categories = ['All', ...Array.from(new Set(tasks.map(t => t.category)))];

    const filteredTasks = tasks.filter(task => {
        const matchCategory = filterCategory === 'All' || task.category === filterCategory;
        const matchStatus = filterStatus === 'All' ||
            (filterStatus === 'Completed' && task.isCompleted) ||
            (filterStatus === 'Pending' && !task.isCompleted);
        return matchCategory && matchStatus;
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
                            <Link href="/crm-implementation/dashboard" className="hover:text-blue-600 transition-colors">
                                Dashboard
                            </Link>
                            <span>/</span>
                            <span>Daily Workflow</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Detailed Operational Checklist</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            {tasks.filter(t => t.isCompleted).length} of {tasks.length} tasks completed today
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm">
                            Reset Daily Tasks
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                                    <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Category</th>
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
                                                        : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500'
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
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                                {task.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center text-xs font-bold uppercase">
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
