import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

interface Params {
    params: {
        slug: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const session = await getServerSession();

        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectDB();
        const post = await Post.findOne({ slug: params.slug });

        if (!post) {
            return new NextResponse('Post not found', { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const session = await getServerSession();

        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const { title, content, excerpt, featuredImage, status } = body;

        if (!title || !content) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        await connectDB();

        const post = await Post.findOne({ slug: params.slug });

        if (!post) {
            return new NextResponse('Post not found', { status: 404 });
        }

        // Only allow admin or the author to update the post
        if (
            session.user?.role !== 'admin' &&
            post.author.toString() !== session.user?.id
        ) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const updatedPost = await Post.findOneAndUpdate(
            { slug: params.slug },
            {
                title,
                slug,
                content,
                excerpt,
                featuredImage,
                status,
            },
            { new: true }
        );

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const session = await getServerSession();

        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectDB();

        const post = await Post.findOne({ slug: params.slug });

        if (!post) {
            return new NextResponse('Post not found', { status: 404 });
        }

        // Only allow admin or the author to delete the post
        if (
            session.user?.role !== 'admin' &&
            post.author.toString() !== session.user?.id
        ) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        await Post.deleteOne({ slug: params.slug });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 