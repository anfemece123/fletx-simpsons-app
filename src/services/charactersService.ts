import { apiClient, CDN_BASE_URL } from '../config/api';
import { CharactersResponse, SimpsonsCharacter } from '../types/characters';


export const getPortraitUrl = (path: string | null): string | null =>
  path ? `${CDN_BASE_URL}${path}` : null;

export const charactersService = {
  async list(page: number): Promise<CharactersResponse> {
    const { data } = await apiClient.get<CharactersResponse>('/characters', {
      params: { page },
    });
  
    return data;
  },

  async getById(id: number): Promise<SimpsonsCharacter> {
    const { data } = await apiClient.get<SimpsonsCharacter>(
      `/characters/${id}`,
    );
    return data;
  },
};
