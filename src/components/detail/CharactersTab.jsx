function CharactersTab({ characters, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="h-32 bg-surface/20 border border-white/5 animate-pulse flex gap-4 p-4">
            <div className="w-20 h-20 bg-surface/40"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface/40 w-1/2"></div>
              <div className="h-3 bg-surface/40 w-full mt-4"></div>
              <div className="h-3 bg-surface/40 w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="col-span-full text-center py-16 border border-white/5 bg-surface/10">
        <p className="font-pixel text-[10px] text-white/20 uppercase tracking-[2px]">CHARACTER DATA UNAVAILABLE</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {characters.map(({ character, role }) => {
        const formattedName = character.name.split(',').reverse().join(' ').trim();
        return (
          <div 
            key={character.mal_id} 
            className="flex gap-4 p-4 border border-white/10 bg-[#0d0d1a] hover:border-primary transition-colors group"
          >
            {/* Character Image */}
            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 border-2 border-primary overflow-hidden relative bg-surface">
              <img
                src={character.images?.jpg?.image_url}
                alt={formattedName}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Character Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="font-body font-bold text-white text-sm md:text-base uppercase truncate">
                  {formattedName}
                </h3>
                <span className="bg-accent text-background font-pixel text-[8px] px-1.5 py-0.5 uppercase tracking-wider">
                  {role} 
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CharactersTab;
