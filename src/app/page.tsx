import Link from "next/link";

const CATEGORIES = [
  {
    slug: "education",
    label: "Education",
    icon: "📚",
    description: "Ministry of Education, UGC, AICTE, NCERT circulars and policy updates.",
    sources: ["Ministry of Education", "UGC", "AICTE", "NCERT"],
    status: "live",
  },
  {
    slug: "transport",
    label: "Transport & Vehicles",
    icon: "🚗",
    description: "Parivahan, VAHAN, SARATHI — driving licences, vehicle registration, traffic rules.",
    sources: ["Parivahan", "VAHAN", "SARATHI"],
    status: "soon",
  },
  {
    slug: "finance",
    label: "Finance & Tax",
    icon: "💰",
    description: "Income Tax portal, GST, MCA — filings, deadlines, policy changes.",
    sources: ["Income Tax", "GST Portal", "MCA"],
    status: "soon",
  },
  {
    slug: "health",
    label: "Health",
    icon: "🏥",
    description: "NHP, CGHS, Aarogya Setu — health schemes, advisories, policy updates.",
    sources: ["NHP", "CGHS", "Aarogya Setu"],
    status: "soon",
  },
  {
    slug: "jobs",
    label: "Jobs & Career",
    icon: "💼",
    description: "NCS Portal, UPSC, SSC — exam dates, notifications, recruitment.",
    sources: ["NCS Portal", "UPSC", "SSC"],
    status: "soon",
  },
  {
    slug: "welfare",
    label: "Welfare Schemes",
    icon: "🏛️",
    description: "MyScheme, PM portals — eligibility, deadlines, application links.",
    sources: ["MyScheme", "PM India", "JAM"],
    status: "soon",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#DDD9D0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1A1A18] flex items-center justify-center">
              <span className="text-white text-sm font-bold">I</span>
            </div>
            <span className="font-display text-[15px] font-bold text-[#1A1A18]">IGRA</span>
            <span className="text-[#8A8A84] text-[13px] hidden sm:block">India Governance Research & Aggregation</span>
          </div>
          <a
            href="https://github.com/looselsotthoughts-a11y/igra-education"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#4A4A46] hover:text-[#1A1A18] transition-colors"
          >
            GitHub →
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

        {/* Hero */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold tracking-widest text-[#8A8A84] uppercase mb-4">
            Free · No login · India-first
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1A1A18] leading-tight mb-5">
            Government information,<br />
            finally readable.
          </h1>
          <p className="text-[16px] text-[#4A4A46] leading-relaxed max-w-xl">
            IGRA monitors Indian government portals and rewrites their
            content in plain language — automatically. No jargon,
            no broken navigation, no PDFs. Just clear information
            with links back to the official source.
          </p>
        </div>

        {/* Category grid */}
        <p className="text-[11px] font-semibold tracking-widest text-[#8A8A84] uppercase mb-5">
          Browse by category
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            cat.status === "live" ? (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group block bg-white border border-[#ECEAE4] rounded-2xl p-6 hover:border-[#1A1A18] transition-all hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#1A1A18] text-white">
                    Live
                  </span>
                </div>
                <h2 className="font-semibold text-[16px] text-[#1A1A18] mb-2 group-hover:underline underline-offset-2">
                  {cat.label}
                </h2>
                <p className="text-[13px] text-[#4A4A46] leading-relaxed mb-4">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.sources.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-full border border-[#ECEAE4] text-[#8A8A84]">
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ) : (
              <div
                key={cat.slug}
                className="block bg-white border border-[#ECEAE4] rounded-2xl p-6 opacity-50 cursor-not-allowed"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#ECEAE4] text-[#8A8A84]">
                    Coming soon
                  </span>
                </div>
                <h2 className="font-semibold text-[16px] text-[#1A1A18] mb-2">{cat.label}</h2>
                <p className="text-[13px] text-[#4A4A46] leading-relaxed mb-4">{cat.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.sources.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-full border border-[#ECEAE4] text-[#8A8A84]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDD9D0] mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#8A8A84]">
            © 2026 IGRA · Content sourced from official government portals · Not affiliated with any government body
          </p>
          <a
            href="https://github.com/looselsotthoughts-a11y/igra-education"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#1A1A18] font-medium hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      </footer>
    </div>
  );
}
