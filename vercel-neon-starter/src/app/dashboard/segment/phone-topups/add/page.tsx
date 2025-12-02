'use client';

import Link from 'next/link';
import PhoneTopUpForm from '../components/PhoneTopUpForm';

export default function AddPhoneTopUpPage() {
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
                        <span className="text-slate-900 dark:text-white font-medium">Add New</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Add New Phone Record
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Create a new tracking record for a SIM card.
                    </p>
                </div>

                <PhoneTopUpForm />
            </div>
        </div>
    );
}
