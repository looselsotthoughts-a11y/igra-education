export type ContentType = "video" | "course" | "article" | "textbook" | "exam";
export type SubjectTag =
  | "science"
  | "math"
  | "history"
  | "coding"
  | "language"
  | "exam"
  | "geography"
  | "civics";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceIcon: string;
  type: ContentType;
  subject: SubjectTag;
  url: string;
  duration?: string;  // e.g. "14 min"
  level?: "Beginner" | "Intermediate" | "Advanced";
  featured?: boolean;
}

export interface Subject {
  id: string;
  label: string;
  icon: string;
}

export interface Source {
  name: string;
  icon: string;
  category: string;
  url: string;
}
