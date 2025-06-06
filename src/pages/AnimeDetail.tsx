import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Anime } from '@/types/anime';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Star, 
  Info, 
  ExternalLink,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import Header from '@/components/Header';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { fetchAnimeById } from '@/services/animeService';
import { Skeleton } from '@/components/ui/skeleton';

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // 안정적인 대체 이미지 URL
  const fallbackImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000";

  // 이미지 로드 오류 처리 함수
  const handleImageError = () => {
    console.log('상세 이미지 로드 오류');
    setImageError(true);
  };

  useEffect(() => {
    const loadAnime = async () => {
      setLoading(true);
      try {
        if (id) {
          const animeData = await fetchAnimeById(Number(id));
          setAnime(animeData);
          
          if (!animeData) {
            toast({
              title: "애니메이션을 찾을 수 없습니다",
              description: "요청하신 애니메이션 정보를 찾을 수 없습니다.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error('애니메이션 상세 정보 로딩 실패:', error);
        toast({
          title: "데이터 로딩 오류",
          description: "애니메이션 정보를 불러오는 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
    // 다른 애니메이션으로 이동할 때 이미지 오류 상태 초기화
    setImageError(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-anime-primary hover:text-anime-primary/80 mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" />
            뒤로 가기
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20" />
                ))}
              </div>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-2 pt-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-2 pt-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">애니메이션을 찾을 수 없습니다</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-anime-primary hover:text-anime-primary/80 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          뒤로 가기
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg h-auto relative">
              <img 
                src={imageError ? fallbackImage : anime.image} 
                alt={anime.title} 
                className="w-full h-full object-cover" 
                onError={handleImageError}
                loading="lazy"
              />
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60">
                  <AlertCircle className="text-gray-400 h-24 w-24" />
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres.map((genre, index) => (
                <Badge key={index} className="bg-anime-secondary text-white">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center mb-4 text-muted-foreground">
              <Calendar className="h-5 w-5 mr-2" />
              <span>최초 방영: {new Date(anime.releaseDate).toLocaleDateString('ko-KR')}</span>
            </div>
            
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold">{anime.score}</span>
              <span className="text-muted-foreground ml-1">/10</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Info className="h-5 w-5 mr-2" />
                <span className="font-semibold">줄거리</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{anime.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-y-2">
                <div>
                  <span className="font-semibold">스튜디오:</span>
                </div>
                <div>{anime.studio}</div>
                
                <div>
                  <span className="font-semibold">상태:</span>
                </div>
                <div>
                  <Badge className={anime.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'}>
                    {anime.status === 'ongoing' ? '방영중' : '완결'}
                  </Badge>
                </div>
                
                <div>
                  <span className="font-semibold">에피소드:</span>
                </div>
                <div>{anime.episodes}화</div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="text-xl font-semibold mb-4">시청 가능한 곳</h3>
              <div className="flex flex-wrap gap-3">
                {anime.watchLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Button variant="outline" className="hover:bg-gray-100">
                      {link.name}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© 2025 애니메이션 타임. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default AnimeDetail;
