import { Star } from 'lucide-react';
import ExpandableText from '../ExpandableText';

function ReviewsTab({ reviews, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        {[1,2,3].map(i => (
          <div key={i} className="flex gap-4 md:gap-8 animate-pulse">
            <div className="w-16 h-20 bg-surface/20 shrink-0"></div>
            <div className="flex-1 h-32 bg-surface/20 border border-white/5"></div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 border border-white/5 bg-surface/10">
        <p className="font-pixel text-[10px] text-white/20 uppercase tracking-[2px]">NO ARCHIVED REVIEWS FOUND</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {reviews.slice(0, 5).map((review, index) => {
        const tags = [
          { label: 'VERIFIED_FAN', color: 'bg-accent text-background' },
          { label: 'TOP_CONTRIBUTOR', color: 'bg-[#4deeea] text-background' },
          { label: 'DATA_MINER', color: 'bg-primary text-white' }
        ];
        const currentTag = tags[index % tags.length];
        const dateObj = new Date(review.date);
        
        return (
          <div key={review.mal_id} className="flex flex-col md:flex-row gap-4 md:gap-4">
            {/* LEFT COLUMN: User Info */}
            <div className="flex flex-col items-center w-full md:w-24 shrink-0 relative mt-2 md:mt-8">
              <div className={`absolute -top-3 ${currentTag.color} font-pixel text-[6px] px-2 py-1 uppercase tracking-wider z-10 whitespace-nowrap`}>
                {currentTag.label}
              </div>
              <div className="w-16 h-16 border-2 border-white/10 bg-surface mb-2 mt-4">
                <img 
                  src={review.user.images?.jpg?.image_url || 'https://via.placeholder.com/64'} 
                  alt={review.user.username} 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="text-center">
                <h4 className="font-pixel text-[10px] text-[#4deeea] truncate max-w-[80px] mb-1">
                  {review.user.username.toUpperCase()}
                </h4>
                <p className="font-pixel text-[8px] text-white/30 tracking-widest">
                  {`${dateObj.getFullYear()}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(dateObj.getDate()).padStart(2, '0')}`}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Review Box */}
            <div className="flex-1 min-w-2">
              <div className="flex justify-between items-end mb-2 px-0">
                <div className="flex items-baseline gap-1">
                  <span className="font-pixel text-xl md:text-2xl text-accent">
                    {String(review.score).padStart(2, '0')}
                  </span>
                  <span className="font-pixel text-[10px] text-white/40">/ 10</span>
                </div>
                <div className="flex gap-1 text-accent mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} 
                      fill={i < Math.round(review.score / 2) ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
              </div>

              {/* Content Box */}
              <div className="border border-primary bg-[#0d0d1a] p-5 md:p-6 relative group hover:border-accent transition-colors">
                <div className="absolute top-2 right-2 flex gap-1 opacity-80">
                  <div className="w-1.5 h-1.5 bg-accent"></div>
                  <div className="w-1.5 h-1.5 bg-primary"></div>
                  <div className="w-1.5 h-1.5 bg-[#4deeea]"></div>
                </div>
                
                <ExpandableText 
                  text={review.review} 
                  limit={500}
                  className="font-body text-xs md:text-sm text-white/80 leading-relaxed hover:line-clamp-none transition-all"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewsTab;
