import { ContentItem } from "@/lib/types";
import ContentCard from "./ContentCard";

interface ContentGridProps {
  items: ContentItem[];
}

export default function ContentGrid({ items }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="font-display text-xl font-bold text-[#1A1A18] mb-2">
          No results found
        </h3>
        <p className="text-[14px] text-[#8A8A84] max-w-xs">
          Try a different subject, content type, or search term.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[12px] text-[#8A8A84] mb-4 font-medium">
        {items.length} resource{items.length !== 1 ? "s" : ""} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <ContentCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
