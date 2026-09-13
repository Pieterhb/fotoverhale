"use client";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search, SlidersHorizontal, Image as ImageIcon, Sparkles, X, BookOpen, Layers, Info, HelpCircle } from "lucide-react";
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
  
  // Default to TRUE so visitors immediately see the series with actual covers!
  const [onlyWithCovers, setOnlyWithCovers] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"genre-language" | "title" | "covers" | "issues">("genre-language");

  // Count statistics
  const totalWithCovers = useMemo(() => {
    return initialSeries.filter((s) => s.total_covers > 0).length;
  }, [initialSeries]);

  const totalWithoutCovers = useMemo(() => {
    return initialSeries.filter((s) => s.total_covers === 0).length;
  }, [initialSeries]);

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
      if (sortBy === "genre-language") {
        const genreDiff = a.genre.localeCompare(b.genre, "af");
        if (genreDiff !== 0) return genreDiff;

        const langRank = (lang: string) => (lang === "Afrikaans" ? 0 : 1);
        const langDiff = langRank(a.language) - langRank(b.language);
        if (langDiff !== 0) return langDiff;

        return a.title.localeCompare(b.title, "af");
      }
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
      return a.title.localeCompare(b.title, "af");
    });

    return sorted;
  }, [initialSeries, searchQuery, selectedCategory, selectedLetter, onlyWithCovers, sortBy, fuse]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Alles");
    setSelectedLetter("Alles");
    setOnlyWithCovers(true);
    setSortBy("genre-language");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "Alles" ||
    selectedLetter !== "Alles" ||
    !onlyWithCovers;

  return (
    <section className="space-y-6" id="gallery">
      
      {/* View Switcher Tabs (Gallery met Voorblaaie vs Alle Reekse) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-panel-border pb-4">
        
        {/* Main View Tabs */}
        <div className="flex items-center p-1 bg-panel rounded-xl border border-panel-border w-full sm:w-auto">
          <button
            onClick={() => setOnlyWithCovers(true)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-heading uppercase tracking-wider transition-all ${
              onlyWithCovers
                ? "bg-pulp-amber text-graphite font-bold shadow-md shadow-pulp-amber/20"
                : "text-slate-muted hover:text-paper"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery met Voorblaaie ({totalWithCovers})</span>
          </button>

          <button
            onClick={() => setOnlyWithCovers(false)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-heading uppercase tracking-wider transition-all ${
              !onlyWithCovers
                ? "bg-pulp-amber text-graphite font-bold shadow-md shadow-pulp-amber/20"
                : "text-slate-muted hover:text-paper"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Volledige Meesterlys ({initialSeries.length})</span>
          </button>
        </div>

        {/* Informational helper badge */}
        <div className="text-xs text-slate-muted hidden md:flex items-center gap-1.5 font-mono">
          <Info className="w-3.5 h-3.5 text-pulp-amber" />
          {onlyWithCovers ? (
            <span>Wys slegs reekse met afgelaaide voorblaaie</span>
          ) : (
            <span>Sluit ook historiese rekords in waarvan voorblaaie gesoek word</span>
          )}
        </div>

      </div>

      {/* Notice Banner when viewing full list with missing covers */}
      {!onlyWithCovers && (
        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-200/90 font-serif leading-relaxed">
          <HelpCircle className="w-5 h-5 text-pulp-amber shrink-0 mt-0.5" />
          <div>
            <strong className="text-pulp-amber font-heading uppercase tracking-wider block text-xs mb-0.5">
              Historiese Argieflys Inligting:
            </strong>
            Van die {initialSeries.length} geregistreerde reekse in mnr. Koos Papenfus & Carol Hardijzer se argiewe, het <strong>{totalWithCovers} reekse tans geskandeerde voorblaaie ({initialSeries.reduce((a, s) => a + s.total_covers, 0)} beelde)</strong>. Die orige {totalWithoutCovers} reekse is belangrike historiese bibliografiese inskrywings waarvan ons versamelaars steeds soek na oorspronklike voorblaaie.
          </div>
        </div>
      )}

      {/* Control Bar Container */}
      <div className="bg-panel rounded-xl border border-panel-border p-4 sm:p-6 shadow-xl space-y-5">
        
        {/* Search Bar & Sort Dropdown */}
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

          {/* Sort Dropdown */}
          <div className="flex items-center bg-graphite/70 border border-panel-border rounded-lg px-3 py-2 text-xs text-slate-muted self-end sm:self-auto">
            <span className="hidden sm:inline mr-2">Sorteer:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-paper text-xs focus:outline-none cursor-pointer py-1 font-medium"
            >
              <option value="genre-language" className="bg-panel text-paper">Genre &amp; Taal (A–Z)</option>
              <option value="title" className="bg-panel text-paper">Alfabeties (A–Z)</option>
              <option value="covers" className="bg-panel text-paper">Meeste Voorblaaie</option>
              <option value="issues" className="bg-panel text-paper">Meeste Uitgawes</option>
            </select>
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
          <span> van {onlyWithCovers ? totalWithCovers : initialSeries.length} reekse</span>
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
            Daar is geen reekse met voorblaaie wat ooreenstem met u huidige keuses nie.
            {onlyWithCovers && (
              <span className="block mt-2 text-pulp-amber">
                Probeer oorskakel na "Volledige Meesterlys" om ook die historiese bibliografie-rekords te sien.
              </span>
            )}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-lg bg-pulp-amber text-graphite font-heading text-sm font-bold uppercase tracking-wider hover:bg-pulp-amber-hover transition-colors"
            >
              Herstel Alle Filters
            </button>
            {onlyWithCovers && (
              <button
                onClick={() => setOnlyWithCovers(false)}
                className="px-5 py-2.5 rounded-lg bg-panel border border-panel-border text-paper font-heading text-sm font-medium uppercase tracking-wider hover:bg-panel-border transition-colors"
              >
                Wys Volledige Meesterlys
              </button>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
