import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export function StatCard({ title, value, subtext, icon, trend, trendValue, color = 'blue' }: StatCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
        red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };

    return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</h3>
                    {subtext && <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">{subtext}</p>}
                </div>
                {icon && (
                    <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                        {icon}
                    </div>
                )}
            </div>
            {trend && trendValue && (
                <div className={`mt-4 flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                        trend === 'down' ? 'text-red-600 dark:text-red-400' :
                            'text-slate-600 dark:text-slate-400'
                    }`}>
                    {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
                </div>
            )}
        </div>
    );
}
