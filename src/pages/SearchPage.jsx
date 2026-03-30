import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchAnime } from '../services/jikanApi';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchAnime', debouncedQuery],
    queryFn: () => searchAnime(debouncedQuery, 1, 20),
    enabled: debouncedQuery.length > 2,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-pixel text-2xl md:text-3xl text-primary mb-8 text-shadow-glow">
        Search Anime
      </h1>

      <div className="relative mb-12 flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER KEYWORD..."
          className="w-full max-w-2xl px-6 py-4 bg-surface border-pixel border-primary text-white font-pixel text-xs focus:outline-none focus:border-accent hover:shadow-pixel-glow transition-all"
        />
        <div className="absolute right-6 md:left-[640px] pointer-events-none">
          <Search className="text-primary" />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="font-pixel text-accent text-xl animate-bounce">
            Searching...
          </div>
        </div>
      )}

      {error && (
        <div className="font-pixel text-primary text-sm mb-4">
          Error: {error.message}
        </div>
      )}

      {!isLoading && debouncedQuery && data?.data?.length === 0 && (
        <div className="font-pixel text-white text-sm">
          NO ANIME FOUND. TRY ANOTHER KEYWORD.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data?.map((anime) => (
          <Link
            key={anime.mal_id}
            to={`/anime/${anime.mal_id}`}
            className="group bg-surface border border-white/10 hover:border-accent hover:shadow-pixel-glow transition-all duration-300 rounded-none overflow-hidden"
          >
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="p-3">
              <h3 className="font-pixel text-[10px] text-white line-clamp-1 leading-relaxed group-hover:text-accent transition-colors">
                {anime.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {!debouncedQuery && (
        <div className="mt-12 p-8 border-2 border-dashed border-white/5 rounded-none flex flex-col items-center justify-center">
          <p className="font-pixel text-white/30 text-xs">
            Awaiting input for database query...
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
