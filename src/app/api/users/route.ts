import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { config } from '@/config';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== config.roles.admin) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectToDatabase();
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== config.roles.admin) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const { name, email, password, role } = body;

        // Validate required fields
        if (!name || !email || !password) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        // Validate email format
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return new NextResponse('Invalid email format', { status: 400 });
        }

        // Validate password length
        if (password.length < 6) {
            return new NextResponse('Password must be at least 6 characters', { status: 400 });
        }

        // Validate role
        if (role && !['admin', 'editor'].includes(role)) {
            return new NextResponse('Invalid role', { status: 400 });
        }

        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse('User already exists', { status: 400 });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || config.roles.editor,
        });

        const { password: _, ...userWithoutPassword } = user.toObject();

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 