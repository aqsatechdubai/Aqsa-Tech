"use client";
import { Suspense } from 'react';

import TermsOfService from '@/views/TermsOfService';

export default function TermsOfServicePage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <TermsOfService />
        </Suspense>
    );
}
