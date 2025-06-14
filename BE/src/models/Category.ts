import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
    name: string;
    slug: string;
    description: string;
    parent?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a category name'],
            trim: true,
            maxlength: [50, 'Category name cannot be more than 50 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            maxlength: [200, 'Description cannot be more than 200 characters'],
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Create index for search
categorySchema.index({ name: 'text', description: 'text' });

// Pre-save middleware to generate slug
categorySchema.pre('save', function (next) {
    if (!this.isModified('name')) return next();

    this.slug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    next();
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema); 