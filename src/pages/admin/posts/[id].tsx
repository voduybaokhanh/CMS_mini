import { useRouter } from 'next/router';
import AdminLayout from '@/components/layouts/AdminLayout';
import PostForm from '@/components/posts/PostForm';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function EditPostPage() {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'new';

    const { data: post, error } = useSWR(
        isNew ? null : `/api/posts/${id}`,
        fetcher
    );

    const handleSubmit = async (formData: any) => {
        try {
            const response = await fetch(
                isNew ? '/api/posts' : `/api/posts/${id}`,
                {
                    method: isNew ? 'POST' : 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save post');
            }

            router.push('/admin/posts');
        } catch (error) {
            console.error('Error saving post:', error);
            throw error;
        }
    };

    if (!isNew && error) return <div>Failed to load post</div>;
    if (!isNew && !post) return <div>Loading...</div>;

    return (
        <AdminLayout>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {isNew ? 'Create New Post' : 'Edit Post'}
                    </h1>
                </div>
            </div>

            <div className="mt-8">
                <PostForm
                    initialData={!isNew ? post : undefined}
                    onSubmit={handleSubmit}
                />
            </div>
        </AdminLayout>
    );
} 