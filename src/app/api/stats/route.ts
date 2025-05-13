import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import Category from '@/models/Category';
import { config } from '@/config';

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session || session.user?.role !== config.roles.admin) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectDB();

        // Get total counts
        const [totalPosts, totalUsers, totalCategories] = await Promise.all([
            Post.countDocuments(),
            User.countDocuments(),
            Category.countDocuments(),
        ]);

        // Get posts by status
        const postsByStatus = await Post.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Get posts by category
        const postsByCategory = await Post.aggregate([
            { $unwind: '$categories' },
            {
                $group: {
                    _id: '$categories',
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            { $unwind: '$category' },
            {
                $project: {
                    _id: 0,
                    category: '$category.name',
                    count: 1,
                },
            },
        ]);

        // Get most viewed posts
        const mostViewedPosts = await Post.find()
            .sort({ views: -1 })
            .limit(5)
            .select('title views')
            .lean();

        // Get recent activity
        const recentPosts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title status createdAt')
            .populate('author', 'name')
            .lean();

        return NextResponse.json({
            totalPosts,
            totalUsers,
            totalCategories,
            postsByStatus,
            postsByCategory,
            mostViewedPosts,
            recentPosts,
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 