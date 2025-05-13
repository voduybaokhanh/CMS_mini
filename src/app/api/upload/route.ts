import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new NextResponse('No file provided', { status: 400 });
        }

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return new NextResponse('Invalid file type. Allowed types: JPEG, PNG, GIF, WEBP', { status: 400 });
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return new NextResponse('File size too large. Maximum size: 5MB', { status: 400 });
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'cms-mini',
                        allowed_formats: ['jpg', 'png', 'gif', 'webp'],
                        max_bytes: MAX_FILE_SIZE,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    }
                )
                .end(buffer);
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error uploading file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 