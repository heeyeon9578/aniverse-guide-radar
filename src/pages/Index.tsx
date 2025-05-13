
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import AnimeGrid from '@/components/AnimeGrid';
import Header from '@/components/Header';
import { fetchAnimes } from '@/services/animeService';
import { Anime } from '@/types/anime';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimes = async () => {
      try {
        setLoading(true);
        const data = await fetchAnimes();
        setAnimes(data);
      } catch (error) {
        console.error('애니메이션 데이터 로딩 실패:', error);
        toast.error('애니메이션 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadAnimes();
  }, []);

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
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <AnimeGrid animes={animes} searchQuery={searchQuery} />
        )}
      </main>
      
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© 2025 애니메이션 타임. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default Index;
