import { useEffect, useState } from 'react';
import {
    ChartBarIcon,
    UserGroupIcon,
    FolderIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';

interface StatsData {
    totalPosts: number;
    totalUsers: number;
    totalCategories: number;
    postsByStatus: Array<{ _id: string; count: number }>;
    postsByCategory: Array<{ category: string; count: number }>;
    mostViewedPosts: Array<{ title: string; views: number }>;
    recentPosts: Array<{
        title: string;
        status: string;
        createdAt: string;
        author: { name: string };
    }>;
}

export default function Stats() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <ChartBarIcon className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">Total Posts</h3>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <UserGroupIcon className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <FolderIcon className="h-8 w-8 text-purple-500" />
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">Categories</h3>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts by Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Posts by Status</h3>
                <div className="grid grid-cols-2 gap-4">
                    {stats.postsByStatus.map((status) => (
                        <div
                            key={status._id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <span className="text-gray-600 capitalize">{status._id}</span>
                            <span className="text-lg font-semibold text-gray-900">
                                {status.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Most Viewed Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Most Viewed Posts</h3>
                <div className="space-y-4">
                    {stats.mostViewedPosts.map((post) => (
                        <div
                            key={post.title}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <span className="text-gray-600">{post.title}</span>
                            <div className="flex items-center text-gray-500">
                                <EyeIcon className="h-5 w-5 mr-1" />
                                <span>{post.views}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {stats.recentPosts.map((post) => (
                        <div
                            key={post.title}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <div>
                                <span className="text-gray-900 font-medium">{post.title}</span>
                                <p className="text-sm text-gray-500">
                                    By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${post.status === 'published'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {post.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 