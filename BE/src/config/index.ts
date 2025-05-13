export const config = {
    site: {
        name: 'CMS Mini',
        description: 'A mini Content Management System',
        url: process.env.SITE_URL || 'http://localhost:3000',
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
        jwtExpiresIn: '7d',
    },
    roles: {
        admin: 'admin',
        editor: 'editor',
    },
    post: {
        status: {
            draft: 'draft',
            published: 'published',
        },
        defaultStatus: 'draft',
    },
    upload: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
        cloudinary: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
            folder: 'cms-mini',
        },
    },
} as const; 