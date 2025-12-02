'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPhoneTopUpById } from '@/app/phone-topup-actions';
import PhoneTopUpForm from '../../components/PhoneTopUpForm';

export default function EditPhoneTopUpPage({ params }: { params: { id: string } }) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getPhoneTopUpById(params.id);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Record not found');
            }
            setIsLoading(false);
        };
        fetchData();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
                    <Link href="/dashboard/segment/phone-topups/list" className="text-purple-600 hover:underline">
                        Back to List
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Link href="/dashboard/segment/phone-topups/list" className="hover:text-purple-600 transition-colors">
                            Records
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 dark:text-white font-medium">Edit</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Edit Phone Record
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Update details for {data.phoneNumber}
                    </p>
                </div>

                <PhoneTopUpForm initialData={data} isEdit={true} />
            </div>
        </div>
    );
}
