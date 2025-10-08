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
  onMusicToggle: () => void;
  isMusicPlaying: boolean;
}

export default function UIOverlay({
  onStreetLeft,
  onStreetRight,
  currentStreet,
  allStreets,
  onStreetSelect,
  onMusicToggle,
  isMusicPlaying
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

      </div>

      {/* Centered Street Name Display */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-neon-cyan/30 px-6 py-2 rounded-lg">
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

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
        {/* Music Toggle Button */}
        <button
          onClick={onMusicToggle}
          className="pointer-events-auto group relative"
        >
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border-2 border-neon-cyan/40 hover:border-neon-cyan px-4 py-2 rounded-lg transition-all">
            {isMusicPlaying ? (
              <svg className="w-5 h-5 text-neon-cyan" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-neon-cyan" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
                <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55C7.01 13 5 15.01 5 17.5S7.01 22 10 22c2.49 0 4.5-2.01 4.5-4.5v-2.73l5.73 5.73L21.5 19 4.27 3z"/>
              </svg>
            )}
            <span className="font-orbitron text-xs text-neon-cyan tracking-wide">
              {isMusicPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
            </span>
          </div>
        </button>

        {/* Hint */}
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
