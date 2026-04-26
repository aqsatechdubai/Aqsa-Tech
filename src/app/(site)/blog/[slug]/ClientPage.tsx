"use client";
import { Suspense } from 'react';

import BlogDetail from '@/views/BlogDetail';

export default function BlogDetailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <BlogDetail />
        </Suspense>
    );
}
