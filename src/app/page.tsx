"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import FilterBar from "@/components/ui/FilterBar";
import ContentGrid from "@/components/cards/ContentGrid";
import Footer from "@/components/layout/Footer";
import { ContentItem } from "@/lib/types";
import { MOCK_CONTENT } from "@/lib/mockData";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("all");
  const [items, setItems] = useState<ContentItem[]>(MOCK_CONTENT);
  const [filtered, setFiltered] = useState<ContentItem[]>(MOCK_CONTENT);

  const applyFilters = useCallback(() => {
    let result = items;
    if (activeFilter !== "all") {
      result = result.filter((i) => i.subject === activeFilter);
    }
    if (contentType !== "all") {
      result = result.filter((i) => i.type === contentType);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.subject.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [items, activeFilter, searchQuery, contentType]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <HeroSection />
        <FilterBar
          activeSubject={activeFilter}
          activeType={contentType}
          onSubjectChange={setActiveFilter}
          onTypeChange={setContentType}
        />
        <ContentGrid items={filtered} />
      </main>
      <Footer />
    </div>
  );
}
