import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor'
}

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    isActive: boolean;
    lastLogin: Date;
    updateLastLogin(): Promise<void>;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.EDITOR,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Update last login
userSchema.methods.updateLastLogin = async function (): Promise<void> {
    this.lastLogin = new Date();
    await this.save();
};

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; 