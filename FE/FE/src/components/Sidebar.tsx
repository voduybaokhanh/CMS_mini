import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
    },
    {
      name: 'Posts',
      href: '/posts',
      icon: DocumentTextIcon,
    },
    ...(isAdmin
      ? [
          {
            name: 'Users',
            href: '/users',
            icon: UserGroupIcon,
          },
          {
            name: 'Settings',
            href: '/settings',
            icon: CogIcon,
          },
        ]
      : []),
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
} 