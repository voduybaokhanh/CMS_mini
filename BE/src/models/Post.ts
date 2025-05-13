import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    author: mongoose.Types.ObjectId;
    categories: mongoose.Types.ObjectId[];
    status: 'draft' | 'published';
    views: number;
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Please provide content'],
        },
        excerpt: {
            type: String,
            required: [true, 'Please provide an excerpt'],
            maxlength: [200, 'Excerpt cannot be more than 200 characters'],
        },
        featuredImage: {
            type: String,
            default: '',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        }],
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        views: {
            type: Number,
            default: 0,
        },
        seo: {
            title: String,
            description: String,
            keywords: [String],
        },
    },
    {
        timestamps: true,
    }
);

// Create index for search
postSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

// Pre-save middleware to generate slug
postSchema.pre('save', function (next) {
    if (!this.isModified('title')) return next();

    this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    next();
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', postSchema); 