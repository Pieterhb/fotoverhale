"use client";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search, SlidersHorizontal, Image as ImageIcon, Sparkles, X, BookOpen } from "lucide-react";
import { Series, GenreCategory } from "@/types";
import SeriesCard from "./SeriesCard";

interface ArchiveExplorerProps {
  initialSeries: Series[];
}

const CATEGORIES: GenreCategory[] = [
  "Alles",
  "Aksie & Avontuur",
  "Westerns",
  "Speurder & Spioen",
  "Liefde & Romanse",
  "Medies & Hospitaal",
  "Engelse Uitgawes",
];

const ALPHABET = ["Alles", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function ArchiveExplorer({ initialSeries }: ArchiveExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GenreCategory>("Alles");
  const [selectedLetter, setSelectedLetter] = useState<string>("Alles");
  const [onlyWithCovers, setOnlyWithCovers] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"title" | "covers" | "issues">("covers");

  // Setup Fuse.js for instant fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(initialSeries, {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "genre", weight: 0.2 },
        { name: "description", weight: 0.15 },
        { name: "issues.title", weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [initialSeries]);

  // Filtered and Sorted Series
  const filteredSeries = useMemo(() => {
    let list = initialSeries;

    // 1. Search Query
    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery.trim());
      list = results.map((r) => r.item);
    }

    // 2. Category Filter
    if (selectedCategory !== "Alles") {
      if (selectedCategory === "Engelse Uitgawes") {
        list = list.filter((s) => s.language === "Engels");
      } else {
        list = list.filter((s) => s.genre === selectedCategory);
      }
    }

    // 3. A-Z Filter
    if (selectedLetter !== "Alles") {
      list = list.filter((s) => {
        // Strip common prefixes like "Die " or "The " if needed, or check direct first char
        const cleanTitle = s.title.replace(/^(die|the)\s+/i, "");
        return (
          cleanTitle.toUpperCase().startsWith(selectedLetter) ||
          s.title.toUpperCase().startsWith(selectedLetter)
        );
      });
    }

    // 4. Only with covers
    if (onlyWithCovers) {
      list = list.filter((s) => s.total_covers > 0);
    }

    // 5. Sorting
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "covers") {
        if (b.total_covers !== a.total_covers) {
          return b.total_covers - a.total_covers;
        }
        return a.title.localeCompare(b.title, "af");
      }
      if (sortBy === "issues") {
        if (b.issues.length !== a.issues.length) {
          return b.issues.length - a.issues.length;
        }
        return a.title.localeCompare(b.title, "af");
      }
      // title sort
      return a.title.localeCompare(b.title, "af");
    });

    return sorted;
  }, [initialSeries, searchQuery, selectedCategory, selectedLetter, onlyWithCovers, sortBy, fuse]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Alles");
    setSelectedLetter("Alles");
    setOnlyWithCovers(false);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "Alles" ||
    selectedLetter !== "Alles" ||
    onlyWithCovers;

  return (
    <section className="space-y-8" id="galery">
      
      {/* Control Bar Container */}
      <div className="bg-panel rounded-xl border border-panel-border p-4 sm:p-6 shadow-xl space-y-5">
        
        {/* Search Bar & Primary Toggles */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Soek volgens reeksnaam, karakter (bv. Mark Condor, Rocco de Wet, Tessa)..."
              className="w-full bg-graphite/90 border border-panel-border rounded-lg pl-11 pr-10 py-3 text-paper placeholder:text-slate-muted/70 text-sm focus:outline-none focus:border-pulp-amber focus:ring-1 focus:ring-pulp-amber transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-muted hover:text-paper"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            {/* Only With Covers Toggle */}
            <button
              onClick={() => setOnlyWithCovers(!onlyWithCovers)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg border text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                onlyWithCovers
                  ? "bg-pulp-amber/15 border-pulp-amber text-pulp-amber shadow-sm"
                  : "bg-graphite/70 border-panel-border text-slate-muted hover:text-paper hover:bg-graphite"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Slegs met Voorblaaie ({initialSeries.filter(s => s.total_covers > 0).length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center bg-graphite/70 border border-panel-border rounded-lg px-2.5 py-1.5 text-xs text-slate-muted">
              <span className="hidden sm:inline mr-2">Sorteer:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-paper text-xs focus:outline-none cursor-pointer py-1"
              >
                <option value="covers" className="bg-panel text-paper">Meeste Voorblaaie</option>
                <option value="title" className="bg-panel text-paper">Alfabeties (A–Z)</option>
                <option value="issues" className="bg-panel text-paper">Meeste Uitgawes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-slate-muted font-heading uppercase text-xs tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-pulp-amber" />
            Kategorie:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-medium tracking-wide whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-pulp-amber text-graphite border-pulp-amber font-bold shadow-md shadow-pulp-amber/20 scale-105"
                    : "bg-graphite/60 border-panel-border text-slate-muted hover:text-paper hover:border-slate-500"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* A–Z Alphabet Bar */}
        <div className="border-t border-panel-border pt-4">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-muted font-heading uppercase text-[11px] tracking-wider shrink-0 mr-1">
              Indeks:
            </span>
            {ALPHABET.map((letter) => {
              const isActive = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`min-w-[28px] h-7 px-1.5 rounded flex items-center justify-center font-heading text-xs tracking-wider transition-all ${
                    isActive
                      ? "bg-pulp-crimson text-paper font-bold shadow border border-pulp-crimson"
                      : "text-slate-muted hover:text-paper hover:bg-graphite/80"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Results Meta & Reset */}
      <div className="flex items-center justify-between text-xs text-slate-muted px-1">
        <div>
          <span>Wys momenteel </span>
          <strong className="text-pulp-amber font-bold">{filteredSeries.length}</strong>
          <span> van {initialSeries.length} reekse</span>
          {selectedCategory !== "Alles" && (
            <span> in <span className="text-paper">"{selectedCategory}"</span></span>
          )}
          {selectedLetter !== "Alles" && (
            <span> wat begin met <span className="text-paper">"{selectedLetter}"</span></span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-pulp-amber hover:underline flex items-center gap-1 font-medium"
          >
            <X className="w-3 h-3" />
            Herstel alle filters
          </button>
        )}
      </div>

      {/* Series Grid */}
      {filteredSeries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSeries.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-panel/50 rounded-xl border border-panel-border p-8">
          <BookOpen className="w-16 h-16 text-slate-muted/40 mx-auto mb-4" />
          <h3 className="font-heading text-2xl text-paper uppercase mb-2">
            Geen fotoverhale gevind nie
          </h3>
          <p className="text-sm text-slate-muted max-w-md mx-auto mb-6">
            Daar is geen reekse wat ooreenstem met u huidige soekterm of filter-keuses nie. Probeer 'n ander soekterm of herstel die filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 rounded-lg bg-pulp-amber text-graphite font-heading text-sm font-bold uppercase tracking-wider hover:bg-pulp-amber-hover transition-colors"
          >
            Herstel Alle Filters
          </button>
        </div>
      )}

    </section>
  );
}
