import { useEffect, useMemo, useState } from 'react';
import { locationsService, getLocationImage } from '../../services/locationsService';
import { Location } from '../../types/locations';

export const useLocationDetail = (locationId: number) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await locationsService.getById(locationId);
        if (isMounted) {
          setLocation(data);
        }
      } catch (e: any) {
        console.log('[useLocationDetail] error', e?.message);
        if (isMounted) {
          setError('Failed to load location.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [locationId]);

  const imageUri = useMemo(
    () => getLocationImage(location?.image_path ?? null),
    [location?.image_path],
  );

  return {
    location,
    loading,
    error,
    imageUri,
  };
};
