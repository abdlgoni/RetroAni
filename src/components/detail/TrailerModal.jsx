import { X } from 'lucide-react';

function TrailerModal({ isOpen, onClose, trailer, title }) {
  if (!isOpen || !trailer?.embed_url) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-background border-2 border-primary shadow-[0_0_60px_rgba(255,45,120,0.4)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 font-pixel text-[10px] text-primary hover:text-accent transition-colors flex items-center gap-3 py-2"
        >
          CLOSE <X size={18} />
        </button>
        <div className="aspect-video bg-black">
          <iframe
            src={trailer.embed_url.replace('autoplay=1', 'autoplay=0')}
            title={`${title} Trailer`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
