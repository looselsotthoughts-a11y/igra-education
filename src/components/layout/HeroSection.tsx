import { SOURCES } from "@/lib/mockData";

export default function HeroSection() {
  return (
    <section className="mb-10">
      {/* Headline */}
      <div className="mb-8">
        <p className="text-[12px] font-semibold tracking-widest text-[#2D6A4F] uppercase mb-3">
          Free · No login · India-first
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1A1A18] leading-tight mb-4">
          Learn anything,<br />
          <span className="text-[#2D6A4F]">from one place.</span>
        </h1>
        <p className="text-[#4A4A46] text-[16px] leading-relaxed max-w-xl">
          Courses, videos, articles, and exam prep — aggregated from the best
          free sources on the web. Curated for Indian students and learners.
        </p>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-6 mb-8">
        {[
          { value: "5+", label: "Content sources" },
          { value: "100+", label: "Free resources" },
          { value: "8",   label: "Subjects covered" },
          { value: "0₹",  label: "Always free" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="font-display text-2xl font-bold text-[#1A1A18]">{stat.value}</span>
            <span className="text-[12px] text-[#8A8A84] mt-0.5">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Source pills */}
      <div id="sources" className="flex flex-wrap gap-2">
        {SOURCES.map((src) => (
          <a
            key={src.name}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DDD9D0] bg-white text-[13px] text-[#4A4A46] hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
          >
            <span>{src.icon}</span>
            <span className="font-medium">{src.name}</span>
            <span className="text-[#8A8A84]">·</span>
            <span className="text-[#8A8A84]">{src.category}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
