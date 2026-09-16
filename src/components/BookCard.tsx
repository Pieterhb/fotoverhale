"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";
import { BookItem } from "@/types";
import { generateIssueAlt } from "@/lib/seo-helpers";

interface BookCardProps {
  book: BookItem;
}

export default function BookCard({ book }: BookCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasCover = Boolean(book.image && !imgError);

  // Genre badge color mapping
  const getGenreColor = (genre: string) => {
    switch (genre) {
      case "Westerns":
        return "bg-amber-900/60 text-amber-300 border-amber-700/50";
      case "Speurder & Spioen":
        return "bg-cyan-950/70 text-cyan-300 border-cyan-800/50";
      case "Liefde & Romanse":
        return "bg-rose-950/70 text-rose-300 border-rose-800/50";
      case "Medies & Hospitaal":
        return "bg-emerald-950/70 text-emerald-300 border-emerald-800/50";
      default:
        return "bg-red-950/70 text-red-300 border-red-800/50";
    }
  };

  // Determine issue display title
  const isGenericTitle = !book.issueTitle || 
    book.issueTitle.toLowerCase() === "no title" || 
    book.issueTitle.toLowerCase() === "geen titel" ||
    book.issueTitle.toLowerCase() === `nr. ${book.issueNumber}` ||
    book.issueTitle.toLowerCase() === `nr ${book.issueNumber}`;

  return (
    <Link
      href={`/reeks/${book.seriesId}`}
      className="group flex flex-col bg-panel rounded-lg border border-panel-border overflow-hidden hover:border-pulp-amber/60 transition-all duration-300 hover:scale-[1.02] shadow-pulp hover:shadow-pulp-amber flex-1"
    >
      {/* Cover Container */}
      <div className="relative aspect-[3/4] w-full bg-charcoal overflow-hidden flex items-center justify-center">
        {hasCover ? (
          <img
            src={book.image}
            alt={book.alt || generateIssueAlt(book.seriesTitle, { number: book.issueNumber, title: book.issueTitle, alt: book.alt }, book.language, book.genre, book.publisher)}
            width={300}
            height={400}
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Archival catalog placeholder */
          <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center bg-gradient-to-b from-panel via-charcoal to-[#171a21] border-b border-panel-border select-none">
            <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-heading">
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                  book.language === "Afrikaans"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white border border-blue-400/40"
                }`}
              >
                {book.language}
              </span>
              <span className="text-pulp-amber/90 font-mono">{book.publisher || "RP"}</span>
            </div>

            <div className="my-auto px-2">
              <div className="w-12 h-12 rounded-full bg-graphite/80 border border-panel-border flex items-center justify-center mx-auto mb-2 group-hover:border-pulp-amber/60 transition-colors">
                <BookOpen className="w-6 h-6 text-slate-muted group-hover:text-pulp-amber transition-colors" />
              </div>
              <span className="font-heading text-base sm:text-lg font-bold text-paper uppercase tracking-wider block line-clamp-2">
                {book.seriesTitle}
              </span>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-graphite text-slate-muted border border-panel-border">
                Uitgawe #{book.issueNumber}
              </span>
            </div>

            <div className="text-[10px] text-slate-muted/80 font-mono tracking-tight leading-tight">
              Historiese bibliografie-inskrywing
            </div>
          </div>
        )}

        {/* Issue Number Badge Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-graphite/90 text-pulp-amber border border-pulp-amber/40 rounded backdrop-blur shadow-md flex items-center gap-1 font-mono">
            {book.issueNumber > 0 ? `Nr. ${book.issueNumber}` : "Voorblad"}
          </span>
        </div>

        {/* Language Badge on bottom left of cover */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span
            className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase border rounded shadow-md ${
              book.language === "Afrikaans"
                ? "bg-red-600 text-white border-red-500"
                : "bg-blue-600 text-white border-blue-500"
            }`}
          >
            {book.language}
          </span>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-medium border rounded uppercase tracking-wider ${getGenreColor(book.genre)}`}>
              {book.genre}
            </span>
            {book.totalCoversInSeries > 1 && (
              <span className="text-[10px] text-slate-muted flex items-center gap-0.5">
                <Layers className="w-2.5 h-2.5 text-pulp-amber" />
                {book.totalCoversInSeries} in reeks
              </span>
            )}
          </div>

          <h3 className="font-heading text-base sm:text-lg font-bold text-paper tracking-wide uppercase line-clamp-1 group-hover:text-pulp-amber transition-colors">
            {book.seriesTitle}
          </h3>

          <p className="text-xs text-amber-200/90 font-medium line-clamp-1 mt-0.5">
            {isGenericTitle ? `Uitgawe #${book.issueNumber}` : book.issueTitle}
          </p>

          <p className="text-xs text-slate-muted line-clamp-2 mt-1.5 leading-relaxed font-serif">
            {book.seriesDescription || "Opgeteken in die Suid-Afrikaanse Fotoverhale Argief."}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-panel-border flex items-center justify-between text-xs text-slate-muted">
          <span className="text-[11px] truncate max-w-[130px]">
            {book.publisher || "Republikeinse Publikasies"}
          </span>
          <span className="text-pulp-amber group-hover:underline font-medium flex items-center gap-0.5 shrink-0">
            Bekyk Reeks →
          </span>
        </div>
      </div>
    </Link>
  );
}
