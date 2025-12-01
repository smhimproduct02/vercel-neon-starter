'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDashboardStats, syncFromGoogleSheets } from '@/app/actions';

interface DashboardStats {
    totalRecords: number;
    pairedCount: number;
    bannedCount: number;
    productCount: Record<string, number>;
    ownerCount: Record<string, number>;
    recentRecords: any[];
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setIsLoading(true);
        const { success, data } = await getDashboardStats();
        if (success && data) {
            setStats(data);
        }
        setIsLoading(false);
    };

    const handleSync = async () => {
        setIsSyncing(true);
        setSyncMessage(null);
        const result = await syncFromGoogleSheets();

        if (result.success && result.data) {
            const { created, updated, errors } = result.data;
            setSyncMessage(`✅ Synced! Created: ${created}, Updated: ${updated}${errors > 0 ? `, Errors: ${errors}` : ''}`);
            await fetchStats(); // Refresh stats
        } else {
            setSyncMessage(`❌ Sync failed: ${result.error}`);
        }
        setIsSyncing(false);

        // Clear message after 5 seconds
        setTimeout(() => setSyncMessage(null), 5000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-slate-600 dark:text-slate-400">Loading system...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            System Overview
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                            Welcome to the CRM Command Center
                        </p>
                        {syncMessage && (
                            <p className="text-sm mt-2 font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg inline-block">
                                {syncMessage}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className="px-5 py-2.5 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all shadow-sm flex items-center gap-2"
                        >
                            <svg className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {isSyncing ? 'Syncing...' : 'Sync Data'}
                        </button>
                    </div>
                </div>

                {/* System Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Module 1: CRM Implementation */}
                    <Link href="/crm-implementation/dashboard" className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Implementation Tracker</h2>
                            <p className="text-slate-400 mb-6">Track progress, manage daily tasks, and monitor the 4 pillars of CRM setup.</p>
                            <span className="inline-flex items-center text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                                Go to Dashboard &rarr;
                            </span>
                        </div>
                    </Link>

                    {/* Module 2: Segment Features */}
                    <Link href="/dashboard/segment/devices" className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <svg className="w-32 h-32 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Segment Features</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Manage Devices, Customers, Orders, and view Analytics reports.</p>
                            <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                                Manage Features &rarr;
                            </span>
                        </div>
                    </Link>

                    {/* Module 3: Core Records */}
                    <Link href="/dashboard/records" className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <svg className="w-32 h-32 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/30">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Core Records</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">View and manage the master database of Himwellness records.</p>
                            <span className="inline-flex items-center text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                                View Database &rarr;
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 dark:border-slate-700"></div>

                {/* Live System Data Section */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Live System Data
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Records */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Records</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats?.totalRecords || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Paired Devices */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Paired Devices</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats?.pairedCount || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Banned Devices */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Banned Devices</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats?.bannedCount || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Active Rate */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Rate</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                        {stats?.totalRecords ? Math.round((stats.pairedCount / stats.totalRecords) * 100) : 0}%
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Product Distribution */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Product Distribution</h3>
                            <div className="space-y-4">
                                {stats?.productCount && Object.entries(stats.productCount).map(([product, count]) => (
                                    <div key={product}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{product}</span>
                                            <span className="text-slate-500">{count} records</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                                            <div
                                                className={`h-2.5 rounded-full ${product === 'VIGOMAX' ? 'bg-blue-600' :
                                                    product === 'HIMCOFFEE' ? 'bg-amber-500' :
                                                        'bg-emerald-500'
                                                    }`}
                                                style={{ width: `${(count / (stats?.totalRecords || 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Owners */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Owners</h3>
                            <div className="space-y-4">
                                {stats?.ownerCount && Object.entries(stats.ownerCount)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 5)
                                    .map(([owner, count], index) => (
                                        <div key={owner} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm ${index === 0 ? 'bg-yellow-500' :
                                                    index === 1 ? 'bg-slate-400' :
                                                        index === 2 ? 'bg-orange-500' :
                                                            'bg-blue-500'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                                <span className="font-medium text-slate-900 dark:text-white">{owner}</span>
                                            </div>
                                            <span className="font-bold text-slate-600 dark:text-slate-300">{count}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Records */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Records</h3>
                            <Link href="/dashboard/records" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                View All &rarr;
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="px-6 py-3">Owner</th>
                                        <th className="px-6 py-3">Slave ID</th>
                                        <th className="px-6 py-3">Product</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {stats?.recentRecords.map((record: any) => (
                                        <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{record.owner}</td>
                                            <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">{record.slaveId}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${record.product === 'VIGOMAX' ? 'bg-blue-100 text-blue-700' :
                                                    record.product === 'HIMCOFFEE' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {record.product}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${record.status === 'PAIRED' ? 'bg-emerald-100 text-emerald-700' :
                                                    record.status.includes('BAN') ? 'bg-red-100 text-red-700' :
                                                        'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'PAIRED' ? 'bg-emerald-500' :
                                                        record.status.includes('BAN') ? 'bg-red-500' :
                                                            'bg-slate-500'
                                                        }`}></span>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{new Date(record.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
