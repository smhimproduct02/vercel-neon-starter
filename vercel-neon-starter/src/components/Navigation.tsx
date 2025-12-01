'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'CRM Implementation', path: '/crm-implementation/dashboard', icon: '📋' },
        { name: 'Devices', path: '/dashboard/segment/devices', icon: '📱' },
        { name: 'Phone TopUps', path: '/dashboard/segment/phone-topups', icon: '📞' },
        { name: 'Customers', path: '/dashboard/segment/customers', icon: '👥' },
        { name: 'Orders', path: '/dashboard/segment/orders', icon: '🛒' },
        { name: 'Reports', path: '/dashboard/segment/reports', icon: '📊' },
        { name: 'Records', path: '/dashboard/records', icon: '📄' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-lg">H</span>
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white">CRM Himwellness</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Management System</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => {
                                const menu = document.getElementById('mobile-menu');
                                menu?.classList.toggle('hidden');
                            }}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div id="mobile-menu" className="hidden lg:hidden pb-4">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                onClick={() => {
                                    const menu = document.getElementById('mobile-menu');
                                    menu?.classList.add('hidden');
                                }}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
