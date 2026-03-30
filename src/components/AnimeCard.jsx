import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

/**
 * AnimeCard component with retro 90s aesthetic.
 * Feature-rich with hover interactions, skeleton state, and watchlist toggle.
 */
const AnimeCard = ({
  mal_id,
  title,
  images,
  genres,
  score,
  episodes,
  status,
  colorVariant = 'pink',
  isInWatchlist = false,
  isLoading = false,
  onWatchlistToggle,
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Constants
  const BORDER_COLOR = colorVariant === 'yellow' ? '#FFE600' : '#FF2D78';
  const WATCHLIST_BG = isInWatchlist ? '#FFE600' : '#FF2D78';
  const WATCHLIST_TEXT = isInWatchlist ? '#0D0D2B' : '#FFFFFF';
  const WATCHLIST_LABEL = isInWatchlist ? '✓ SAVED' : '＋ WATCHLIST';

  // Skeleton State
  if (isLoading) {
    return (
      <div 
        className="w-[200px] h-[300px] bg-surface relative overflow-hidden"
        style={{ border: `2px solid ${BORDER_COLOR}` }}
      >
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 z-10 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
        
        {/* Image Skeleton */}
        <div className="h-[195px] bg-[#1E1A3D]" />
        
        {/* Info Skeleton */}
        <div className="p-2 space-y-2 translate-y-2">
          <div className="h-2 bg-[#2A2550] w-3/4" />
          <div className="h-2 bg-[#2A2550] w-1/2" />
          <div className="flex gap-1">
            <div className="h-3 bg-[#2A2550] w-10" />
            <div className="h-3 bg-[#2A2550] w-10" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-2 bg-[#2A2550] w-8" />
            <div className="h-2 bg-[#2A2550] w-8" />
          </div>
        </div>
      </div>
    );
  }

  const handleCardClick = () => {
    navigate(`/anime/${mal_id}`);
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (onWatchlistToggle) {
      onWatchlistToggle(mal_id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group w-[200px] h-[300px] bg-surface cursor-pointer relative flex flex-col transition-all duration-200 ease-out hover:-translate-y-[6px]"
      style={{
        border: `2px solid ${BORDER_COLOR}`,
        boxShadow: 'none',
        '--hover-shadow': '0 0 20px #FFE600',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px #FFE600')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* 1. POSTER IMAGE (65%) */}
      <div className="h-[195px] w-full relative overflow-hidden bg-[#1E1A3D]">
        {!imageError ? (
          <img
            src={images?.jpg?.image_url}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-primary">
            <span className="font-pixel text-[8px] text-white text-center px-2">
              NO IMAGE
            </span>
          </div>
        )}

        {/* WATCHLIST BUTTON (Appears on Hover) */}
        <button
          onClick={handleWatchlistClick}
          className="absolute bottom-0 left-0 w-full h-[28px] opacity-0 group-hover:opacity-100 transition-opacity font-pixel text-[7px] flex items-center justify-center z-20 active:scale-95"
          style={{
            backgroundColor: WATCHLIST_BG,
            color: WATCHLIST_TEXT,
          }}
        >
          {WATCHLIST_LABEL}
        </button>
      </div>

      {/* 2. BOTTOM INFO AREA (35%) */}
      <div className="p-2 flex flex-col justify-between h-[105px]">
        {/* Title */}
        <h3
          className="font-pixel text-white leading-relaxed line-clamp-2"
          style={{ fontSize: '7px', marginBottom: '6px' }}
        >
          {title}
        </h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-[6px]">
          {genres?.slice(0, 2).map((genre, idx) => (
            <span
              key={idx}
              className="bg-primary text-white text-[9px] font-body px-1 leading-none h-[14px] flex items-center"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <Star size={10} fill="#FFE600" color="#FFE600" />
            <span className="text-accent font-body font-bold text-[10px]">
              {score ? score : 'N/A'}
            </span>
          </div>
          <span className="text-gray-400 font-body text-[10px]">
            {episodes ? episodes : '?'} eps
          </span>
        </div>
      </div>
    </div>
  );
};

// PropTypes Validation
AnimeCard.propTypes = {
  mal_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.shape({
    jpg: PropTypes.shape({
      image_url: PropTypes.string,
    }),
  }).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  score: PropTypes.number,
  episodes: PropTypes.number,
  status: PropTypes.string,
  colorVariant: PropTypes.oneOf(['pink', 'yellow']),
  isInWatchlist: PropTypes.bool,
  isLoading: PropTypes.bool,
  onWatchlistToggle: PropTypes.func,
};

export default AnimeCard;


