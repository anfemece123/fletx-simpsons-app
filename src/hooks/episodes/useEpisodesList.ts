import { useEffect, useState } from 'react';
import { episodesService } from '../../services/episodesService';
import { Episode } from '../../types/episodes';

export const useEpisodesList = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await episodesService.list(page);
      setEpisodes(data.results);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return {
    episodes,
    page,
    pages,
    loading,
    setPage,
  };
};
