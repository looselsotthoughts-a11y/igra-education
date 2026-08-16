import { ContentItem, ContentType } from "@/lib/types";

const TYPE_STYLES: Record<ContentType, { label: string; bg: string; text: string }> = {
  video:    { label: "Video",    bg: "bg-[#FFE4E6]", text: "text-[#9F1239]" },
  course:   { label: "Course",   bg: "bg-[#D8EDDF]", text: "text-[#2D6A4F]" },
  article:  { label: "Article",  bg: "bg-[#FEF3C7]", text: "text-[#B45309]" },
  textbook: { label: "Textbook", bg: "bg-[#DBEAFE]", text: "text-[#1D4ED8]" },
  exam:     { label: "Exam Prep",bg: "bg-[#EDE9FE]", text: "text-[#6D28D9]" },
};

const LEVEL_STYLES = {
  Beginner:     "text-[#2D6A4F]",
  Intermediate: "text-[#B45309]",
  Advanced:     "text-[#9F1239]",
};

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

export default function ContentCard({ item, index }: ContentCardProps) {
  const typeStyle = TYPE_STYLES[item.type];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-lift fade-up group block bg-white border border-[#ECEAE4] rounded-2xl p-5 hover:border-[#2D6A4F]/40 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Top row: type badge + featured */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${typeStyle.bg} ${typeStyle.text}`}>
          {typeStyle.label}
        </span>
        {item.featured && (
          <span className="text-[11px] font-medium text-[#8A8A84] flex items-center gap-1">
            <svg className="w-3 h-3 text-[#B45309]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Curated
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[15px] text-[#1A1A18] leading-snug mb-2 group-hover:text-[#2D6A4F] transition-colors">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-[#4A4A46] leading-relaxed mb-4 line-clamp-2">
        {item.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#ECEAE4]">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px]">{item.sourceIcon}</span>
          <span className="text-[12px] text-[#8A8A84] font-medium">{item.source}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.duration && (
            <span className="text-[11px] text-[#8A8A84]">{item.duration}</span>
          )}
          {item.level && (
            <span className={`text-[11px] font-medium ${LEVEL_STYLES[item.level]}`}>
              {item.level}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
