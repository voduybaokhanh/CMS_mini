import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { Post } from '@/models/Post';
import { connectDB } from '@/lib/db';
import { UserRole } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    switch (req.method) {
        case 'GET':
            try {
                const { page = 1, limit = 10, status, search } = req.query;
                const query: any = {};

                if (status) query.status = status;
                if (search) {
                    query.$or = [
                        { title: { $regex: search, $options: 'i' } },
                        { content: { $regex: search, $options: 'i' } }
                    ];
                }

                const posts = await Post.find(query)
                    .populate('author', 'name email')
                    .sort({ createdAt: -1 })
                    .skip((Number(page) - 1) * Number(limit))
                    .limit(Number(limit));

                const total = await Post.countDocuments(query);

                return res.status(200).json({
                    posts,
                    totalPages: Math.ceil(total / Number(limit)),
                    currentPage: Number(page)
                });
            } catch (error) {
                return res.status(500).json({ message: 'Error fetching posts' });
            }

        case 'POST':
            if (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.EDITOR) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            try {
                const post = await Post.create({
                    ...req.body,
                    author: session.user.id
                });
                return res.status(201).json(post);
            } catch (error) {
                return res.status(500).json({ message: 'Error creating post' });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
} 