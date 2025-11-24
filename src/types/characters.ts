export interface SimpsonsCharacter {
    id: number;
    age: number | null;
    birthdate: string | null;
    gender: string | null;
    name: string;
    occupation: string | null;
    portrait_path: string | null;
    phrases: string[];
    status: string | null;
  }
  
export interface CharactersResponse {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: SimpsonsCharacter[];
}
