import fs from "fs";
import path from "path";
import Link from "next/link";
import { BookOpen, Layers, Calendar, Sparkles, ShieldCheck, ArrowDown } from "lucide-react";
import { Series } from "@/types";
import { generateCoverAlt } from "@/lib/seo-helpers";
import ArchiveExplorer from "@/components/ArchiveExplorer";
import PromoBanner from "@/components/PromoBanner";
import PulpArchiveBanner from "@/components/PulpArchiveBanner";

async function getFotoverhaleData(): Promise<Series[]> {
  const filePath = path.join(process.cwd(), "data", "fotoverhale.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

export default async function HomePage() {
  const allSeries = await getFotoverhaleData();

  // Calculate statistics
  const totalSeries = allSeries.length;
  const totalCovers = allSeries.reduce((acc, s) => acc + (s.total_covers || 0), 0);
  const afrikaansCount = allSeries.filter((s) => s.language === "Afrikaans").length;
  const englishCount = allSeries.filter((s) => s.language === "Engels").length;

  // Key spotlight reekse met bekende voorblaaie
  const spotlightIds = ["mark-condor", "ruiter-in-swart", "grensvegter", "tessa", "die-wit-tier", "kid-colt"];
  const spotlightSeries = allSeries.filter((s) => spotlightIds.includes(s.id) && s.cover_image);

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Die Suid-Afrikaanse Fotoverhaal Argief",
    "description": "Volledige versameling van 111 Suid-Afrikaanse fotoverhaal-reekse en 433 individuele boekvoorblaaie uit die era 1960–1985.",
    "url": "https://fotoverhale.softcoverbooks.co.za",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allSeries.length,
      "itemListElement": allSeries.map((s, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": s.title,
        "url": `https://fotoverhale.softcoverbooks.co.za/reeks/${s.id}`,
        "image": s.cover_image ? `https://fotoverhale.softcoverbooks.co.za${s.cover_image}` : undefined,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-3 sm:pb-4 space-y-6 sm:space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection),
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-panel via-charcoal to-graphite border border-panel-border p-6 sm:p-8 shadow-2xl">
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pulp-amber/10 border border-pulp-amber/30 text-pulp-amber text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Suid-Afrikaanse Kultuurskatte & Africana Argief</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-paper uppercase tracking-tight leading-none text-center">
            Die Suid-Afrikaanse <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulp-amber via-amber-200 to-pulp-crimson">
              Fotoverhaal Argief
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted font-normal max-w-2xl mx-auto leading-relaxed text-center">
            ’n Digitale bewaarplek vir die kyk-en-lees pulp-fenomeen van die 1960’s tot 1980’s. 
            Met regte akteurs, fotograwe, dramatiese intriges en outentieke Suid-Afrikaanse agtergronde.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-panel-border/80 w-full max-w-3xl">
            
            <div className="bg-graphite/60 border border-panel-border rounded-lg p-3.5 text-center flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 text-slate-muted text-xs uppercase font-medium">
                <BookOpen className="w-4 h-4 text-pulp-amber" />
                <span>Reekse</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-paper mt-1">
                {totalSeries}
              </div>
              <div className="text-[11px] text-slate-muted/70">
                Gekatalogiseer
              </div>
            </div>

            <div className="bg-graphite/60 border border-panel-border rounded-lg p-3.5 text-center flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 text-slate-muted text-xs uppercase font-medium">
                <Layers className="w-4 h-4 text-pulp-amber" />
                <span>Voorblaaie</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-pulp-amber mt-1">
                {totalCovers}
              </div>
              <div className="text-[11px] text-slate-muted/70">
                Hoë-resolusie beelde
              </div>
            </div>

            <div className="bg-graphite/60 border border-panel-border rounded-lg p-3.5 text-center flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 text-slate-muted text-xs uppercase font-medium">
                <Calendar className="w-4 h-4 text-pulp-amber" />
                <span>Tydperk</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-paper mt-1">
                1960–1985
              </div>
              <div className="text-[11px] text-slate-muted/70">
                Die Goue Eeu
              </div>
            </div>

            <div className="bg-graphite/60 border border-panel-border rounded-lg p-3.5 text-center flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 text-slate-muted text-xs uppercase font-medium">
                <ShieldCheck className="w-4 h-4 text-pulp-amber" />
                <span>Bewaring</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-pulp-crimson mt-1">
                30+ Jaar
              </div>
              <div className="text-[11px] text-slate-muted/70">
                deur softcoverbooks
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#gallery"
              className="inline-flex items-center space-x-2 bg-pulp-amber hover:bg-pulp-amber-hover text-graphite font-heading text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-lg hover:shadow-pulp-amber transition-all"
            >
              <span>Verken die Gallery</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <Link
              href="/geskiedenis"
              className="inline-flex items-center space-x-2 bg-panel hover:bg-panel-border border border-panel-border text-paper font-heading text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
            >
              <span>Lees die Geskiedenis</span>
            </Link>
          </div>

        </div>

        {/* Featured Mini Showcase on Desktop */}
        {spotlightSeries.length > 0 && (
          <div className="hidden lg:grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-panel-border">
            <h2 className="col-span-4 text-xs font-heading uppercase text-pulp-amber tracking-widest mb-1 text-center">
              Gewilde Reekse in die Kollig:
            </h2>
            {spotlightSeries.slice(0, 4).map((s) => (
              <Link
                key={s.id}
                href={`/reeks/${s.id}`}
                className="group flex items-center space-x-3 bg-graphite/70 hover:bg-panel border border-panel-border hover:border-pulp-amber/50 rounded-lg p-2 transition-all"
              >
                <div className="w-12 h-16 rounded overflow-hidden bg-charcoal shrink-0 border border-panel-border">
                  <img
                    src={s.cover_image!}
                    alt={s.alt || generateCoverAlt(s)}
                    width={48}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-bold text-paper truncate uppercase group-hover:text-pulp-amber transition-colors">
                    {s.title}
                  </h3>
                  <span className="text-[11px] text-slate-muted block">
                    {s.total_covers} {s.total_covers === 1 ? "Voorblad" : "Voorblaaie"}
                  </span>
                  <span className="text-[10px] text-pulp-amber/80 font-mono">
                    {s.genre}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </section>

      {/* Cross-Promotional Free Ebook Banner */}
      <PromoBanner />

      {/* Main Interactive Explorer (Search, Filters, Grid) */}
      <ArchiveExplorer initialSeries={allSeries} />

      {/* Cross-Link to Pulp Books Archive Banner */}
      <PulpArchiveBanner />

    </div>
  );
}
