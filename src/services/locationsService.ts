import { apiClient, CDN_BASE_URL } from '../config/api';
import { Location, LocationsResponse } from '../types/locations';

export const getLocationImage = (path: string | null): string | null => {
  if (!path) return null;
  return `${CDN_BASE_URL}${path}`;
};

export const locationsService = {
  async list(page: number): Promise<LocationsResponse> {
    const { data } = await apiClient.get<LocationsResponse>('/locations', {
      params: { page },
    });
    return data;
  },

  async getById(id: number): Promise<Location> {
    const { data } = await apiClient.get<Location>(`/locations/${id}`);
    return data;
  },
};
