
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="flex">
        <Input
          type="text"
          placeholder="애니메이션 제목 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-r-none border-r-0 focus-visible:ring-anime-primary"
        />
        <Button 
          type="submit"
          className="bg-anime-primary hover:bg-anime-primary/90 rounded-l-none"
        >
          <Search className="h-5 w-5 mr-2" /> 검색
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
