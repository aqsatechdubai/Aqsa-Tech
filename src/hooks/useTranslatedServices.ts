import { useState, useEffect } from 'react';
import { services as baseServices } from '../data/services';
import { client } from '../sanity/client';
import { getAllServicesQuery } from '../sanity/queries';

export const useTranslatedServices = () => {
  const [services, setServices] = useState<any[]>(baseServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSanityServices = async () => {
      try {
        const sanityData = await client.fetch(getAllServicesQuery);
        if (sanityData && sanityData.length > 0) {
          const mappedServices = sanityData.map((s: any) => ({
            id: s._id,
            title: s.title,
            slug: s.slug,
            description: s.shortDescription || '',
            longDescription: s.fullDescription ? s.fullDescription.map((block: any) => block.children?.map((c: any) => c.text).join('')).join('\n') : '',
            image: s.imageUrl || s.localImagePath || '/Logo Chatgpt.png',
            tags: s.tags || [],
            features: s.features || [],
            benefits: s.benefits || [],
            gallery: []
          }));
          setServices(mappedServices);
        }
      } catch (error) {
        console.error("Failed to fetch services from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanityServices();
  }, []);

  return { services, loading };
}
