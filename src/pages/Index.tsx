
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import AnimeGrid from '@/components/AnimeGrid';
import { animeData } from '@/data/animeData';
import Header from '@/components/Header';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-anime-primary to-anime-secondary bg-clip-text text-transparent">
            애니메이션 최신 정보
          </h1>
          <p className="text-xl text-muted-foreground">
            최신 애니메이션 정보와 업데이트를 한 곳에서 확인하세요
          </p>
        </div>
        
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <AnimeGrid animes={animeData} searchQuery={searchQuery} />
      </main>
      
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© 2025 애니메이션 타임. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default Index;
