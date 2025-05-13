# CMS Mini

A modern, lightweight Content Management System built with Next.js 14, TypeScript, MongoDB, and Tailwind CSS.

## Features

- 🔐 Authentication with NextAuth.js
- 📝 Rich text editor with React Quill
- 🖼️ Image upload with Cloudinary
- 📱 Responsive design with Tailwind CSS
- 🔒 Role-based access control
- 📊 Dashboard with statistics
- 📄 Blog post management
- 📑 Category management
- 👥 User management
- 🔍 SEO friendly

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Rich Text Editor:** React Quill
- **Image Upload:** Cloudinary
- **State Management:** SWR
- **Icons:** Heroicons

## Prerequisites

- Node.js 18.x or later
- MongoDB
- Cloudinary account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cms-mini.git
cd cms-mini
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── admin/          # Admin pages
├── components/         # React components
├── config/            # Configuration files
├── constants/         # Constants and enums
├── lib/              # Utility libraries
├── models/           # MongoDB models
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Default Users

After first run, create an admin user with the following credentials:

- Email: admin@example.com
- Password: admin123

## API Routes

- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signup` - Sign up
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a post
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create a user (admin only)
- `POST /api/upload` - Upload an image

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue in the GitHub repository.
