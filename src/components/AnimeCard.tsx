
import { Anime } from "@/types/anime";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Link to={`/anime/${anime.id}`}>
      <Card className="h-full card-hover overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={anime.image} 
            alt={anime.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <Badge 
            className={`absolute top-2 right-2 ${
              anime.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'
            }`}
          >
            {anime.status === 'ongoing' ? '방영중' : '완결'}
          </Badge>
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold line-clamp-1">{anime.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{anime.description}</p>
          
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(anime.releaseDate).getFullYear()}년</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm">{anime.score}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AnimeCard;
