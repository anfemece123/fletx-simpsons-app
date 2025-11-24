export interface Location {
    id: number;
    name: string;
    image_path: string | null;
    town: string | null;
    use: string | null;
  }
  
  export interface LocationsResponse {
    count: number;
    next: string | null;
    prev: string | null;
    pages: number;
    results: Location[];
  }
  