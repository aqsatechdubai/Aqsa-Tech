import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "All Technical Services UAE | Complete Home Maintenance",
    description: "Browse all technical services by Aqsa Tech in Dubai",
    openGraph: {
        title: "All Technical Services UAE | Complete Home Maintenance",
        description: "Browse all technical services by Aqsa Tech in Dubai",
        url: "https://aqsatech.ae/services"
    },
    alternates: {
        canonical: "/services"
    }
};

export default function ServicesPage() {
    return <ClientPage />;
}
