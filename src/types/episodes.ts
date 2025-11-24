export interface Episode {
    id: number;
    name: string;
    season: number;
    episode_number: number;
    airdate: string | null;
    image_path: string | null;
    synopsis: string | null;
  }
  
  export interface EpisodesResponse {
    count: number;
    next: string | null;
    prev: string | null;
    pages: number;
    results: Episode[];
  }