"use client";

import { SUBJECTS } from "@/lib/mockData";
import { ContentType } from "@/lib/types";

const TYPES: { id: ContentType | "all"; label: string }[] = [
  { id: "all",      label: "All types" },
  { id: "video",    label: "Videos" },
  { id: "course",   label: "Courses" },
  { id: "article",  label: "Articles" },
  { id: "textbook", label: "Textbooks" },
  { id: "exam",     label: "Exam Prep" },
];

interface FilterBarProps {
  activeSubject: string;
  activeType: string;
  onSubjectChange: (s: string) => void;
  onTypeChange: (t: string) => void;
}

export default function FilterBar({
  activeSubject,
  activeType,
  onSubjectChange,
  onTypeChange,
}: FilterBarProps) {
  return (
    <div className="mb-8 space-y-3">
      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSubjectChange(s.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
              activeSubject === s.id
                ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                : "bg-white text-[#4A4A46] border-[#DDD9D0] hover:border-[#2D6A4F] hover:text-[#2D6A4F]"
            }`}
          >
            <span className="text-[12px]">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Type filter + result info */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => onTypeChange(t.id)}
              className={`px-3 py-1 rounded-md text-[12px] font-medium border transition-all ${
                activeType === t.id
                  ? "bg-[#1A1A18] text-white border-[#1A1A18]"
                  : "bg-white text-[#8A8A84] border-[#DDD9D0] hover:text-[#1A1A18] hover:border-[#8A8A84]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
