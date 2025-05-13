import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/Post';
import { config } from '@/config';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, featuredImage, status } = body;

    // Validate required fields
    if (!title || !content) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Validate title length
    if (title.length < 3 || title.length > 100) {
      return new NextResponse('Title must be between 3 and 100 characters', { status: 400 });
    }

    // Validate content length
    if (content.length < 10) {
      return new NextResponse('Content must be at least 10 characters', { status: 400 });
    }

    // Validate status
    if (status && !['draft', 'published'].includes(status)) {
      return new NextResponse('Invalid status', { status: 400 });
    }

    await connectToDatabase();

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if post with same slug exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return new NextResponse('A post with this title already exists', { status: 400 });
    }

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 160),
      featuredImage,
      status: status || 'draft',
      author: session.user?.id,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 