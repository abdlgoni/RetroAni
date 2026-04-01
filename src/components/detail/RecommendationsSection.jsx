import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

function RecommendationsSection({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Header Title with Line */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-pixel text-lg text-primary uppercase tracking-tight whitespace-nowrap">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="flex-1 h-px bg-primary/30"></div>
      </div>

      {/* Grid Layout */}
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
  );
}

export default RecommendationsSection;
