"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, Globe, Building, FileText, Maximize2, Share2 } from "lucide-react";
import { Series } from "@/types";
import { generateCoverAlt, generateIssueAlt } from "@/lib/seo-helpers";
import Lightbox from "@/components/Lightbox";
import PulpArchiveBanner from "@/components/PulpArchiveBanner";

interface SeriesDetailClientProps {
  series: Series;
  relatedSeries?: Series[];
  contextualParagraphs?: string[];
}

export default function SeriesDetailClient({
  series,
  relatedSeries,
  contextualParagraphs,
}: SeriesDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter issues that actually have an image for the lightbox gallery
  const issuesWithImages = series.issues.filter((i) => Boolean(i.image));
  const displayIssues = issuesWithImages.length > 0 ? issuesWithImages : series.issues;

  const paragraphsToDisplay =
    contextualParagraphs && contextualParagraphs.length > 0
      ? contextualParagraphs
      : series.description
      ? series.description.split(/\n\s*\n/).filter(Boolean)
      : [
          "Hierdie reeks vorm deel van die historiese Suid-Afrikaanse fotoverhale-versameling wat oorspronklik opgestel is deur mnr. Koos Papenfus en mnr. Pieter Haasbroek.",
        ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3.5 pb-3 sm:pb-4 space-y-6 sm:space-y-10">
      
      {/* Breadcrumb Navigation with explicit HTML links */}
      <nav className="flex items-center space-x-2 text-xs text-slate-muted font-mono" aria-label="Broodkrummels">
        <Link href="/" className="hover:text-pulp-amber transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Gallery</span>
        </Link>
        <span>/</span>
        <Link href="/reeks" className="hover:text-pulp-amber transition-colors">
          Reekse
        </Link>
        <span>/</span>
        <span className="text-paper font-medium truncate max-w-[200px] sm:max-w-none">{series.title}</span>
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
                  alt={series.alt || generateCoverAlt(series)}
                  width={450}
                  height={600}
                  decoding="async"
                  fetchPriority="high"
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

              {/* Description & Historical notes */}
              <div className="space-y-4">
                <h2 className="font-heading text-lg text-paper uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-pulp-amber" />
                  Reeks-Agtergrond & Historiese Aantekeninge
                </h2>
                <div className="text-sm text-slate-muted/95 leading-relaxed space-y-3 font-serif bg-graphite/50 p-5 rounded-xl border border-panel-border">
                  {paragraphsToDisplay.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
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
                      alt={issue.alt || generateIssueAlt(series.title, issue, series.language, series.genre, series.publisher)}
                      width={250}
                      height={333}
                      decoding="async"
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
            <h3 className="font-heading text-lg text-paper uppercase">
              Geen individuele voorblaaie tans beskikbaar nie
            </h3>
            <p className="text-xs text-slate-muted max-w-md mx-auto mt-1">
              Hierdie reeks is in die historiese meestertabel opgeteken. As u 'n eksemplaar van hierdie fotoverhaal besit, kontak ons gerus om 'n hoë-resolusie skandering by te dra.
            </p>
          </div>
        )}
      </section>

      {/* Related Series in Same Genre (Internal Links for Googlebot & Users) */}
      {relatedSeries && relatedSeries.length > 0 && (
        <section className="bg-panel rounded-2xl border border-panel-border p-6 sm:p-8 space-y-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-panel-border pb-3">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl text-paper uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pulp-amber" />
                Verwante Reekse ({series.genre})
              </h2>
              <p className="text-xs text-slate-muted mt-0.5">
                Ander Suid-Afrikaanse fotoverhale in dieselfde genre uit die era 1960–1985.
              </p>
            </div>
            <Link
              href="/reeks"
              className="text-xs font-heading uppercase tracking-wider text-pulp-amber hover:underline font-bold shrink-0 ml-2"
            >
              Bekyk al 111 reekse →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {relatedSeries.map((rel) => (
              <Link
                key={rel.id}
                href={`/reeks/${rel.id}`}
                className="group flex flex-col bg-graphite/70 hover:bg-graphite border border-panel-border hover:border-pulp-amber/60 rounded-lg p-3 transition-all hover:scale-[1.02] shadow-sm"
              >
                <div className="aspect-[3/4] w-full rounded overflow-hidden bg-charcoal mb-2 border border-panel-border">
                  {rel.cover_image ? (
                    <img
                      src={rel.cover_image}
                      alt={rel.title}
                      width={150}
                      height={200}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-panel text-slate-muted">
                      <BookOpen className="w-6 h-6 text-slate-muted/40 mb-1" />
                      <span className="text-[10px] uppercase font-mono">Argiefrekord</span>
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-xs font-bold text-paper uppercase truncate group-hover:text-pulp-amber transition-colors">
                  {rel.title}
                </h3>
                <span className="text-[11px] text-slate-muted mt-0.5">
                  {rel.total_covers} {rel.total_covers === 1 ? "voorblad" : "voorblaaie"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

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
