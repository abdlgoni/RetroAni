function DetailStats({ anime }) {
  if (!anime) return null;

  return (
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
  );
}

export default DetailStats;
