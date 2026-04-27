import type { Metadata } from 'next';
import '../../index.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
    metadataBase: new URL('https://aqsatech.ae'),
    title: {
        default: 'Aqsa Tech | #1 Technical Services Company in Dubai & UAE',
        template: '%s | Aqsa Tech UAE'
    },
    description: 'Looking for Aqsa Tech in Dubai? Aqsatech is UAE\'s #1 Most Trusted Technical Services Company. Expert AC repair, plumbing, painting, & home maintenance services. Get a free quote today!',
    keywords: ['Aqsa Tech', 'Aqsatech', 'Aqsa Tech Dubai', 'Aqsatech in Dubai', 'Aqsa Technical Services', 'Technical Services Dubai', 'Maintenance Company UAE', 'AC Repair Dubai', 'Renovation Dubai', 'aqsatech.ae'],
    authors: [{ name: 'Aqsa Tech' }],
    creator: 'Aqsa Tech',
    publisher: 'Aqsa Tech',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Aqsa Tech | #1 Technical Services Company in Dubai & UAE',
        description: 'Looking for Aqsa Tech in Dubai? Aqsatech is UAE\'s #1 Most Trusted Technical Services Company. Expert AC repair, plumbing, painting, & home maintenance services. Get a free quote today!',
        url: 'https://aqsatech.ae',
        siteName: 'Aqsa Tech',
        images: [
            {
                url: '/Logo Chatgpt.png',
                width: 800,
                height: 600,
            },
        ],
        locale: 'en_AE',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: '/',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <link rel="icon" type="image/png" href="/Logo%20Chatgpt.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "Aqsa Tech",
                            "alternateName": "Aqsatech",
                            "image": "https://aqsatech.ae/Logo%20Chatgpt.png",
                            "description": "Aqsa Tech is UAE's #1 Most Trusted Technical Services Company in Dubai. Expert AC repair, plumbing, painting, & home maintenance services.",
                            "url": "https://aqsatech.ae",
                            "telephone": "+971525010132",
                            "email": "services@aqsatech.ae",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Dubai",
                                "addressLocality": "Dubai",
                                "addressRegion": "Dubai",
                                "addressCountry": "AE"
                            },
                            "areaServed": {
                                "@type": "City",
                                "name": "Dubai"
                            },
                            "sameAs": [
                                "https://www.instagram.com/aqsatech.ae/",
                                "https://twitter.com/aqsatech_ae",
                                "https://www.linkedin.com/company/aqsatech-ae/"
                            ]
                        })
                    }}
                />
            </head>
            <body suppressHydrationWarning>
                <SmoothScroll>
                    <LanguageProvider>
                        <div className="min-h-screen bg-white smooth-scroll">
                            <Preloader />
                            <Navbar />
                            {children}
                            <Footer />
                            <FloatingContactButtons />
                        </div>
                    </LanguageProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
