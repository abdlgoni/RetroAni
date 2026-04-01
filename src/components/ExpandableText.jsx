import { useState } from 'react';

const ExpandableText = ({ text, limit = 200, className = "", buttonClassName = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = text && text.length > limit;
  const displayedText = isExpanded ? text : `${text.slice(0, limit)}...`;

  if (!text) return null;

  return (
    <>
      <p className={className}>
        {shouldShowButton ? displayedText : text}
      </p>
      {shouldShowButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={buttonClassName || "ml-2 font-pixel text-[10px] text-accent hover:text-primary transition-colors tracking-widest uppercase inline-block mt-2 md:mt-0"}
        >
          [{isExpanded ? 'SHOW LESS' : 'SHOW MORE'}]
        </button>
      )}
    </>
  );
};

export default ExpandableText;
