export const ROLES = {
    ADMIN: 'admin',
    EDITOR: 'editor',
} as const;

export const POST_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
} as const;

export const UPLOAD = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const;

export const PAGINATION = {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50,
} as const;

export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    ADMIN: '/admin',
    AUTH: {
        SIGNIN: '/auth/signin',
        SIGNUP: '/auth/signup',
        ERROR: '/auth/error',
    },
    POSTS: {
        LIST: '/posts',
        CREATE: '/posts/create',
        EDIT: '/posts/edit',
    },
    CATEGORIES: {
        LIST: '/categories',
        CREATE: '/categories/create',
        EDIT: '/categories/edit',
    },
    USERS: {
        LIST: '/users',
        CREATE: '/users/create',
        EDIT: '/users/edit',
    },
} as const; 