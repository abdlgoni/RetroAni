import { Star } from 'lucide-react';
import ExpandableText from '../ExpandableText';

function DetailHero({ anime, isInWatchlist, onToggleWatchlist, onWatchTrailer }) {
  if (!anime) return null;

  return (
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
            <ExpandableText 
              text={anime.synopsis} 
              limit={200}
              className="font-body text-sm text-white/70 leading-relaxed inline"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
            <button 
              onClick={onToggleWatchlist}
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
                onClick={onWatchTrailer}
                className="border-2 border-accent text-accent font-pixel text-xs px-8 py-4 hover:bg-accent hover:text-background transition-all uppercase tracking-wider"
              >
                WATCH TRAILER
              </button>
            )}
          </div>

          {/* Stats Placeholder (DetailStats will be used here in DetailPage) */}
          <div id="stats-target"></div>
        </div>
      </div>
    </section>
  );
}

export default DetailHero;
