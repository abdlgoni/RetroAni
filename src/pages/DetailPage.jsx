import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAnimeById, getAnimeEpisodes, getAnimeRecommendations, getAnimeCharacters, getAnimeReviews } from '../services/jikanApi';

// Sub-components
import DetailHero from '../components/detail/DetailHero';
import DetailStats from '../components/detail/DetailStats';
import DetailTabs from '../components/detail/DetailTabs';
import EpisodesTab from '../components/detail/EpisodesTab';
import CharactersTab from '../components/detail/CharactersTab';
import ReviewsTab from '../components/detail/ReviewsTab';
import TrailerModal from '../components/detail/TrailerModal';
import RecommendationsSection from '../components/detail/RecommendationsSection';

function DetailPage() {
  const { id } = useParams();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('EPISODES');
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // 1. Fetch Anime Detail
  const { 
    data: animeResponse, 
    isLoading: isAnimeLoading, 
    isError: isAnimeError,
    refetch: refetchAnime
  } = useQuery({
    queryKey: ['anime', id],
    queryFn: () => getAnimeById(id),
  });

  const anime = animeResponse?.data;

  // 2. Fetch Episodes
  const { 
    data: episodesResponse, 
    isLoading: isEpisodesLoading 
  } = useQuery({
    queryKey: ['episodes', id],
    queryFn: () => getAnimeEpisodes(id),
    enabled: !!anime,
  });

  const episodes = episodesResponse?.data || [];

  // 3. Fetch Recommendations
  const { 
    data: recommendationsResponse, 
  } = useQuery({
    queryKey: ['recommendations', id],
    queryFn: () => getAnimeRecommendations(id),
    enabled: !!anime,
  });

  const recommendations = recommendationsResponse?.data || [];

  // 4. Fetch Characters
  const { 
    data: charactersResponse, 
    isLoading: isCharactersLoading 
  } = useQuery({
    queryKey: ['characters', id],
    queryFn: () => getAnimeCharacters(id),
    enabled: !!anime,
  });

  const characters = charactersResponse?.data?.slice(0, 6) || [];

  // 5. Fetch Reviews
  const { 
    data: reviewsResponse, 
    isLoading: isReviewsLoading 
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getAnimeReviews(id),
    enabled: !!anime,
  });

  const reviews = reviewsResponse?.data || [];

  // Watchlist Logic
  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('retroani_watchlist') || '[]');
    setIsInWatchlist(watchlist.includes(Number(id)));
  }, [id]);

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('retroani_watchlist') || '[]');
    let updatedWatchlist;
    if (isInWatchlist) {
      updatedWatchlist = watchlist.filter(itemId => itemId !== Number(id));
    } else {
      updatedWatchlist = [...watchlist, Number(id)];
    }
    localStorage.setItem('retroani_watchlist', JSON.stringify(updatedWatchlist));
    setIsInWatchlist(!isInWatchlist);
  };

  if (isAnimeLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse flex flex-col gap-8">
        <div className="h-96 w-full bg-surface"></div>
      </div>
    );
  }

  if (isAnimeError || !anime) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="font-pixel text-primary text-xl mb-6 tracking-tight">FAILED TO LOAD ANIME DATA</h2>
        <button 
          onClick={() => refetchAnime()}
          className="bg-primary text-white font-pixel text-xs px-8 py-4 hover:bg-accent hover:text-background transition-colors"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
      {/* 1. HERO SECTION */}
      <DetailHero 
        anime={anime}
        isInWatchlist={isInWatchlist}
        onToggleWatchlist={toggleWatchlist}
        onWatchTrailer={() => setIsTrailerOpen(true)}
      />
      
      {/* Stats placement logic: In original code, Stats was under Hero buttons.
          However, for cleaner flow, we can also put it right after the Hero component. */}
      <div className="md:ml-[312px] -mt-10 mb-10">
        <DetailStats anime={anime} />
      </div>

      {/* 2. TABS SECTION */}
      <section className="mb-12">
        <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="py-8">
          {activeTab === 'EPISODES' && (
            <EpisodesTab episodes={episodes} isLoading={isEpisodesLoading} />
          )}
          {activeTab === 'CHARACTERS' && (
            <CharactersTab characters={characters} isLoading={isCharactersLoading} />
          )}
          {activeTab === 'REVIEWS' && (
            <ReviewsTab reviews={reviews} isLoading={isReviewsLoading} />
          )}
        </div>
      </section>

      {/* 3. RECOMMENDATIONS */}
      <RecommendationsSection recommendations={recommendations} />

      {/* MODALS */}
      <TrailerModal 
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailer={anime.trailer}
        title={anime.title}
      />
    </div>
  );
}

export default DetailPage;