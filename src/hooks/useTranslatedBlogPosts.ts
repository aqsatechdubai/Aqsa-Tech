import { useState, useEffect, useMemo } from 'react';
import { blogPosts } from '../data/blogPosts';
import { blogPostsTranslations } from '../data/blogPostsTranslations';
import { useLanguage } from '../contexts/LanguageContext';
import { client } from '../sanity/client';
import { getAllBlogPostsQuery } from '../sanity/queries';

export const useTranslatedBlogPosts = () => {
  const { language } = useLanguage();
  const [translatedPosts, setTranslatedPosts] = useState<any[]>(blogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSanityPosts = async () => {
      try {
        const sanityData = await client.fetch(getAllBlogPostsQuery);
        if (sanityData && sanityData.length > 0) {
          const mappedPosts = sanityData.map((p: any) => ({
            id: p._id,
            title: p.title,
            slug: p.slug,
            excerpt: p.summary || '',
            content: p.body ? p.body.map((b: any) => {
              if (b._type !== 'block') return '';
              let text = b.children?.map((c: any) => {
                let t = c.text;
                if (c.marks && c.marks.length > 0) t = `**${t}**`; // Simple bold fallback
                return t;
              }).join('') || '';
              
              if (b.style === 'h2' || b.style === 'h3') return `# ${text}`;
              if (b.listItem === 'bullet') return `• ${text}`;
              if (b.listItem === 'number') return `1. ${text}`;
              return text;
            }).join('\n\n') : '',
            image: p.imageUrl || p.localImagePath || '/Logo Chatgpt.png',
            author: p.authorName || 'Aqsa Tech',
            authorImage: p.authorImage || '/images/photos/about-2.jpg',
            authorRole: 'Technical Expert',
            date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
            readTime: '5 min read',
            category: p.categories && p.categories.length > 0 ? p.categories[0] : 'General',
            tags: p.categories || []
          }));
          setTranslatedPosts(mappedPosts);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanityPosts();
  }, []);

  const translatedCategories = useMemo(() => {
    const translations = blogPostsTranslations[language as 'EN'];
    return translations?.categories || [];
  }, [language]);

  return { translatedPosts, translatedCategories, loading };
};

