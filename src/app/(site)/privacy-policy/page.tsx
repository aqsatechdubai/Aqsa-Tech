"use client";
import { Suspense } from 'react';

import PrivacyPolicy from '@/views/PrivacyPolicy';

export default function PrivacyPolicyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <PrivacyPolicy />
        </Suspense>
    );
}
