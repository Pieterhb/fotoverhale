"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, Globe, Building, FileText, Maximize2, Share2 } from "lucide-react";
import { Series } from "@/types";
import Lightbox from "@/components/Lightbox";
import PulpArchiveBanner from "@/components/PulpArchiveBanner";

interface SeriesDetailClientProps {
  series: Series;
}

export default function SeriesDetailClient({ series }: SeriesDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter issues that actually have an image for the lightbox gallery
  const issuesWithImages = series.issues.filter((i) => Boolean(i.image));
  const displayIssues = issuesWithImages.length > 0 ? issuesWithImages : series.issues;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3.5 pb-3 sm:pb-4 space-y-6 sm:space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-muted">
        <Link href="/" className="hover:text-pulp-amber transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Terug na Gallery</span>
        </Link>
        <span>/</span>
        <span>Reekse</span>
        <span>/</span>
        <span className="text-paper font-medium">{series.title}</span>
      </nav>

      {/* Hero Header for Series */}
      <div className="bg-panel rounded-2xl border border-panel-border p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Cover Display (Left Column) */}
          <div className="lg:col-span-1">
            <div 
              onClick={() => displayIssues.length > 0 && openLightbox(0)}
              className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-xl overflow-hidden bg-charcoal border border-panel-border shadow-2xl group cursor-pointer"
            >
              {series.cover_image ? (
                <img
                  src={series.cover_image}
                  alt={`${series.title} - ${series.genre} Fotoverhaal Voorblad`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-panel">
                  <BookOpen className="w-16 h-16 text-pulp-amber/40 mb-3" />
                  <span className="font-heading text-2xl font-bold uppercase text-paper">
                    {series.title}
                  </span>
                </div>
              )}

              {/* Hover overlay hint */}
              {series.cover_image && (
                <div className="absolute inset-0 bg-graphite/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-graphite/90 border border-pulp-amber text-xs font-heading uppercase text-pulp-amber flex items-center gap-2 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                    Klik vir Volskerm-aansig
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details and History Notes (Right Column) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-pulp-amber/20 text-pulp-amber border border-pulp-amber/40 text-xs font-bold uppercase tracking-wider">
                {series.genre}
              </span>
              <span
                className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 border ${
                  series.language === "Afrikaans"
                    ? "bg-red-600 text-white border-red-500 shadow-sm"
                    : "bg-blue-600 text-white border-blue-500 shadow-sm"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {series.language}
              </span>
              {series.publisher && (
                <span className="px-3 py-1 rounded bg-graphite/70 text-slate-muted border border-panel-border text-xs uppercase tracking-wider flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-pulp-amber" />
                  {series.publisher}
                </span>
              )}
              {series.format && (
                <span className="px-3 py-1 rounded bg-graphite/70 text-slate-muted border border-panel-border text-xs uppercase tracking-wider">
                  Formaat: {series.format}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-paper uppercase tracking-tight">
              {series.title}
            </h1>

            {/* Quick stats banner */}
            <div className="flex items-center gap-6 text-sm border-y border-panel-border py-3">
              <div>
                <span className="text-xs text-slate-muted block">Beskikbare Voorblaaie</span>
                <span className="font-heading text-xl font-bold text-pulp-amber">
                  {series.total_covers}
                </span>
              </div>
              <div className="border-l border-panel-border pl-6">
                <span className="text-xs text-slate-muted block">Geregistreerde Uitgawes</span>
                <span className="font-heading text-xl font-bold text-paper">
                  {series.issues.length > 0 ? series.issues.length : "Word opgedateer"}
                </span>
              </div>
            </div>

            {/* Description & Koos Papenfus's historical notes */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg text-paper uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-pulp-amber" />
                Reeks-Agtergrond & Historiese Aantekeninge
              </h3>
              <div className="text-sm text-slate-muted/95 leading-relaxed space-y-3 font-serif bg-graphite/50 p-5 rounded-xl border border-panel-border">
                {series.description ? (
                  series.description.split("\n\n").map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="italic">
                    Hierdie reeks vorm deel van die historiese versameling wat oorspronklik opgestel is deur mnr. Koos Papenfus en mnr. Pieter Haasbroek.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Covers Gallery Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-panel-border pb-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-6 h-6 text-pulp-amber" />
              Voorblaaie & Uitgawes van {series.title}
            </h2>
            <p className="text-xs text-slate-muted mt-1">
              Klik op enige voorblad om dit in volle resolusie in die ligkas te besigtig.
            </p>
          </div>
          <span className="text-xs font-mono text-pulp-amber bg-panel px-3 py-1.5 rounded border border-panel-border">
            {displayIssues.length} {displayIssues.length === 1 ? "Uitgawe" : "Uitgawes"}
          </span>
        </div>

        {displayIssues.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {displayIssues.map((issue, index) => (
              <div
                key={index}
                onClick={() => issue.image && openLightbox(index)}
                className={`group bg-panel rounded-lg border border-panel-border overflow-hidden transition-all duration-300 shadow-md ${
                  issue.image 
                    ? "cursor-pointer hover:border-pulp-amber hover:scale-[1.03]" 
                    : "opacity-80"
                }`}
              >
                <div className="relative aspect-[3/4] bg-charcoal flex items-center justify-center overflow-hidden">
                  {issue.image ? (
                    <img
                      src={issue.image}
                      alt={`${series.title} - Uitgawe #${issue.number || index + 1}: ${issue.title || series.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="p-4 text-center">
                      <BookOpen className="w-8 h-8 text-slate-muted/40 mx-auto mb-2" />
                      <span className="text-xs text-slate-muted font-mono block">
                        Voorblad gesoek
                      </span>
                    </div>
                  )}

                  {/* Issue Number Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-graphite/90 text-pulp-amber border border-pulp-amber/40 text-[11px] font-mono font-bold">
                    #{issue.number}
                  </div>
                </div>

                <div className="p-3">
                  <span className="font-heading text-xs font-bold text-paper block line-clamp-2 uppercase group-hover:text-pulp-amber transition-colors">
                    {issue.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-panel rounded-xl border border-panel-border p-6">
            <BookOpen className="w-12 h-12 text-slate-muted/40 mx-auto mb-3" />
            <h4 className="font-heading text-lg text-paper uppercase">
              Geen individuele voorblaaie tans beskikbaar nie
            </h4>
            <p className="text-xs text-slate-muted max-w-md mx-auto mt-1">
              Hierdie reeks is in die historiese meestertabel opgeteken. As u 'n eksemplaar van hierdie fotoverhaal besit, kontak ons gerus om 'n hoë-resolusie skandering by te dra.
            </p>
          </div>
        )}
      </section>

      {/* Cross-Link to Pulp Books Archive Banner */}
      <PulpArchiveBanner />

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        issues={displayIssues}
        seriesTitle={series.title}
      />

    </div>
  );
}
