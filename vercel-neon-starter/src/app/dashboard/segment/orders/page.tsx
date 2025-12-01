'use client';

import { useState } from 'react';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    product: string;
    bizappCode: string;
    amount: number;
    status: 'new' | 'processing' | 'completed' | 'cancelled';
    device: string;
    createdAt: string;
    notes?: string;
}

// Dummy order data
const DUMMY_ORDERS: Order[] = [
    { id: '1', orderNumber: 'ORD-2025-001', customerName: 'Ahmad bin Abdullah', customerPhone: '+60123456789', product: 'Vigomax', bizappCode: 'A2', amount: 128.00, status: 'completed', device: 'Vigomax-main-1', createdAt: '2025-12-01T10:30:00Z' },
    { id: '2', orderNumber: 'ORD-2025-002', customerName: 'Lee Chong Wei', customerPhone: '+60187654321', product: 'Vigomax', bizappCode: 'A2', amount: 128.00, status: 'completed', device: 'Vigomax-main-2', createdAt: '2025-12-01T09:15:00Z' },
    { id: '3', orderNumber: 'ORD-2025-003', customerName: 'Kumar Subramaniam', customerPhone: '+60176543210', product: 'Him Coffee', bizappCode: 'P1', amount: 95.00, status: 'processing', device: 'HimCoffee-main-1', createdAt: '2025-12-01T08:45:00Z', notes: 'Promo code applied' },
    { id: '4', orderNumber: 'ORD-2025-004', customerName: 'Wong Mei Ling', customerPhone: '+60154321098', product: 'Vigomax', bizappCode: 'B1', amount: 128.00, status: 'new', device: 'Vigomax-main-1', createdAt: '2025-12-01T14:20:00Z' },
    { id: '5', orderNumber: 'ORD-2025-005', customerName: 'Rajesh Kumar', customerPhone: '+60143210987', product: 'Him Coffee', bizappCode: 'A2', amount: 118.00, status: 'completed', device: 'HimCoffee-main-1', createdAt: '2025-11-30T16:30:00Z' },
    { id: '6', orderNumber: 'ORD-2025-006', customerName: 'Siti Nurhaliza', customerPhone: '+60198765432', product: 'Her Coffee', bizappCode: 'A1', amount: 95.00, status: 'completed', device: 'HerCoffee-main-1', createdAt: '2025-11-30T11:00:00Z' },
    { id: '7', orderNumber: 'ORD-2025-007', customerName: 'Fatimah Zahra', customerPhone: '+60165432109', product: 'Her Coffee', bizappCode: 'C1', amount: 95.00, status: 'cancelled', device: 'HerCoffee-main-1', createdAt: '2025-11-29T13:15:00Z', notes: 'Customer changed mind' },
];

const BIZAPP_CODES = {
    'A1': { label: 'New Customer', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
    'A2': { label: 'Repeat Order', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' },
    'B1': { label: 'Cross-sell', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
    'C1': { label: 'Hot Lead', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' },
    'P1': { label: 'Promo Paid', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' },
};

export default function SegmentOrdersPage() {
    const [orders] = useState<Order[]>(DUMMY_ORDERS);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCode, setFilterCode] = useState('all');

    const filteredOrders = orders.filter(o => {
        const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
        const matchesCode = filterCode === 'all' || o.bizappCode === filterCode;
        return matchesStatus && matchesCode;
    });

    const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.status === 'completed' ? o.amount : 0), 0);
    const completedOrders = filteredOrders.filter(o => o.status === 'completed').length;
    const repeatOrders = filteredOrders.filter(o => o.bizappCode === 'A2').length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400';
            case 'processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
            case 'new': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-MY', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                                Order Tracking
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                                {filteredOrders.length} orders (Demo Mode)
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
                                Devices
                            </a>
                            <a
                                href="/dashboard/segment/customers"
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Customers
                            </a>
                            <a
                                href="/dashboard/segment/reports"
                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Reports
                            </a>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Statuses</option>
                            <option value="new">New</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <select
                            value={filterCode}
                            onChange={(e) => setFilterCode(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Codes</option>
                            {Object.keys(BIZAPP_CODES).map(code => (
                                <option key={code} value={code}>{code}</option>
                            ))}
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700/30">
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Total Revenue</div>
                            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">
                                RM {totalRevenue.toFixed(2)}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/30">
                            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Completed</div>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">{completedOrders}</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700/30">
                            <div className="text-purple-600 dark:text-purple-400 text-sm font-medium">Repeat Orders</div>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">{repeatOrders}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700/30">
                            <div className="text-orange-600 dark:text-orange-400 text-sm font-medium">Avg Order Value</div>
                            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-1">
                                RM {completedOrders > 0 ? (totalRevenue / completedOrders).toFixed(2) : '0.00'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Order #</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Device</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-sm font-medium text-slate-900 dark:text-white">{order.orderNumber}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900 dark:text-white">{order.customerName}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{order.customerPhone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                                                {order.product}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${BIZAPP_CODES[order.bizappCode as keyof typeof BIZAPP_CODES]?.color || 'bg-gray-100 text-gray-700'}`}>
                                                {order.bizappCode}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900 dark:text-white">RM {order.amount.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600 dark:text-slate-400">{order.device}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600 dark:text-slate-400">{formatDate(order.createdAt)}</div>
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
