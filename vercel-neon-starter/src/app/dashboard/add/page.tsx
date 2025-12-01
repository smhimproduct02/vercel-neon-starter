'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createDeviceRecord } from '@/app/actions';

// Mock data for auto-fill logic
const OWNER_COMPANY_MAP: Record<string, string> = {
    'AISYAH': 'WEROCA',
    'FATHIN': 'WEROCA',
    'SYAMIRA': 'WEROCA',
    'AISYAH HW': 'HIM WELLNESS',
    'PINUK': 'HIM WELLNESS',
    'ADILAH': 'HIM WELLNESS',
    'NAZIRA': 'HIM WELLNESS',
};

const PRODUCTS = ['VIGOMAX', 'HIMCOFFEE', 'SPRAY UP'];
const STATUSES = ['PAIRED', 'BANNED', 'PERMANENT BAN'];

export default function AddRecordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        owner: '',
        phone: '',
        company: '',
        slaveId: '',
        deviceId: '',
        totalDatabased: '',
        product: 'VIGOMAX',
        status: 'PAIRED',
        notes: ''
    });

    // Auto-fill company when owner changes
    useEffect(() => {
        if (formData.owner && OWNER_COMPANY_MAP[formData.owner.toUpperCase()]) {
            setFormData(prev => ({
                ...prev,
                company: OWNER_COMPANY_MAP[formData.owner.toUpperCase()]
            }));
        }
    }, [formData.owner]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            form.append(key, value);
        });

        const result = await createDeviceRecord(form);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Failed to create record');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Key In New Record
                    </h1>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Owner */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Owner</label>
                            <input
                                type="text"
                                name="owner"
                                value={formData.owner}
                                onChange={handleChange}
                                list="owners"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                                placeholder="Enter or select owner"
                            />
                            <datalist id="owners">
                                {Object.keys(OWNER_COMPANY_MAP).map(owner => (
                                    <option key={owner} value={owner} />
                                ))}
                            </datalist>
                        </div>

                        {/* Company (Auto-filled) */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">No Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                                placeholder="e.g. 6011..."
                            />
                        </div>

                        {/* Slave ID */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Slave ID</label>
                            <input
                                type="text"
                                name="slaveId"
                                value={formData.slaveId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                                placeholder="Unique ID"
                            />
                        </div>

                        {/* Device ID */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Device ID</label>
                            <input
                                type="text"
                                name="deviceId"
                                value={formData.deviceId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Total Databased */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Databased</label>
                            <input
                                type="number"
                                name="totalDatabased"
                                value={formData.totalDatabased}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Product */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product</label>
                            <select
                                name="product"
                                value={formData.product}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            >
                                {PRODUCTS.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            >
                                {STATUSES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Saving...' : 'Save Record'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
