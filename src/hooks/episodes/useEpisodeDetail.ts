import { useEffect, useState, useMemo } from 'react';
import { episodesService, getEpisodeImage } from '../../services/episodesService';
import { Episode } from '../../types/episodes';

export const useEpisodeDetail = (episodeId: number) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const ep = await episodesService.getById(episodeId);
        if (isMounted) {
          setEpisode(ep);
        }
      } catch (e) {
        if (isMounted) {
          setError('Failed to load episode details.');
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
  }, [episodeId]);

  const imageUri = useMemo(
    () => getEpisodeImage(episode?.image_path ?? null),
    [episode?.image_path],
  );

  return {
    episode,
    loading,
    error,
    imageUri,
  };
};
