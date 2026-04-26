"use client";
import { Suspense } from 'react';
import Blog from '@/views/Blog';

export default function BlogClientPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <Blog />
        </Suspense>
    );
}
