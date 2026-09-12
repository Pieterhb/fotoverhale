"use client";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Layers, Globe } from "lucide-react";
import { Series } from "@/types";

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const hasCover = Boolean(series.cover_image);

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

  return (
    <Link
      href={`/reeks/${series.id}`}
      className="group flex flex-col bg-panel rounded-lg border border-panel-border overflow-hidden hover:border-pulp-amber/60 transition-all duration-300 hover:scale-[1.02] shadow-pulp hover:shadow-pulp-amber flex-1"
    >
      {/* Cover Container */}
      <div className="relative aspect-[3/4] w-full bg-charcoal overflow-hidden flex items-center justify-center">
        {hasCover && series.cover_image ? (
          <img
            src={series.cover_image}
            alt={series.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // Fallback to placeholder if broken
              e.currentTarget.style.display = 'none';
              const placeholder = e.currentTarget.parentElement?.querySelector('.cover-placeholder');
              if (placeholder) {
                (placeholder as HTMLElement).style.display = 'flex';
              }
            }}
          />
        ) : null}

        {/* Fallback Retro Cover Placeholder if no image */}
        <div
          className={`cover-placeholder w-full h-full p-4 flex flex-col justify-between items-center text-center bg-gradient-to-b from-panel to-charcoal border-b border-panel-border ${
            hasCover ? "hidden" : "flex"
          }`}
        >
          <div className="w-full flex justify-between items-center text-[10px] text-slate-muted uppercase tracking-widest font-heading">
            <span>{series.language}</span>
            <span>{series.publisher || "RP"}</span>
          </div>
          <div className="my-auto">
            <BookOpen className="w-10 h-10 text-pulp-amber/50 mx-auto mb-2 group-hover:text-pulp-amber transition-colors" />
            <span className="font-heading text-lg font-bold text-paper uppercase tracking-wider block line-clamp-3">
              {series.title}
            </span>
          </div>
          <div className="text-[11px] text-pulp-amber/90 font-mono tracking-wider">
            {series.issues.length > 0 ? `${series.issues.length} Uitgawes gelys` : "Katalogus-inskrywing"}
          </div>
        </div>

        {/* Badge Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {series.total_covers > 0 ? (
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-graphite/90 text-pulp-amber border border-pulp-amber/40 rounded backdrop-blur shadow-md flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {series.total_covers} {series.total_covers === 1 ? "Voorblad" : "Voorblaaie"}
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-medium bg-graphite/80 text-slate-muted border border-panel-border rounded backdrop-blur">
              {series.issues.length} {series.issues.length === 1 ? "Titel" : "Titels"}
            </span>
          )}
        </div>

        {/* Language Badge on bottom left of cover */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-graphite/85 text-paper-muted border border-panel-border rounded backdrop-blur">
            {series.language}
          </span>
        </div>
      </div>

      {/* Series Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-medium border rounded uppercase tracking-wider ${getGenreColor(series.genre)}`}>
              {series.genre}
            </span>
          </div>

          <h3 className="font-heading text-lg font-bold text-paper tracking-wide uppercase line-clamp-1 group-hover:text-pulp-amber transition-colors">
            {series.title}
          </h3>

          <p className="text-xs text-slate-muted line-clamp-2 mt-1.5 leading-relaxed">
            {series.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-panel-border flex items-center justify-between text-xs text-slate-muted">
          <span className="text-[11px]">
            {series.publisher || "Republikeinse Publikasies"}
          </span>
          <span className="text-pulp-amber group-hover:underline font-medium flex items-center gap-0.5">
            Bekyk Reeks &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
