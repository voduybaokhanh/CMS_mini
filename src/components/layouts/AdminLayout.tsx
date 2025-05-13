import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    HomeIcon,
    DocumentTextIcon,
    UserGroupIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

interface AdminLayoutProps {
    children: ReactNode;
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Posts', href: '/admin/posts', icon: DocumentTextIcon },
    { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/auth/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
                        <h1 className="text-xl font-bold text-white">CMS Mini</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = router.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gray-300" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{session?.user?.name}</p>
                                <p className="text-xs text-gray-500">{session?.user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="flex items-center w-full px-4 py-2 mt-4 text-sm text-gray-600 rounded-md hover:bg-gray-50"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                            Sign out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="pl-64">
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
} 