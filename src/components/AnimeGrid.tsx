
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

  if (filteredAnimes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="anime-grid">
      {filteredAnimes.map(anime => (
        <div key={anime.id} className="animate-fade-in">
          <AnimeCard anime={anime} />
        </div>
      ))}
    </div>
  );
};

export default AnimeGrid;
