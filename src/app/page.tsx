import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Welcome to CMS Mini
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        A modern, lightweight Content Management System
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex">
                            <Link
                                href="/auth/signin"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 