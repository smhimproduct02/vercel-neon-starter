'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPhoneTopUps } from '@/app/phone-topup-actions';

interface PhoneTopUp {
    id: string;
    phoneNumber: string;
    simCardId: number | null;
    name: string | null;
    status: string;
    wsStatus: string | null;
    topUpAmount: string;
    topUpDate: Date | null;
    renewalDate: Date | null;
    price: string;
    notes: string | null;
}

export default function PhoneTopUpList() {
    const [topUps, setTopUps] = useState<PhoneTopUp[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');
    const [wsStatusFilter, setWsStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTopUps();
    }, [statusFilter, wsStatusFilter, searchQuery]);

    const fetchTopUps = async () => {
        setIsLoading(true);
        const { success, data } = await getPhoneTopUps({
            status: statusFilter,
            wsStatus: wsStatusFilter,
            search: searchQuery,
        });
        if (success && data) {
            setTopUps(data as PhoneTopUp[]);
        }
        setIsLoading(false);
    };

    const getStatusBadge = (status: string) => {
        if (status === 'Active') {
            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        } else if (status.includes('Terminated')) {
            return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
        }
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    };

    const getWsStatusBadge = (wsStatus: string | null) => {
        if (!wsStatus) return 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400';
        if (wsStatus.includes('Banned')) {
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        }
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-GB');
    };

    const isDueSoon = (renewalDate: Date | null) => {
        if (!renewalDate) return false;
        const daysUntil = Math.ceil((new Date(renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 7;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading records...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href="/dashboard/segment/phone-topups" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                Dashboard
                            </Link>
                            <span className="text-slate-300">/</span>
                            <span>All Records</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                            Phone TopUp Records
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm md:text-base">
                            <span className="font-bold text-purple-600">{topUps.length}</span> records found
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search by phone or name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Terminated">Terminated</option>
                        </select>

                        {/* WS Status Filter */}
                        <select
                            value={wsStatusFilter}
                            onChange={(e) => setWsStatusFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="All">All WS Status</option>
                            <option value="Active">WS Active</option>
                            <option value="Banned">WS Banned</option>
                            <option value="Permanent Banned">Permanent Banned</option>
                        </select>
                    </div>
                </div>

                {/* Records List */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">ID</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Phone Number</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Name</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Status</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">WS Status</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Last TopUp</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Renewal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                {topUps.map((topUp) => (
                                    <tr key={topUp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-mono">{topUp.simCardId || '-'}</td>
                                        <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{topUp.phoneNumber}</td>
                                        <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{topUp.name || '-'}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadge(topUp.status)}`}>
                                                {topUp.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getWsStatusBadge(topUp.wsStatus)}`}>
                                                {topUp.wsStatus || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{formatDate(topUp.topUpDate)}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">{formatDate(topUp.renewalDate)}</span>
                                                {isDueSoon(topUp.renewalDate) && (
                                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold rounded">DUE SOON</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                        {topUps.map((topUp) => (
                            <div key={topUp.id} className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">{topUp.phoneNumber}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{topUp.name || 'No name'}</p>
                                    </div>
                                    <span className="text-xs font-mono text-slate-400">#{topUp.simCardId || 'N/A'}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusBadge(topUp.status)}`}>
                                        {topUp.status}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getWsStatusBadge(topUp.wsStatus)}`}>
                                        WS: {topUp.wsStatus || 'N/A'}
                                    </span>
                                    {isDueSoon(topUp.renewalDate) && (
                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold rounded">DUE SOON</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Last TopUp</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{formatDate(topUp.topUpDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Renewal</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{formatDate(topUp.renewalDate)}</p>
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
