import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface PostPreviewProps {
    title: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    categories: Array<{ name: string }>;
    author: { name: string };
    createdAt: string;
}

export default function PostPreview({
    title,
    content,
    excerpt,
    featuredImage,
    categories,
    author,
    createdAt,
}: PostPreviewProps) {
    const [isPreview, setIsPreview] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {isPreview ? 'Edit' : 'Preview'}
                    </button>
                </div>
            </div>

            {isPreview ? (
                <div className="p-6">
                    {featuredImage && (
                        <img
                            src={featuredImage}
                            alt={title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                    )}
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                    <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center text-sm text-gray-500">
                            <span>By {author.name}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(createdAt).toLocaleDateString()}</span>
                        </div>
                        {categories.length > 0 && (
                            <div className="mt-2">
                                <span className="text-sm text-gray-500">Categories: </span>
                                {categories.map((category, index) => (
                                    <span
                                        key={category.name}
                                        className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt
                        </label>
                        <p className="text-gray-600">{excerpt}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <ReactQuill
                            value={content}
                            readOnly
                            theme="snow"
                            className="h-64 mb-12"
                        />
                    </div>
                </div>
            )}
        </div>
    );
} 