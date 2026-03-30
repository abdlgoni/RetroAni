import { useQuery } from '@tanstack/react-query';
import { getTopAnime } from '../services/jikanApi';
import AnimeCard from '../components/AnimeCard';

function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topAnime'],
    queryFn: () => getTopAnime(1, 20),
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-primary font-pixel">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-pixel text-2xl md:text-4xl text-primary mb-8 animate-pulse">
        Top Anime
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {[...Array(10)].map((_, i) => (
            <AnimeCard key={i} isLoading={true} colorVariant={i % 2 === 0 ? 'pink' : 'yellow'} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {data?.data?.map((anime, index) => (
            <AnimeCard
              key={anime.mal_id}
              {...anime}
              colorVariant={index % 2 === 0 ? 'pink' : 'yellow'}
              onWatchlistToggle={(id) => console.log('Toggle Watchlist for:', id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
