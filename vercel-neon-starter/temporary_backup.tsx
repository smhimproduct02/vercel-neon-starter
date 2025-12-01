'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDeviceRecords, deleteDeviceRecord } from '@/app/actions';

interface DeviceRecord {
    id: string;
    owner: string;
    phone: string;
    company: string;
    slaveId: string;
    deviceId: string;
    totalDatabased: number;
    product: string;
    status: string;
    notes: string | null;
}

export default function DashboardPage() {
    const [records, setRecords] = useState<DeviceRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<DeviceRecord | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        setIsLoading(true);
        const { success, data } = await getDeviceRecords();
        if (success && data) {
            setRecords(data);
        }
        setIsLoading(false);
    };

    const handleDeleteClick = (record: DeviceRecord) => {
        setRecordToDelete(record);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!recordToDelete) return;

        setIsDeleting(true);
        const result = await deleteDeviceRecord(recordToDelete.id);

        if (result.success) {
            setRecords(records.filter(r => r.id !== recordToDelete.id));
            setDeleteModalOpen(false);
            setRecordToDelete(null);
        }
        setIsDeleting(false);
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setRecordToDelete(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Device Records
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage your device records and status
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            ← Dashboard
                        </Link>
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Sign Out
                        </Link>
                        <Link
                            href="/dashboard/add"
                            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Key In New
                        </Link>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Owner</th>
                                    <th className="px-6 py-4 font-semibold">No Phone</th>
                                    <th className="px-6 py-4 font-semibold">Company</th>
                                    <th className="px-6 py-4 font-semibold">Slave ID</th>
                                    <th className="px-6 py-4 font-semibold">Device ID</th>
                                    <th className="px-6 py-4 font-semibold">Total DB</th>
                                    <th className="px-6 py-4 font-semibold">Product</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Notes</th>
                                    <th className="px-6 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={10} className="px-6 py-12 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-gray-600 dark:text-gray-400">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : records && records.length > 0 ? (
                                    records.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${record.owner.includes('AISYAH') ? 'bg-pink-100 text-pink-700' :
                                                    record.owner.includes('FATHIN') ? 'bg-purple-100 text-purple-700' :
                                                        record.owner.includes('SYAMIRA') ? 'bg-teal-100 text-teal-700' :
                                                            record.owner.includes('PINUK') ? 'bg-yellow-100 text-yellow-700' :
                                                                record.owner.includes('NAZIRA') ? 'bg-red-100 text-red-700' :
                                                                    'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {record.owner}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{record.phone}</td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{record.company}</td>
                                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-300">{record.slaveId}</td>
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400 max-w-[150px] truncate" title={record.deviceId}>
                                                {record.deviceId}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{record.totalDatabased}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${record.product === 'VIGOMAX' ? 'bg-blue-100 text-blue-700' :
                                                    record.product === 'HIMCOFFEE' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {record.product}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${record.status === 'PAIRED' ? 'bg-green-100 text-green-700' :
                                                    record.status.includes('BAN') ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'PAIRED' ? 'bg-green-500' :
                                                        record.status.includes('BAN') ? 'bg-red-500' :
                                                            'bg-gray-500'
                                                        }`}></span>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs max-w-[200px] truncate">
                                                {record.notes || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/dashboard/edit/${record.id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(record)}
                                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="text-lg font-medium">No records found</p>
                                                <p className="text-sm">Get started by keying in a new record.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-scale-in">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    Delete Record
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Are you sure you want to delete the record for <strong>{recordToDelete?.owner}</strong> (Slave ID: {recordToDelete?.slaveId})? This action cannot be undone.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDeleteCancel}
                                        disabled={isDeleting}
                                        className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteConfirm}
                                        disabled={isDeleting}
                                        className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isDeleting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Deleting...
                                            </>
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
