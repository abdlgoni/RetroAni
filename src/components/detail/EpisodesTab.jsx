import { Play } from 'lucide-react';

function EpisodesTab({ episodes, isLoading }) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-surface rounded-sm"></div>)}
      </div>
    );
  }

  if (episodes.length === 0) {
    return <p className="text-center font-pixel text-xs text-white/40 py-12">NO EPISODES FOUND</p>;
  }

  return (
    <div className="space-y-4">
      {episodes.slice(0, 5).map((ep) => (
        <div key={ep.mal_id} className="flex flex-col md:flex-row md:items-center bg-[#0d0d1a] border border-white/5 p-4 md:p-6 gap-6 hover:border-accent transition-colors group">
          {/* Number */}
          <div className="font-pixel text-2xl md:text-3xl text-white/20 group-hover:text-accent transition-colors w-12 shrink-0">
            {ep.mal_id.toString().padStart(2, '0')}
          </div>
          
          {/* Thumbnail Placeholder */}
          <div className="relative w-full md:w-48 aspect-video bg-black/50 border border-white/10 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-10">
              <Play size={24} className="text-white opacity-50 group-hover:opacity transition-opacity" />
            </div>
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
        </div>
      ))}
    </div>
  );
}

export default EpisodesTab;
