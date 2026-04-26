import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
    title: "Aqsa Tech | #1 Technical Services & Maintenance Company in Dubai",
    description: "Looking for Aqsa Tech in Dubai? Aqsatech is UAE's #1 Most Trusted Technical Services Company. Expert AC repair, plumbing, painting, & home maintenance services. Get a free quote today!",
    openGraph: {
        title: "Aqsa Tech | #1 Technical Services & Maintenance Company in Dubai",
        description: "Looking for Aqsa Tech in Dubai? Aqsatech is UAE's #1 Most Trusted Technical Services Company. Expert AC repair, plumbing, painting, & home maintenance services. Get a free quote today!",
        url: "https://aqsatech.ae/"
    },
    alternates: {
        canonical: "/"
    }
};

export default function HomePage() {
    return <HomeClient />;
}
