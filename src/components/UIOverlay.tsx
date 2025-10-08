import { useState } from 'react';

interface Street {
  id: string;
  name: string;
}

interface UIOverlayProps {
  onStreetLeft: () => void;
  onStreetRight: () => void;
  currentStreet: string;
  allStreets: Street[];
  onStreetSelect: (streetName: string) => void;
}

export default function UIOverlay({
  onStreetLeft,
  onStreetRight,
  currentStreet,
  allStreets,
  onStreetSelect
}: UIOverlayProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Bar - Street Dropdown and Name */}
      <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6">
        {/* Dropdown Street Selector */}
        <div className="relative pointer-events-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border-2 border-neon-cyan/40 hover:border-neon-cyan px-4 py-2 rounded-lg transition-all"
          >
            <svg className="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-orbitron text-xs text-neon-cyan tracking-wide">STREETS</span>
            <svg
              className={`w-4 h-4 text-neon-cyan transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 left-0 min-w-[280px] bg-black/90 backdrop-blur-sm border-2 border-neon-cyan/40 rounded-lg overflow-hidden z-50">
              {allStreets.map((street) => (
                <button
                  key={street.id}
                  onClick={() => {
                    onStreetSelect(street.name);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left font-orbitron text-sm transition-all ${
                    currentStreet === street.name
                      ? 'bg-neon-cyan/20 text-neon-cyan border-l-4 border-neon-cyan'
                      : 'text-neon-cyan/70 hover:bg-neon-cyan/10 hover:text-neon-cyan border-l-4 border-transparent'
                  }`}
                >
                  {street.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Street Name Display */}
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-neon-cyan/30 px-6 py-2 rounded-lg">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse delay-150"></div>
          </div>
          <p className="font-orbitron text-sm text-neon-cyan tracking-wide uppercase font-bold">
            {currentStreet}
          </p>
        </div>
      </div>

      {/* Navigation Controls - Positioned at vertical center */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-4">
        {/* Left Arrow Button */}
        <button
          onClick={onStreetLeft}
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
          onClick={onStreetRight}
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
            Click shop to explore
          </p>
        </div>
      </div>
    </div>
  );
}
