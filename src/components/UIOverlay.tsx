import { useState } from 'react';

interface UIOverlayProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export default function UIOverlay({ onScrollLeft, onScrollRight }: UIOverlayProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Navigation Controls - Positioned at vertical center */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-4">
        {/* Left Arrow Button */}
        <button
          onClick={onScrollLeft}
          onMouseEnter={() => setHoveredButton('left')}
          onMouseLeave={() => setHoveredButton(null)}
          className="group pointer-events-auto relative"
        >
          <div className={`
            w-20 h-20 flex items-center justify-center
            bg-black/40 backdrop-blur-sm
            border-2
            transition-all duration-300
            ${hoveredButton === 'left'
              ? 'border-neon-cyan scale-110 shadow-[0_0_30px_rgba(0,255,255,0.7)]'
              : 'border-neon-cyan/40 hover:border-neon-cyan/80'
            }
          `}
          style={{
            clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 50%)'
          }}>
            <svg
              className="w-10 h-10 text-neon-cyan transition-transform group-hover:-translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={4}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={onScrollRight}
          onMouseEnter={() => setHoveredButton('right')}
          onMouseLeave={() => setHoveredButton(null)}
          className="group pointer-events-auto relative"
        >
          <div className={`
            w-20 h-20 flex items-center justify-center
            bg-black/40 backdrop-blur-sm
            border-2
            transition-all duration-300
            ${hoveredButton === 'right'
              ? 'border-neon-cyan scale-110 shadow-[0_0_30px_rgba(0,255,255,0.7)]'
              : 'border-neon-cyan/40 hover:border-neon-cyan/80'
            }
          `}
          style={{
            clipPath: 'polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%)'
          }}>
            <svg
              className="w-10 h-10 text-neon-cyan transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={4}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Bottom Right Hint */}
      <div className="absolute bottom-6 right-6 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-neon-cyan/30 px-4 py-2 rounded-lg">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse delay-150"></div>
          </div>
          <p className="font-orbitron text-xs text-neon-cyan/70 tracking-wide">
            Scroll between shops
          </p>
        </div>
      </div>
    </div>
  );
}
