import { useEffect, useState } from 'react';
import { locationsService } from '../../services/locationsService';
import { Location } from '../../types/locations';

export const useLocationsList = () => {
  const [items, setItems] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLocations = async (pageToLoad: number) => {
    try {
      setLoading(true);
      setError(null);

      const data = await locationsService.list(pageToLoad);
      setItems(data.results);
      setPages(data.pages);
      setPage(pageToLoad);
    } catch (err: any) {
      console.log('[useLocationsList] Error:', err?.message);
      setError('Failed to load locations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations(1);
  }, []);

  return {
    items,
    page,
    pages,
    loading,
    error,
    loadLocations,
    setPage,
  };
};
