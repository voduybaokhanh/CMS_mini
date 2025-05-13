import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const session = await getServerSession();

        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new NextResponse('No file provided', { status: 400 });
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