export default function Footer() {
  return (
    <footer className="border-t border-[#DDD9D0] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#2D6A4F] flex items-center justify-center">
                <span className="text-white text-[11px] font-bold">I</span>
              </div>
              <span className="font-display font-bold text-[14px] text-[#1A1A18]">IGRA Education</span>
            </div>
            <p className="text-[12px] text-[#8A8A84] max-w-xs">
              Free educational content aggregated from the web.
              Built for Indian students. No login, no cost, ever.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[11px] font-semibold text-[#8A8A84] uppercase tracking-wider mb-1">Sources</span>
            {["Khan Academy", "YouTube EDU", "Wikipedia", "NCERT", "Coursera"].map((src) => (
              <span key={src} className="text-[12px] text-[#4A4A46]">{src}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#ECEAE4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#8A8A84]">
            © 2026 IGRA · Content belongs to respective sources · Not affiliated with any platform
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#2D6A4F] font-medium hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </footer>
  );
}
