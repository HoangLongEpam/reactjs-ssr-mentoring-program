export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  genres: string[];
  vote_average: number;
  overview: string;
  runtime: number;
  tagline?: string;
  budget?: number;
  revenue?: number;
  vote_count?: number;
  // vote_average: number;
}
