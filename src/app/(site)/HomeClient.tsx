"use client";
import { Suspense } from 'react';
import { motion } from 'framer-motion';

import Hero from '@/components/Hero';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import FAQSchema from '@/components/FAQSchema';
import LocalSEOSchema from '@/components/LocalSEOSchema';

import SubheroSection from '@/components/SubheroSection';
import DiscoverPopularServices from '@/components/DiscoverPopularServices';
import ExploreOurServices from '@/components/ExploreOurServices';
import StepByStepGuide from '@/components/StepByStepGuide';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import GetInTouch from '@/components/GetInTouch';

const SmoothLoader = () => (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-brand-blue/20 rounded-full animate-pulse" />
            <div className="absolute inset-0 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
        </div>
    </div>
);

export default function HomePage() {
    return (
        <>
            <SEOHead
                title="Aqsa Tech | #1 Technical Services & Maintenance Company in Dubai"
                description="Looking for Aqsa Tech in Dubai? Aqsatech is UAE's #1 Most Trusted Technical Services Company. Expert AC repair, plumbing, painting, & home maintenance services. Get a free quote today!"
            />
            <StructuredData type="Organization" />
            <StructuredData type="LocalBusiness" />
            <LocalSEOSchema />
            <FAQSchema />
            <div id="hero" className="section-fade">
                <Hero />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <Suspense fallback={<SmoothLoader />}><SubheroSection /></Suspense>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <Suspense fallback={<SmoothLoader />}><About /></Suspense>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <Suspense fallback={<SmoothLoader />}><DiscoverPopularServices /></Suspense>
            </motion.div>
            <div id="services">
                <Suspense fallback={<SmoothLoader />}><ExploreOurServices /></Suspense>
            </div>
            <div id="how-it-works">
                <Suspense fallback={<SmoothLoader />}><StepByStepGuide /></Suspense>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <Suspense fallback={<SmoothLoader />}><Services /></Suspense>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <Suspense fallback={<SmoothLoader />}><Projects /></Suspense>
            </motion.div>
            <div id="contact">
                <Suspense fallback={<SmoothLoader />}><Contact /></Suspense>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <Suspense fallback={<SmoothLoader />}><GetInTouch /></Suspense>
            </motion.div>
        </>
    );
}
