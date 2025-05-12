
export interface Anime {
  id: number;
  title: string;
  description: string;
  image: string;
  releaseDate: string;
  status: "ongoing" | "completed";
  episodes: number;
  genres: string[];
  score: number;
  studio: string;
  watchLinks: {
    name: string;
    url: string;
  }[];
}
