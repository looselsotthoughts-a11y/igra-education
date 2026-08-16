"use client";

interface HeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

export default function Header({ onSearch, searchQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#DDD9D0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] flex items-center justify-center">
            <span className="text-white text-sm font-bold">I</span>
          </div>
          <div className="leading-none">
            <span className="font-display text-[15px] font-bold text-[#1A1A18]">IGRA</span>
            <span className="text-[#8A8A84] text-[13px] ml-1.5 font-medium hidden sm:inline">Education</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A84] w-4 h-4 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search topics, subjects, sources..."
            className="w-full h-9 pl-9 pr-4 rounded-full border border-[#DDD9D0] bg-white/80 text-[14px] text-[#1A1A18] placeholder:text-[#8A8A84] focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-colors"
          />
        </div>

        {/* Right actions */}
        <nav className="flex items-center gap-4 shrink-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#4A4A46] hover:text-[#1A1A18] transition-colors hidden sm:block"
          >
            GitHub
          </a>
          <a
            href="#sources"
            className="text-[13px] font-medium text-white bg-[#2D6A4F] px-4 py-1.5 rounded-full hover:bg-[#235c44] transition-colors"
          >
            Sources
          </a>
        </nav>
      </div>
    </header>
  );
}
