'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPhoneTopUp, updatePhoneTopUp, PhoneTopUpData } from '@/app/phone-topup-actions';

interface PhoneTopUpFormProps {
    initialData?: PhoneTopUpData & { id: string };
    isEdit?: boolean;
}

export default function PhoneTopUpForm({ initialData, isEdit = false }: PhoneTopUpFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<PhoneTopUpData>({
        phoneNumber: initialData?.phoneNumber || '',
        simCardId: initialData?.simCardId || null,
        name: initialData?.name || '',
        status: initialData?.status || 'Active',
        wsStatus: initialData?.wsStatus || '',
        topUpAmount: initialData?.topUpAmount || 'RM5.00',
        topUpDate: initialData?.topUpDate ? new Date(initialData.topUpDate) : null,
        renewalDate: initialData?.renewalDate ? new Date(initialData.renewalDate) : null,
        price: initialData?.price || 'RM 5.00',
        notes: initialData?.notes || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'simCardId' ? (value ? parseInt(value) : null) : value
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value ? new Date(value) : null
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let result;
            if (isEdit && initialData?.id) {
                result = await updatePhoneTopUp(initialData.id, formData);
            } else {
                result = await createPhoneTopUp(formData);
            }

            if (result.success) {
                router.push('/dashboard/segment/phone-topups/list');
                router.refresh();
            } else {
                setError(result.error || 'Something went wrong');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDateForInput = (date: Date | null | undefined) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g. 011-12345678"
                    />
                </div>

                {/* SIM Card ID */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SIM Card ID</label>
                    <input
                        type="number"
                        name="simCardId"
                        value={formData.simCardId || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g. 101"
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="Owner Name"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Terminated">Terminated</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>

                {/* WS Status */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">WhatsApp Status</label>
                    <select
                        name="wsStatus"
                        value={formData.wsStatus || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Banned">Banned</option>
                        <option value="Permanent Banned">Permanent Banned</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g. RM 5.00"
                    />
                </div>

                {/* TopUp Date */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last TopUp Date</label>
                    <input
                        type="date"
                        name="topUpDate"
                        value={formatDateForInput(formData.topUpDate)}
                        onChange={handleDateChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Renewal Date */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Renewal Date</label>
                    <input
                        type="date"
                        name="renewalDate"
                        value={formatDateForInput(formData.renewalDate)}
                        onChange={handleDateChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="Additional notes..."
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                    {isLoading && (
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    )}
                    {isEdit ? 'Update Record' : 'Create Record'}
                </button>
            </div>
        </form>
    );
}
