import React from 'react';

interface RiskAlertProps {
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
}

export function RiskAlert({ title, description, severity }: RiskAlertProps) {
    const styles = {
        high: {
            bg: 'bg-red-50 dark:bg-red-900/20',
            border: 'border-red-200 dark:border-red-800',
            text: 'text-red-800 dark:text-red-200',
            icon: 'text-red-600 dark:text-red-400'
        },
        medium: {
            bg: 'bg-orange-50 dark:bg-orange-900/20',
            border: 'border-orange-200 dark:border-orange-800',
            text: 'text-orange-800 dark:text-orange-200',
            icon: 'text-orange-600 dark:text-orange-400'
        },
        low: {
            bg: 'bg-yellow-50 dark:bg-yellow-900/20',
            border: 'border-yellow-200 dark:border-yellow-800',
            text: 'text-yellow-800 dark:text-yellow-200',
            icon: 'text-yellow-600 dark:text-yellow-400'
        }
    };

    const style = styles[severity];

    return (
        <div className={`${style.bg} border ${style.border} rounded-xl p-4 flex items-start gap-3`}>
            <div className={`mt-0.5 ${style.icon}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <div>
                <h4 className={`font-semibold text-sm ${style.text}`}>{title}</h4>
                <p className={`text-sm mt-1 opacity-90 ${style.text}`}>{description}</p>
            </div>
        </div>
    );
}
