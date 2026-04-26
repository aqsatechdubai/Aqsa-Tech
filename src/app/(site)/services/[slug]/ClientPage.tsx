"use client";
import { Suspense } from 'react';
import ServiceDetail from '@/views/ServiceDetail';

export default function ServiceDetailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <ServiceDetail />
        </Suspense>
    );
}
