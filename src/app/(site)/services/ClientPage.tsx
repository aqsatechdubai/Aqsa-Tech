"use client";
import { Suspense } from 'react';
import StructuredData from '@/components/StructuredData';
import AllServices from '@/views/AllServices';

const SmoothLoader = () => (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-brand-blue/20 rounded-full animate-pulse" />
            <div className="absolute inset-0 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
        </div>
    </div>
);

export default function ServicesClientPage() {
    return (
        <>
            <StructuredData type="Service" data={{
                serviceType: 'Technical Services UAE',
                name: 'Complete Technical & Home Maintenance Services',
                description: 'Comprehensive technical services across UAE',
            }} />
            <Suspense fallback={<SmoothLoader />}>
                <AllServices />
            </Suspense>
        </>
    );
}
