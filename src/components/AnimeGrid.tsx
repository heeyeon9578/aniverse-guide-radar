
import { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard';
import { Anime } from '@/types/anime';

interface AnimeGridProps {
  animes: Anime[];
  searchQuery: string;
}

const AnimeGrid = ({ animes, searchQuery }: AnimeGridProps) => {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>(animes);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredAnimes(animes);
      return;
    }
    
    const filtered = animes.filter(anime => 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAnimes(filtered);
  }, [animes, searchQuery]);

  if (animes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (filteredAnimes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredAnimes.map(anime => (
        <div key={anime.id} className="animate-fade-in">
          <AnimeCard anime={anime} />
        </div>
      ))}
    </div>
  );
};

export default AnimeGrid;
