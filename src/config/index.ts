export const config = {
  site: {
    name: 'CMS Mini',
    description: 'A mini Content Management System',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  auth: {
    providers: ['credentials'],
    pages: {
      signIn: '/auth/signin',
    },
    jwtSecret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
    jwtExpiresIn: '24h',
  },
  api: {
    baseUrl: '/api',
    endpoints: {
      posts: '/posts',
      users: '/users',
      categories: '/categories',
      upload: '/upload',
      stats: '/stats',
    },
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
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    cloudinary: {
      folder: 'cms-mini',
    },
  },
  seo: {
    defaultTitle: 'CMS Mini - Content Management System',
    defaultDescription: 'A powerful and easy-to-use content management system',
    defaultImage: '/images/og-image.jpg',
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 50,
  },
} as const; 