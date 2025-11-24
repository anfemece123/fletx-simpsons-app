import { apiClient, CDN_BASE_URL } from '../config/api';
import { Episode, EpisodesResponse } from '../types/episodes';

export const getEpisodeImage = (path: string | null) =>
  path ? `${CDN_BASE_URL}${path}` : null;

export const episodesService = {
  async list(page: number): Promise<EpisodesResponse> {
    const { data } = await apiClient.get('/episodes', { params: { page } });
    return data;
  },

  async getById(id: number): Promise<Episode> {
    const { data } = await apiClient.get(`/episodes/${id}`);
    return data;
  },
};
