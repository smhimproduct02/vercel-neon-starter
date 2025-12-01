'use client';

import { useState } from 'react';

interface DailyMetric {
    date: string;
    orders: number;
    revenue: number;
    customers: number;
}

interface DeviceHealth {
    device: string;
    status: 'healthy' | 'warning' | 'critical';
    uptime: number;
    messagesPerDay: number;
    blockRate: number;
}

// Dummy analytics data
const DAILY_METRICS: DailyMetric[] = [
    { date: '2025-11-25', orders: 12, revenue: 1380, customers: 8 },
    { date: '2025-11-26', orders: 15, revenue: 1725, customers: 10 },
    { date: '2025-11-27', orders: 10, revenue: 1150, customers: 7 },
    { date: '2025-11-28', orders: 18, revenue: 2070, customers: 12 },
    { date: '2025-11-29', orders: 14, revenue: 1610, customers: 9 },
    { date: '2025-11-30', orders: 16, revenue: 1840, customers: 11 },
    { date: '2025-12-01', orders: 7, revenue: 659, customers: 5 },
];

const DEVICE_HEALTH: DeviceHealth[] = [
    { device: 'Vigomax-main-1', status: 'warning', uptime: 98.5, messagesPerDay: 145, blockRate: 1.8 },
    { device: 'Vigomax-main-2', status: 'warning', uptime: 99.2, messagesPerDay: 150, blockRate: 1.9 },
    { device: 'HimCoffee-main-1', status: 'healthy', uptime: 99.8, messagesPerDay: 85, blockRate: 0.5 },
    { device: 'HerCoffee-main-1', status: 'critical', uptime: 85.3, messagesPerDay: 45, blockRate: 3.2 },
];

export default function SegmentReportsPage() {
    const [timeRange] = useState('7d');

    const totalRevenue = DAILY_METRICS.reduce((sum, m) => sum + m.revenue, 0);
    const totalOrders = DAILY_METRICS.reduce((sum, m) => sum + m.orders, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const repeatCustomers = DAILY_METRICS.filter(m => m.customers > 8).length;

    const getHealthColor = (status: string) => {
        switch (status) {
            case 'healthy': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400';
            case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const maxRevenue = Math.max(...DAILY_METRICS.map(m => m.revenue));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Reports & Analytics
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                                Last 7 days performance (Demo Mode)
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href="/dashboard/segment/devices"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Back to Segment
                            </a>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                            RM {totalRevenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">↗ 12% vs last week</div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Total Orders</div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{totalOrders}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">↗ 8% vs last week</div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Avg Order Value</div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                            RM {avgOrderValue.toFixed(2)}
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mt-2">↗ 5% vs last week</div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Active Customers</div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">62</div>
                        <div className="text-xs text-orange-600 dark:text-orange-400 mt-2">↗ 15% vs last week</div>
                    </div>
                </div>

                {/* Revenue Trend Chart */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Revenue Trend (7 Days)</h3>
                    <div className="space-y-3">
                        {DAILY_METRICS.map((metric) => (
                            <div key={metric.date} className="flex items-center gap-4">
                                <div className="w-24 text-sm text-slate-600 dark:text-slate-400">
                                    {new Date(metric.date).toLocaleDateString('en-MY', { month: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex-1">
                                    <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-end pr-3"
                                            style={{ width: `${(metric.revenue / maxRevenue) * 100}%` }}
                                        >
                                            <span className="text-xs font-semibold text-white">RM {metric.revenue}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-20 text-sm text-slate-600 dark:text-slate-400 text-right">
                                    {metric.orders} orders
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Device Health & Customer Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Device Health */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Device Health Monitor</h3>
                        <div className="space-y-4">
                            {DEVICE_HEALTH.map((device) => (
                                <div key={device.device} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-medium text-slate-900 dark:text-white">{device.device}</div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getHealthColor(device.status)}`}>
                                            {device.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 text-sm">
                                        <div>
                                            <div className="text-slate-500 dark:text-slate-400 text-xs">Uptime</div>
                                            <div className="font-semibold text-slate-900 dark:text-white">{device.uptime}%</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 dark:text-slate-400 text-xs">Msg/Day</div>
                                            <div className="font-semibold text-slate-900 dark:text-white">{device.messagesPerDay}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 dark:text-slate-400 text-xs">Block Rate</div>
                                            <div className={`font-semibold ${device.blockRate > 2 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                                {device.blockRate}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Segmentation */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Customer Breakdown</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-white">New Customers (A1)</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">First-time buyers</div>
                                </div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">18</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-white">Repeat Orders (A2)</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Returning customers</div>
                                </div>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">35</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-white">Cross-sell (B1)</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Additional products</div>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-white">Hot Leads (C1)</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">High intent prospects</div>
                                </div>
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">9</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
