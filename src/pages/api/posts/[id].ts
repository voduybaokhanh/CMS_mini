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

    const { id } = req.query;
    await connectDB();

    switch (req.method) {
        case 'GET':
            try {
                const post = await Post.findById(id).populate('author', 'name email');
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                return res.status(200).json(post);
            } catch (error) {
                return res.status(500).json({ message: 'Error fetching post' });
            }

        case 'PUT':
            if (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.EDITOR) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            try {
                const post = await Post.findById(id);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }

                // Only admin can change author
                if (req.body.author && session.user.role !== UserRole.ADMIN) {
                    delete req.body.author;
                }

                const updatedPost = await Post.findByIdAndUpdate(
                    id,
                    { ...req.body },
                    { new: true, runValidators: true }
                ).populate('author', 'name email');

                return res.status(200).json(updatedPost);
            } catch (error) {
                return res.status(500).json({ message: 'Error updating post' });
            }

        case 'DELETE':
            if (session.user.role !== UserRole.ADMIN) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            try {
                const post = await Post.findById(id);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }

                await post.deleteOne();
                return res.status(200).json({ message: 'Post deleted successfully' });
            } catch (error) {
                return res.status(500).json({ message: 'Error deleting post' });
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
} 