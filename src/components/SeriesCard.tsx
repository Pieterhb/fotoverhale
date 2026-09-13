"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Layers, Globe, Search } from "lucide-react";
import { Series } from "@/types";

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasCover = Boolean(series.cover_image && series.total_covers > 0 && !imgError);

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
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* High quality archival catalog placeholder */
          <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center bg-gradient-to-b from-panel via-charcoal to-[#171a21] border-b border-panel-border select-none">
            <div className="w-full flex justify-between items-center text-[10px] text-slate-muted uppercase tracking-widest font-heading">
              <span>{series.language}</span>
              <span className="text-pulp-amber/90 font-mono">{series.publisher || "RP"}</span>
            </div>

            <div className="my-auto px-2">
              <div className="w-12 h-12 rounded-full bg-graphite/80 border border-panel-border flex items-center justify-center mx-auto mb-2 group-hover:border-pulp-amber/60 transition-colors">
                <BookOpen className="w-6 h-6 text-slate-muted group-hover:text-pulp-amber transition-colors" />
              </div>
              <span className="font-heading text-base sm:text-lg font-bold text-paper uppercase tracking-wider block line-clamp-3">
                {series.title}
              </span>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-graphite text-slate-muted border border-panel-border">
                Voorblad Gesoek
              </span>
            </div>

            <div className="text-[10px] text-slate-muted/80 font-mono tracking-tight leading-tight">
              Historiese bibliografie-inskrywing
            </div>
          </div>
        )}

        {/* Badge Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {hasCover ? (
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-graphite/90 text-pulp-amber border border-pulp-amber/40 rounded backdrop-blur shadow-md flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {series.total_covers} {series.total_covers === 1 ? "Voorblad" : "Voorblaaie"}
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-medium bg-graphite/90 text-amber-400 border border-amber-500/40 rounded backdrop-blur shadow">
              Argiefrekord
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

          <p className="text-xs text-slate-muted line-clamp-2 mt-1.5 leading-relaxed font-serif">
            {hasCover 
              ? series.description 
              : "Opgeteken in die meester fotoverhale-indeks deur Koos Papenfus & Carol Hardijzer. Voorblad word tans gesoek deur ons versamelaars."}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-panel-border flex items-center justify-between text-xs text-slate-muted">
          <span className="text-[11px]">
            {series.publisher || "Republikeinse Publikasies"}
          </span>
          <span className="text-pulp-amber group-hover:underline font-medium flex items-center gap-0.5">
            {hasCover ? "Bekyk Reeks →" : "Bekyk Inligting →"}
          </span>
        </div>
      </div>
    </Link>
  );
}
