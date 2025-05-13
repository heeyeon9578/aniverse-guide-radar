
import { supabase } from "@/integrations/supabase/client";
import { Anime } from "@/types/anime";

export type DatabaseAnime = {
  id: number;
  title: string;
  description: string;
  image: string;
  release_date: string;
  status: string;
  episodes: number;
  score: number;
  studio: string;
  created_at: string;
  genres: string[];
  watchLinks: {
    name: string;
    url: string;
  }[];
};

export async function fetchAnimes(): Promise<Anime[]> {
  try {
    // 애니메이션 데이터 가져오기
    const { data: animes, error: animesError } = await supabase
      .from('animes')
      .select('*')
      .order('id', { ascending: true });
    
    if (animesError) {
      console.error('애니메이션 데이터 조회 오류:', animesError);
      throw animesError;
    }

    // 애니메이션별로 장르와 시청 링크 정보 가져오기
    const animeWithDetails = await Promise.all(animes.map(async (anime) => {
      // 애니메이션의 장르 조회
      const { data: genreConnections, error: genresError } = await supabase
        .from('anime_genres')
        .select('genres(name)')
        .eq('anime_id', anime.id);
        
      if (genresError) {
        console.error('장르 데이터 조회 오류:', genresError);
        throw genresError;
      }

      // 장르명 배열 추출
      const genres = genreConnections.map(connection => connection.genres.name);

      // 애니메이션의 시청 링크 조회
      const { data: watchLinks, error: watchLinksError } = await supabase
        .from('watch_links')
        .select('name, url')
        .eq('anime_id', anime.id);

      if (watchLinksError) {
        console.error('시청 링크 데이터 조회 오류:', watchLinksError);
        throw watchLinksError;
      }

      // 애니메이션 데이터 형식에 맞게 반환
      return {
        id: anime.id,
        title: anime.title,
        description: anime.description,
        image: anime.image,
        releaseDate: anime.release_date,
        status: anime.status as 'ongoing' | 'completed',
        episodes: anime.episodes,
        genres: genres,
        score: anime.score,
        studio: anime.studio,
        watchLinks: watchLinks,
      };
    }));

    return animeWithDetails;
  } catch (error) {
    console.error('애니메이션 데이터 로딩 오류:', error);
    throw error;
  }
}

export async function fetchAnimeById(id: number): Promise<Anime | null> {
  try {
    // 특정 ID의 애니메이션 데이터 가져오기
    const { data: anime, error: animeError } = await supabase
      .from('animes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (animeError) {
      console.error('애니메이션 데이터 조회 오류:', animeError);
      return null;
    }

    // 애니메이션 장르 조회
    const { data: genreConnections, error: genresError } = await supabase
      .from('anime_genres')
      .select('genres(name)')
      .eq('anime_id', id);
      
    if (genresError) {
      console.error('장르 데이터 조회 오류:', genresError);
      throw genresError;
    }

    // 장르명 배열 추출
    const genres = genreConnections.map(connection => connection.genres.name);

    // 애니메이션 시청 링크 조회
    const { data: watchLinks, error: watchLinksError } = await supabase
      .from('watch_links')
      .select('name, url')
      .eq('anime_id', id);

    if (watchLinksError) {
      console.error('시청 링크 데이터 조회 오류:', watchLinksError);
      throw watchLinksError;
    }

    // 애니메이션 데이터 형식에 맞게 반환
    return {
      id: anime.id,
      title: anime.title,
      description: anime.description,
      image: anime.image,
      releaseDate: anime.release_date,
      status: anime.status as 'ongoing' | 'completed',
      episodes: anime.episodes,
      genres: genres,
      score: anime.score,
      studio: anime.studio,
      watchLinks: watchLinks,
    };
  } catch (error) {
    console.error('애니메이션 데이터 로딩 오류:', error);
    return null;
  }
}
