"use client";
import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import { Search, SlidersHorizontal, Image as ImageIcon, X, BookOpen, Info, ArrowDown, Sparkles } from "lucide-react";
import { Series, GenreCategory, BookItem } from "@/types";
import BookCard from "./BookCard";

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
const PAGE_SIZE = 50;

export default function ArchiveExplorer({ initialSeries }: ArchiveExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GenreCategory>("Alles");
  const [selectedLetter, setSelectedLetter] = useState<string>("Alles");
  const [sortBy, setSortBy] = useState<"alphabetical" | "genre-language" | "issue" | "reverse">("alphabetical");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Flatten all 111 series into individual book items (total 462 books)
  const allBooks = useMemo<BookItem[]>(() => {
    const books: BookItem[] = [];
    for (const s of initialSeries) {
      if (s.issues && s.issues.length > 0) {
        for (const iss of s.issues) {
          books.push({
            id: `${s.id}-${iss.number || 1}`,
            seriesId: s.id,
            seriesTitle: s.title,
            issueNumber: iss.number || 1,
            issueTitle: iss.title || `Nr. ${iss.number || 1}`,
            image: iss.image || s.cover_image || "",
            genre: s.genre,
            language: s.language,
            publisher: s.publisher,
            format: s.format,
            seriesDescription: s.description,
            totalCoversInSeries: s.total_covers || s.issues.length,
            aliases: s.aliases,
          });
        }
      } else {
        books.push({
          id: `${s.id}-1`,
          seriesId: s.id,
          seriesTitle: s.title,
          issueNumber: 1,
          issueTitle: s.title,
          image: s.cover_image || "",
          genre: s.genre,
          language: s.language,
          publisher: s.publisher,
          format: s.format,
          seriesDescription: s.description,
          totalCoversInSeries: s.total_covers || 1,
          aliases: s.aliases,
        });
      }
    }
    return books;
  }, [initialSeries]);

  // Setup Fuse.js for instant fuzzy search across all 462 books
  const fuse = useMemo(() => {
    return new Fuse(allBooks, {
      keys: [
        { name: "seriesTitle", weight: 0.5 },
        { name: "issueTitle", weight: 0.4 },
        { name: "aliases", weight: 0.3 },
        { name: "genre", weight: 0.2 },
        { name: "publisher", weight: 0.15 },
        { name: "seriesDescription", weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [allBooks]);

  // Reset pagination count whenever filters or search query change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, selectedCategory, selectedLetter, sortBy]);

  // Filtered and Sorted Books
  const filteredBooks = useMemo(() => {
    let list = allBooks;

    // 1. Search Query
    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery.trim());
      list = results.map((r) => r.item);
    }

    // 2. Category Filter
    if (selectedCategory !== "Alles") {
      if (selectedCategory === "Engelse Uitgawes") {
        list = list.filter((b) => b.language === "Engels");
      } else {
        list = list.filter((b) => b.genre === selectedCategory);
      }
    }

    // 3. A-Z Filter (Alphabetical Index)
    if (selectedLetter !== "Alles") {
      list = list.filter((b) => {
        const cleanTitle = b.seriesTitle.replace(/^(die|the)\s+/i, "");
        const titleMatch = (
          cleanTitle.toUpperCase().startsWith(selectedLetter) ||
          b.seriesTitle.toUpperCase().startsWith(selectedLetter)
        );
        const aliasMatch = Boolean(
          b.aliases &&
          b.aliases.some((a: string) => {
            const cleanAlias = a.replace(/^(die|the)\s+/i, "");
            return (
              cleanAlias.toUpperCase().startsWith(selectedLetter) ||
              a.toUpperCase().startsWith(selectedLetter)
            );
          })
        );
        return titleMatch || aliasMatch;
      });
    }

    // 4. Sorting
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "alphabetical") {
        const titleDiff = a.seriesTitle.localeCompare(b.seriesTitle, "af");
        if (titleDiff !== 0) return titleDiff;
        return a.issueNumber - b.issueNumber;
      }
      if (sortBy === "genre-language") {
        const genreDiff = a.genre.localeCompare(b.genre, "af");
        if (genreDiff !== 0) return genreDiff;

        const langRank = (lang: string) => (lang === "Afrikaans" ? 0 : 1);
        const langDiff = langRank(a.language) - langRank(b.language);
        if (langDiff !== 0) return langDiff;

        const titleDiff = a.seriesTitle.localeCompare(b.seriesTitle, "af");
        if (titleDiff !== 0) return titleDiff;
        return a.issueNumber - b.issueNumber;
      }
      if (sortBy === "issue") {
        if (a.issueNumber !== b.issueNumber) {
          return a.issueNumber - b.issueNumber;
        }
        return a.seriesTitle.localeCompare(b.seriesTitle, "af");
      }
      if (sortBy === "reverse") {
        const titleDiff = b.seriesTitle.localeCompare(a.seriesTitle, "af");
        if (titleDiff !== 0) return titleDiff;
        return a.issueNumber - b.issueNumber;
      }
      return 0;
    });

    return sorted;
  }, [allBooks, searchQuery, selectedCategory, selectedLetter, sortBy, fuse]);

  // Paginated books slice
  const displayedBooks = useMemo(() => {
    return filteredBooks.slice(0, visibleCount);
  }, [filteredBooks, visibleCount]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Alles");
    setSelectedLetter("Alles");
    setSortBy("alphabetical");
    setVisibleCount(PAGE_SIZE);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "Alles" ||
    selectedLetter !== "Alles";

  const totalBooksCount = allBooks.length;
  const hasMore = visibleCount < filteredBooks.length;
  const remainingCount = filteredBooks.length - displayedBooks.length;

  return (
    <section className="space-y-6" id="gallery">
      
      {/* Gallery Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-panel-border pb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pulp-amber text-graphite font-heading text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md shadow-pulp-amber/20">
            <ImageIcon className="w-4 h-4" />
            <span>Verken al {totalBooksCount} boeke hier</span>
          </div>
        </div>

        <div className="text-xs text-slate-muted hidden md:flex items-center gap-1.5 font-mono">
          <Info className="w-3.5 h-3.5 text-pulp-amber" />
          <span>Gesorteer volgens A–Z Alfabetiese Indeks ({totalBooksCount} Voorblaaie)</span>
        </div>
      </div>

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
              placeholder="Soek volgens reeksnaam, boek-titel, karakter (bv. Mark Condor, Rocco de Wet, Tessa)..."
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
              <option value="alphabetical" className="bg-panel text-paper">Alfabeties (A–Z)</option>
              <option value="genre-language" className="bg-panel text-paper">Genre &amp; Taal (A–Z)</option>
              <option value="issue" className="bg-panel text-paper">Uitgawe Nommer</option>
              <option value="reverse" className="bg-panel text-paper">Alfabeties (Z–A)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
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
          <div className="flex items-center justify-center gap-1 overflow-x-auto pb-1 text-xs flex-wrap">
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-muted px-1 gap-2">
        <div>
          <span>Wys momenteel </span>
          <strong className="text-pulp-amber font-bold">{displayedBooks.length}</strong>
          <span> van </span>
          <strong className="text-paper font-bold">{filteredBooks.length}</strong>
          <span> boeke {filteredBooks.length === totalBooksCount ? `(al ${totalBooksCount} boeke)` : ""}</span>
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
            className="text-pulp-amber hover:underline flex items-center gap-1 font-medium self-end sm:self-auto"
          >
            <X className="w-3 h-3" />
            Herstel alle filters
          </button>
        )}
      </div>

      {/* Books Grid (50 initially, +50 per click) */}
      {displayedBooks.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Load More Button (Kliek hier vir meer) */}
          {hasMore ? (
            <div className="flex flex-col items-center justify-center pt-6 pb-2 space-y-3">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-pulp-amber to-amber-500 hover:from-amber-400 hover:to-pulp-amber text-graphite font-heading text-sm sm:text-base font-bold uppercase tracking-wider shadow-xl hover:shadow-pulp-amber/30 transition-all duration-200 flex items-center gap-3 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Kliek hier vir meer</span>
                <span className="px-2 py-0.5 rounded bg-graphite/20 text-graphite text-xs font-mono font-black">
                  +{Math.min(PAGE_SIZE, remainingCount)}
                </span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <p className="text-xs text-slate-muted font-mono">
                Wys {displayedBooks.length} van {filteredBooks.length} boeke ({remainingCount} oor)
              </p>
            </div>
          ) : (
            filteredBooks.length > PAGE_SIZE && (
              <div className="text-center py-6 text-xs text-slate-muted font-mono border-t border-panel-border/60">
                ✓ Alle {filteredBooks.length} boeke word vertoon
              </div>
            )
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-panel/50 rounded-xl border border-panel-border p-8">
          <BookOpen className="w-16 h-16 text-slate-muted/40 mx-auto mb-4" />
          <h3 className="font-heading text-2xl text-paper uppercase mb-2">
            Geen fotoverhale gevind nie
          </h3>
          <p className="text-sm text-slate-muted max-w-md mx-auto mb-6">
            Daar is geen boeke wat ooreenstem met u huidige keuses nie.
          </p>
          <div className="flex justify-center">
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-lg bg-pulp-amber text-graphite font-heading text-sm font-bold uppercase tracking-wider hover:bg-pulp-amber-hover transition-colors"
            >
              Herstel Alle Filters
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
