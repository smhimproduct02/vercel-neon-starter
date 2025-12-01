'use client';

import { useState } from 'react';

interface Customer {
    id: string;
    name: string;
    phone: string;
    product: string;
    code: string;
    lastOrderDate: string | null;
    engagementScore: number;
    assignedDevice: string | null;
}

// Dummy customer data
const DUMMY_CUSTOMERS: Customer[] = [
    { id: '1', name: 'Ahmad bin Abdullah', phone: '+60123456789', product: 'Vigomax', code: 'A2', lastOrderDate: '2025-11-28', engagementScore: 85, assignedDevice: 'Vigomax-main-1' },
    { id: '2', name: 'Siti Nurhaliza', phone: '+60198765432', product: 'Her Coffee', code: 'A1', lastOrderDate: null, engagementScore: 45, assignedDevice: 'HerCoffee-main-1' },
    { id: '3', name: 'Lee Chong Wei', phone: '+60187654321', product: 'Vigomax', code: 'A2', lastOrderDate: '2025-12-01', engagementScore: 92, assignedDevice: 'Vigomax-main-2' },
    { id: '4', name: 'Kumar Subramaniam', phone: '+60176543210', product: 'Him Coffee', code: 'P1', lastOrderDate: '2025-11-25', engagementScore: 68, assignedDevice: 'HimCoffee-main-1' },
    { id: '5', name: 'Fatimah Zahra', phone: '+60165432109', product: 'Her Coffee', code: 'C1', lastOrderDate: null, engagementScore: 78, assignedDevice: 'HerCoffee-main-1' },
    { id: '6', name: 'Wong Mei Ling', phone: '+60154321098', product: 'Vigomax', code: 'B1', lastOrderDate: '2025-11-30', engagementScore: 55, assignedDevice: 'Vigomax-main-1' },
    { id: '7', name: 'Rajesh Kumar', phone: '+60143210987', product: 'Him Coffee', code: 'A2', lastOrderDate: '2025-11-29', engagementScore: 88, assignedDevice: 'HimCoffee-main-1' },
    { id: '8', name: 'Nurul Ain', phone: '+60132109876', product: 'Her Coffee', code: 'C2', lastOrderDate: null, engagementScore: 22, assignedDevice: null },
];

const BIZAPP_CODES = {
    'A1': { label: 'New Customer', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
    'A2': { label: 'Repeat Order', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' },
    'B1': { label: 'Cross-sell', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
    'C1': { label: 'Hot Lead', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' },
    'C2': { label: 'Cold Lead', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' },
    'P1': { label: 'Promo Paid', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' },
};

export default function SegmentCustomersPage() {
    const [customers] = useState<Customer[]>(DUMMY_CUSTOMERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterProduct, setFilterProduct] = useState('all');
    const [filterCode, setFilterCode] = useState('all');

    const filteredCustomers = customers.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm);
        const matchesProduct = filterProduct === 'all' || c.product === filterProduct;
        const matchesCode = filterCode === 'all' || c.code === filterCode;
        return matchesSearch && matchesProduct && matchesCode;
    });

    const getEngagementColor = (score: number) => {
        if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
        if (score >= 60) return 'text-blue-600 dark:text-blue-400';
        if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const products = Array.from(new Set(customers.map(c => c.product)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Customer Management
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                                {filteredCustomers.length} customers (Demo Mode)
                            </p>
                        </div>
                        <a
                            href="/dashboard/segment/orders"
                            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Orders
                        </a>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pl-10 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <select
                            value={filterProduct}
                            onChange={(e) => setFilterProduct(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Products</option>
                            {products.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        <select
                            value={filterCode}
                            onChange={(e) => setFilterCode(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Codes</option>
                            {Object.keys(BIZAPP_CODES).map(code => (
                                <option key={code} value={code}>{code}</option>
                            ))}
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700/30">
                            <div className="text-purple-600 dark:text-purple-400 text-sm font-medium">Total Customers</div>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">{filteredCustomers.length}</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700/30">
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Repeat Orders</div>
                            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">
                                {filteredCustomers.filter(c => c.code === 'A2').length}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/30">
                            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Avg Engagement</div>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                                {Math.round(filteredCustomers.reduce((sum, c) => sum + c.engagementScore, 0) / filteredCustomers.length)}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-4 border border-pink-200 dark:border-pink-700/30">
                            <div className="text-pink-600 dark:text-pink-400 text-sm font-medium">Assigned</div>
                            <div className="text-2xl font-bold text-pink-900 dark:text-pink-100 mt-1">
                                {filteredCustomers.filter(c => c.assignedDevice).length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Table */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Engagement</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Last Order</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Device</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900 dark:text-white">{customer.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-mono text-slate-600 dark:text-slate-400">{customer.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                                                {customer.product}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${BIZAPP_CODES[customer.code as keyof typeof BIZAPP_CODES]?.color || 'bg-gray-100 text-gray-700'}`}>
                                                {customer.code} - {BIZAPP_CODES[customer.code as keyof typeof BIZAPP_CODES]?.label || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${customer.engagementScore >= 80 ? 'from-emerald-500 to-green-500' :
                                                            customer.engagementScore >= 60 ? 'from-blue-500 to-cyan-500' :
                                                                customer.engagementScore >= 40 ? 'from-yellow-500 to-orange-500' :
                                                                    'from-red-500 to-pink-500'
                                                            }`}
                                                        style={{ width: `${customer.engagementScore}%` }}
                                                    />
                                                </div>
                                                <span className={`text-sm font-semibold ${getEngagementColor(customer.engagementScore)}`}>
                                                    {customer.engagementScore}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'Never'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {customer.assignedDevice ? (
                                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400">
                                                    {customer.assignedDevice}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-slate-400 dark:text-slate-500">Not assigned</span>
                                            )}
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
