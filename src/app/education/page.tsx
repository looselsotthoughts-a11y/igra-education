"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Types
type ContentType = "video" | "course" | "article" | "textbook" | "exam";
type SubjectTag = "science" | "math" | "history" | "coding" | "language" | "geography" | "civics" | "exam";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  source: string;
  source_icon: string;
  type: ContentType;
  subject: SubjectTag;
  url: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  featured?: boolean;
  created_at?: string;
}

const TYPE_STYLES: Record<ContentType, { label: string; bg: string; text: string }> = {
  video:    { label: "Video",    bg: "bg-[#FFE4E6]", text: "text-[#9F1239]" },
  course:   { label: "Course",   bg: "bg-[#DCFCE7]", text: "text-[#166534]" },
  article:  { label: "Article",  bg: "bg-[#FEF9C3]", text: "text-[#854D0E]" },
  textbook: { label: "Textbook", bg: "bg-[#DBEAFE]", text: "text-[#1E40AF]" },
  exam:     { label: "Exam Prep",bg: "bg-[#EDE9FE]", text: "text-[#6D28D9]" },
};

const SUBJECTS = [
  { id: "all",       label: "All",         icon: "📚" },
  { id: "science",   label: "Science",     icon: "🔬" },
  { id: "math",      label: "Math",        icon: "📐" },
  { id: "history",   label: "History",     icon: "🏛️" },
  { id: "coding",    label: "Coding",      icon: "💻" },
  { id: "language",  label: "English",     icon: "📝" },
  { id: "geography", label: "Geography",   icon: "🌍" },
  { id: "civics",    label: "Civics",      icon: "⚖️" },
  { id: "exam",      label: "Exam Prep",   icon: "🎯" },
];

const TYPES = [
  { id: "all",      label: "All types" },
  { id: "video",    label: "Videos" },
  { id: "course",   label: "Courses" },
  { id: "article",  label: "Articles" },
  { id: "textbook", label: "Textbooks" },
  { id: "exam",     label: "Exam Prep" },
];

export default function EducationPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [filtered, setFiltered] = useState<ContentItem[]>([]);
  const [activeSubject, setActiveSubject] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => {
        const data = json.data || [];
        setItems(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = items;
    if (activeSubject !== "all") result = result.filter((i) => i.subject === activeSubject);
    if (activeType !== "all") result = result.filter((i) => i.type === activeType);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [items, activeSubject, activeType, search]);

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#DDD9D0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#1A1A18] flex items-center justify-center">
                <span className="text-white text-xs font-bold">I</span>
              </div>
              <span className="font-display text-[14px] font-bold text-[#1A1A18]">IGRA</span>
            </Link>
            <span className="text-[#DDD9D0]">/</span>
            <span className="text-[13px] font-medium text-[#4A4A46]">Education</span>
          </div>
          <div className="flex-1 max-w-sm relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A84] w-3.5 h-3.5 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics, subjects..."
              className="w-full h-8 pl-8 pr-4 rounded-full border border-[#DDD9D0] bg-white/80 text-[13px] text-[#1A1A18] placeholder:text-[#8A8A84] focus:outline-none focus:border-[#1A1A18] transition-colors"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-widest text-[#8A8A84] uppercase mb-3">
            Education · Ministry of Education · UGC · NCERT · AICTE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A18] leading-tight mb-3">
            Education updates,<br />in plain language.
          </h1>
          <p className="text-[14px] text-[#4A4A46] leading-relaxed max-w-lg">
            Policies, circulars, exam notifications and scheme updates — sourced
            directly from government portals, rewritten clearly, linked back to the official source.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-3">
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button key={s.id} onClick={() => setActiveSubject(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                  activeSubject === s.id
                    ? "bg-[#1A1A18] text-white border-[#1A1A18]"
                    : "bg-white text-[#4A4A46] border-[#DDD9D0] hover:border-[#1A1A18]"
                }`}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {TYPES.map((t) => (
              <button key={t.id} onClick={() => setActiveType(t.id)}
                className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-all ${
                  activeType === t.id
                    ? "bg-[#1A1A18] text-white border-[#1A1A18]"
                    : "bg-white text-[#8A8A84] border-[#DDD9D0] hover:text-[#1A1A18]"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-[14px] text-[#8A8A84]">Loading content...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-semibold text-[16px] text-[#1A1A18] mb-2">No results found</h3>
            <p className="text-[13px] text-[#8A8A84]">Try a different subject or search term.</p>
          </div>
        ) : (
          <>
            <p className="text-[12px] text-[#8A8A84] mb-4">{filtered.length} resource{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => {
                const style = TYPE_STYLES[item.type];
                return (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="group block bg-white border border-[#ECEAE4] rounded-2xl p-5 hover:border-[#1A1A18]/40 transition-all hover:shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
                        {style.label}
                      </span>
                      {item.featured && (
                        <span className="text-[11px] text-[#8A8A84]">★ Curated</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[14px] text-[#1A1A18] leading-snug mb-2 group-hover:underline underline-offset-2">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-[#4A4A46] leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#ECEAE4]">
                      <span className="text-[11px] text-[#8A8A84]">
                        {item.source_icon} {item.source}
                      </span>
                      <div className="flex gap-2 text-[11px] text-[#8A8A84]">
                        {item.duration && <span>{item.duration}</span>}
                        {item.level && <span className="font-medium">{item.level}</span>}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-[#DDD9D0] mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#8A8A84]">
            Content sourced from Ministry of Education, UGC, NCERT, AICTE · Official sources linked on every card
          </p>
          <Link href="/" className="text-[12px] text-[#1A1A18] font-medium hover:underline">
            ← All categories
          </Link>
        </div>
      </footer>
    </div>
  );
}
