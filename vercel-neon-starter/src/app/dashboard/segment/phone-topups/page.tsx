'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPhoneTopUpStats, syncPhoneTopUpsFromSheet } from '@/app/phone-topup-actions';

interface Stats {
    total: number;
    active: number;
    terminated: number;
    wsBanned: number;
    upcomingRenewals: number;
    monthlyCost: number;
}

export default function PhoneTopUpDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setIsLoading(true);
        const { success, data } = await getPhoneTopUpStats();
        if (success && data) {
            setStats(data);
        }
        setIsLoading(false);
    };

    const handleSync = async () => {
        setIsSyncing(true);
        setSyncMessage(null);

        try {
            console.log('Starting sync from Google Sheet...');
            const result = await syncPhoneTopUpsFromSheet();
            console.log('Sync result:', result);

            if (result.success && result.data) {
                const { created, updated, errors } = result.data;
                setSyncMessage(`✅ Synced! Created: ${created}, Updated: ${updated}${errors > 0 ? `, Errors: ${errors}` : ''}`);
                await fetchStats();
            } else {
                const errorMsg = result.error || 'Unknown error occurred';
                console.error('Sync failed:', errorMsg);
                setSyncMessage(`❌ Sync failed: ${errorMsg}`);
            }
        } catch (error: any) {
            console.error('Sync exception:', error);
            setSyncMessage(`❌ Sync error: ${error.message || 'Unknown error'}`);
        }

        setIsSyncing(false);
        setTimeout(() => setSyncMessage(null), 10000); // Show error for 10 seconds
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Phone TopUp Tracker
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                            XoX SIM Card Management
                        </p>
                        {syncMessage && (
                            <div className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                                {syncMessage}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className="px-6 py-3 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            <svg className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {isSyncing ? 'Syncing...' : 'Sync from Sheet'}
                        </button>
                        <Link
                            href="/dashboard/segment/phone-topups/list"
                            className="px-6 py-3 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
                        >
                            View All Records
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Total SIMs */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total SIM Cards</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats?.total || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Active */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active</p>
                                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{stats?.active || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Terminated */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Terminated</p>
                                <p className="text-3xl font-bold text-slate-600 dark:text-slate-400 mt-2">{stats?.terminated || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* WS Banned */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">WS Banned</p>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{stats?.wsBanned || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Renewals */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Due in 7 Days</p>
                                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">{stats?.upcomingRenewals || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Cost */}
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-100">Monthly Cost</p>
                                <p className="text-3xl font-bold text-white mt-2">RM {stats?.monthlyCost || 0}</p>
                                <p className="text-xs text-purple-200 mt-1">{stats?.active || 0} active × RM5</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">About This Tracker</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                This dashboard tracks all XoX SIM cards used for WSAPME. Click <strong>"Sync from Sheet"</strong> to import the latest data from your Google Sheet.
                                View all records to see detailed information including renewal dates, WhatsApp status, and notes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
