import { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import ClientPage from './ClientPage';

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        return { title: 'Post Not Found | Aqsa Tech UAE' };
    }

    return {
        title: `${post.title} | Aqsa Tech UAE`,
        description: post.excerpt,
        openGraph: {
            title: `${post.title} | Aqsa Tech UAE`,
            description: post.excerpt,
            images: [post.image],
        },
        alternates: {
            canonical: `/blog/${post.slug}`,
        }
    };
}

export async function generateStaticParams() {
    return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function Page() {
    return <ClientPage />;
}
