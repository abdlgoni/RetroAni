function DetailTabs({ activeTab, onTabChange }) {
  const tabs = ['EPISODES', 'CHARACTERS', 'REVIEWS'];

  return (
    <div className="flex border-b border-white/10 gap-2 md:gap-8 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
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
  );
}

export default DetailTabs;
