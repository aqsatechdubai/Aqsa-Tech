import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Blog | Aqsa Tech - Property Maintenance Tips",
    description: "Expert property maintenance tips, renovation guides, and industry insights.",
    openGraph: {
        title: "Blog | Aqsa Tech - Property Maintenance Tips",
        description: "Expert property maintenance tips, renovation guides, and industry insights.",
        url: "https://aqsatech.ae/blog"
    },
    alternates: {
        canonical: "/blog"
    }
};

export default function BlogPage() {
    return <ClientPage />;
}
