import mongoose from 'mongoose';
import { IUser } from './User';

export interface IPost extends mongoose.Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    author: IUser['_id'];
    status: 'draft' | 'published';
    seoTitle: string;
    seoDescription: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
            maxlength: 200,
        },
        featuredImage: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        seoTitle: {
            type: String,
            required: true,
        },
        seoDescription: {
            type: String,
            required: true,
            maxlength: 160,
        },
        tags: [{
            type: String,
            trim: true,
        }],
    },
    {
        timestamps: true,
    }
);

// Create slug from title before saving
postSchema.pre('save', function (next) {
    if (!this.isModified('title')) return next();

    this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    next();
});

// Create indexes
postSchema.index({ slug: 1 });
postSchema.index({ author: 1 });
postSchema.index({ status: 1 });

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export default Post; 