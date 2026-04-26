import { useState, useEffect } from 'react';
import { client } from '@/sanity/client';
import { getHomePageQuery } from '@/sanity/queries';

export const useSanityHome = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const result = await client.fetch(getHomePageQuery);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch home content from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  return { data, loading };
};
