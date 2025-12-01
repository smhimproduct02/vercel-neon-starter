'use client';

import { useState } from 'react';

interface Device {
    id: string;
    deviceName: string;
    product: string;
    role: 'main' | 'backup';
    status: 'online' | 'offline' | 'unknown';
    assignedCount: number;
    lastSeen: string | null;
}

// Dummy data for initial testing
const DUMMY_DEVICES: Device[] = [
    { id: '1', deviceName: 'Vigomax-main-1', product: 'Vigomax', role: 'main', status: 'online', assignedCount: 2850, lastSeen: '2025-12-01T14:30:00Z' },
    { id: '2', deviceName: 'Vigomax-main-2', product: 'Vigomax', role: 'main', status: 'online', assignedCount: 2940, lastSeen: '2025-12-01T14:28:00Z' },
    { id: '3', deviceName: 'Vigomax-backup-1', product: 'Vigomax', role: 'backup', status: 'online', assignedCount: 0, lastSeen: '2025-12-01T14:25:00Z' },
    { id: '4', deviceName: 'HimCoffee-main-1', product: 'Him Coffee', role: 'main', status: 'online', assignedCount: 1200, lastSeen: '2025-12-01T14:32:00Z' },
    { id: '5', deviceName: 'HimCoffee-backup-1', product: 'Him Coffee', role: 'backup', status: 'unknown', assignedCount: 0, lastSeen: null },
    { id: '6', deviceName: 'HerCoffee-main-1', product: 'Her Coffee', role: 'main', status: 'offline', assignedCount: 890, lastSeen: '2025-12-01T12:00:00Z' },
];

export default function SegmentDevicesPage() {
    const [devices] = useState<Device[]>(DUMMY_DEVICES);
    const [filter, setFilter] = useState<string>('all');

    const filteredDevices = devices.filter(d => {
        if (filter === 'all') return true;
        return d.product === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400';
            case 'offline': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
            default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getRoleColor = (role: string) => {
        return role === 'main' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' : 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
    };

    const formatLastSeen = (lastSeen: string | null) => {
        if (!lastSeen) return 'Never';
        const date = new Date(lastSeen);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    const products = Array.from(new Set(devices.map(d => d.product)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                Device Management
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                                Monitor and manage WhatsApp devices (Demo Mode)
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Products</option>
                                {products.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            <a
                                href="/dashboard/segment/customers"
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Customers
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700/30">
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Online</div>
                            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">
                                {devices.filter(d => d.status === 'online').length}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                            <div className="text-red-600 dark:text-red-400 text-sm font-medium">Offline</div>
                            <div className="text-2xl font-bold text-red-900 dark:text-red-100 mt-1">
                                {devices.filter(d => d.status === 'offline').length}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700/30">
                            <div className="text-purple-600 dark:text-purple-400 text-sm font-medium">Total Assigned</div>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                                {devices.reduce((sum, d) => sum + d.assignedCount, 0).toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/30">
                            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Avg Load</div>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                                {Math.round(devices.reduce((sum, d) => sum + d.assignedCount, 0) / devices.length)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Devices Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDevices.map((device) => (
                        <div
                            key={device.id}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {device.deviceName}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        {device.product}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(device.status)}`}>
                                        {device.status}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(device.role)}`}>
                                        {device.role}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
                                    <span>Assigned Contacts</span>
                                    <span className="font-semibold">{device.assignedCount} / 3000</span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${device.assignedCount > 2500 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                                            device.assignedCount > 2000 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                                'bg-gradient-to-r from-emerald-500 to-green-500'
                                            }`}
                                        style={{ width: `${(device.assignedCount / 3000) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Last Seen */}
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Last seen: {formatLastSeen(device.lastSeen)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
