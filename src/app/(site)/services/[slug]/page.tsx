import { Metadata } from 'next';
import { services } from '@/data/services';
import ClientPage from './ClientPage';

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const service = services.find((s) => s.slug === resolvedParams.slug);

    if (!service) {
        return { title: 'Service Not Found | Aqsa Tech UAE' };
    }

    return {
        title: `${service.title} | Aqsa Tech UAE`,
        description: service.description,
        openGraph: {
            title: `${service.title} | Aqsa Tech UAE`,
            description: service.description,
            images: [service.image],
        },
        alternates: {
            canonical: `/services/${service.slug}`,
        }
    };
}

export async function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }));
}

export default function Page() {
    return <ClientPage />;
}
