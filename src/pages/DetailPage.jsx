import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Play, Plus, Check, X, Star } from 'lucide-react'; // Tambahkan Star
import { getAnimeById, getAnimeEpisodes, getAnimeRecommendations } from '../services/jikanApi';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [isExpanded, setIsExpanded] = useState(false);

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
      <section className="mb-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* LEFT COLUMN: Poster with retro offset border */}
          <div className="flex-shrink-0 mx-auto md:mx-0 relative w-[240px] md:w-[280px]">
            <div className="border-2 border-primary p-2 bg-background shadow-[8px_8px_0px_0px_#ff8aa5] w-[280px] h-[400px] relative ">
              <img 
                src={anime.images?.jpg?.large_image_url} 
                alt={anime.title} 
                className="w-full h-auto block"
              />
            </div>
           
          </div>

          {/* RIGHT COLUMN: Info */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h1 className="font-pixel text-3xl md:text-3xl text-white mb-2 uppercase leading-none tracking-wide">
              {anime.title}
            </h1>
            <p className="font-pixel text-xs text-primary mb-6 tracking-[2px] uppercase">
              {anime.title_japanese || 'ANIME DETAILS'}
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {anime.genres?.map((genre, idx) => (
                <span key={idx} className="border border-white/20 text-white font-body text-[10px] px-3 py-1 uppercase tracking-wider">
                  {genre.name}
                </span>
              ))}
              {(anime.year || anime.season) && (
                <span className="border border-white/20 text-white font-body text-[10px] px-3 py-1 uppercase tracking-wider">
                  {anime.year || anime.season}
                </span>
              )}
              {anime.episodes && (
                <span className="border border-white/20 text-white font-body text-[10px] px-3 py-1 uppercase tracking-wider">
                  {anime.episodes} EPISODES
                </span>
              )}
              <span className="bg-accent text-background font-body text-[10px] px-3 py-1 uppercase font-bold tracking-wider">
                {anime.status}
              </span>
            </div>

            {/* Score & Stars */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-baseline gap-1">
                <span className="font-pixel text-3xl text-accent">{anime.score || 'N/A'}</span>
                <span className="font-pixel text-xs text-white/50">/ 10</span>
              </div>
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.round((anime.score || 0) / 2) ? "currentColor" : "none"} />
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-8 max-w-3xl">
              <p className="font-body text-sm text-white/70 leading-relaxed inline">
                {anime.synopsis
                  ? (isExpanded ? anime.synopsis : `${anime.synopsis.slice(0, 200)}...`)
                  : 'No synopsis available for this anime.'}
              </p>
              
              {/* Tombol Show More / Show Less */}
              {anime.synopsis && anime.synopsis.length > 200 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 font-pixel text-[10px] text-accent hover:text-primary transition-colors tracking-widest uppercase inline-block mt-2 md:mt-0"
                >
                  [{isExpanded ? 'SHOW LESS' : 'SHOW MORE'}]
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
              <button 
                onClick={toggleWatchlist}
                className={`font-pixel text-xs px-8 py-4 transition-all uppercase tracking-wider ${
                  isInWatchlist 
                  ? 'bg-accent text-background' 
                  : 'bg-primary text-white hover:bg-primary/80'
                }`}
              >
                {isInWatchlist ? '✓ IN WATCHLIST' : 'ADD TO WATCHLIST'}
              </button>

              {anime.trailer?.embed_url && (
                <button 
                  onClick={() => setIsTrailerOpen(true)}
                  className="border-2 border-accent text-accent font-pixel text-xs px-8 py-4 hover:bg-accent hover:text-background transition-all uppercase tracking-wider"
                >
                  WATCH TRAILER
                </button>
              )}
            </div>

            {/* Stats Separator */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-2xl">
              <div>
                <p className="font-pixel text-[8px] text-white/40 mb-1 tracking-widest">RANK</p>
                <p className="font-pixel text-lg text-accent">#{anime.rank || '??'}</p>
              </div>
              <div>
                <p className="font-pixel text-[8px] text-white/40 mb-1 tracking-widest">POPULARITY</p>
                <p className="font-pixel text-lg text-accent">#{anime.popularity || '??'}</p>
              </div>
              <div>
                <p className="font-pixel text-[8px] text-white/40 mb-1 tracking-widest">STUDIO</p>
                <p className="font-pixel text-sm text-accent truncate">
                  {anime.studios?.map(s => s.name).join(', ') || 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABS SECTION */}
      <section className="mb-12">
        <div className="flex border-b border-white/10 gap-2 md:gap-8 overflow-x-auto scrollbar-none">
          {['EPISODES', 'CHARACTERS', 'RELATED', 'REVIEWS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-pixel text-xs transition-all relative whitespace-nowrap tracking-wider ${
                activeTab === tab 
                ? 'text-accent' 
                : 'text-white/40 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-accent" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'EPISODES' && (
            <div className="space-y-4">
              {isEpisodesLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-24 bg-surface rounded-sm"></div>)}
                </div>
              ) : episodes.length > 0 ? (
                episodes.slice(0,5).map((ep) => (
                  <div key={ep.mal_id} className="flex flex-col md:flex-row md:items-center bg-[#0d0d1a] border border-white/5 p-4 md:p-6 gap-6 hover:border-white/40 transition-colors group">
                    {/* Number */}
                    <div className="font-pixel text-2xl md:text-3xl text-white/20 group-hover:text-accent transition-colors w-12 shrink-0">
                      {ep.mal_id.toString().padStart(2, '0')}
                    </div>
                    
                    {/* Thumbnail Placeholder */}
                    <div className="relative w-full md:w-48 aspect-video bg-black/50 border border-white/10 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-10">
                        <Play size={24} className="text-white opacity-50 group-hover:opacity transition-opacity" />
                      </div>
                      {/* Jikan API jarang menyediakan thumbnail per episode, tapi jika kita pasang pattern/noise disini akan terlihat keren */}
                      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-body font-bold text-white text-base md:text-lg uppercase tracking-wide mb-1">
                        {ep.title || `Episode ${ep.mal_id}`}
                      </h3>
                      <p className="font-pixel text-[10px] text-white/40 tracking-wider">
                        FIRST AIR: {ep.aired ? new Date(ep.aired).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase() : 'UNKNOWN'}
                      </p>
                    </div>

                    {/* Duration/Status (Placeholder since Jikan doesn't provide exact episode duration easily) */}
                    {/* <div className="font-pixel text-xs text-accent mt-2 md:mt-0">
                      {ep.duration || `${ep.mal_id}`}
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-center font-pixel text-xs text-white/40 py-12">NO EPISODES FOUND</p>
              )}
            </div>
          )}

          {/* Tab Lainnya (Placeholder) */}
          {['CHARACTERS', 'RELATED', 'REVIEWS'].includes(activeTab) && (
            <div className="text-center py-24 border border-white/5 bg-[#0d0d1a]">
              <p className="font-pixel text-xs text-primary/40 animate-pulse tracking-[6px]">DATA ARCHIVE PENDING...</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <section className="mb-12">
          {/* Header Title with Line */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-pixel text-lg text-primary uppercase tracking-tight whitespace-nowrap">
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="flex-1 h-px bg-primary/30"></div>
          </div>

          {/* Grid Layout (menggantikan overflow-x-auto sebelumnya) */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.slice(0, 5).map((rec) => (
              <Link 
                key={rec.entry.mal_id}
                to={`/anime/${rec.entry.mal_id}`}
                className="group block border border-white/10 bg-[#0d0d1a] p-2 md:p-3 hover:border-primary transition-colors"
              >
                <div className="aspect-[3/4] overflow-hidden mb-3 relative bg-surface">
                  <img 
                    src={rec.entry.images?.jpg?.image_url} 
                    alt={rec.entry.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-body text-xs text-white group-hover:text-primary transition-colors line-clamp-1 font-bold mb-2 uppercase">
                  {rec.entry.title}
                </h3>
                <div className="flex justify-between items-center font-pixel text-[8px] tracking-wider">
                  <span className="text-white/40">ANIME</span>
                  <span className="text-accent flex items-center gap-1">
                    <Star size={8} fill="currentColor"/> {rec.votes > 0 ? rec.votes : 'N/A'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* TRAILER MODAL */}
      {isTrailerOpen && anime.trailer?.embed_url && (
         /* (Bagian Modal Trailer dibiarkan sama seperti sebelumnya) */
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 md:p-8"
          onClick={() => setIsTrailerOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl bg-background border-2 border-primary shadow-[0_0_60px_rgba(255,45,120,0.4)]"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsTrailerOpen(false)}
              className="absolute -top-12 right-0 font-pixel text-[10px] text-primary hover:text-accent transition-colors flex items-center gap-3 py-2"
            >
              CLOSE <X size={18} />
            </button>
            <div className="aspect-video bg-black">
              <iframe
                src={anime.trailer.embed_url.replace('autoplay=1', 'autoplay=0')}
                title={`${anime.title} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;