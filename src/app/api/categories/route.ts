import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
}, {
    timestamps: true,
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export async function GET() {
    try {
        await connectToDatabase();
        const categories = await Category.find()
            .populate('parent', 'name')
            .sort({ name: 1 });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
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
        const { name, description, parent } = body;

        // Validate required fields
        if (!name || !description) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        // Validate name length
        if (name.length < 2 || name.length > 50) {
            return new NextResponse('Name must be between 2 and 50 characters', { status: 400 });
        }

        // Validate description length
        if (description.length < 10 || description.length > 500) {
            return new NextResponse('Description must be between 10 and 500 characters', { status: 400 });
        }

        await connectToDatabase();

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return new NextResponse('Category already exists', { status: 400 });
        }

        // Validate parent category if provided
        if (parent) {
            const parentCategory = await Category.findById(parent);
            if (!parentCategory) {
                return new NextResponse('Parent category not found', { status: 400 });
            }
        }

        const category = await Category.create({
            name,
            description,
            parent: parent || null,
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 