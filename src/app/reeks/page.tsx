import fs from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Layers, Globe, Building, ArrowLeft, Sparkles, Filter } from "lucide-react";
import { Series } from "@/types";
import { generateCoverAlt } from "@/lib/seo-helpers";
import PulpArchiveBanner from "@/components/PulpArchiveBanner";

export const metadata: Metadata = {
  title: "Alle 111 Fotoverhale Reekse (1960–1985) | Argief Indeks",
  description:
    "Volledige lys van al 111 Suid-Afrikaanse fotoverhaal-reekse uit die goue era (1960–1985). Blaai volgens genre en alfabet deur die volledige versameling met voorblaaie en uitgawes.",
  alternates: {
    canonical: "https://fotoverhale.softcoverbooks.co.za/reeks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Alle 111 Fotoverhale Reekse | Suid-Afrikaanse Fotoverhaal Argief",
    description:
      "Ontdek en verken al 111 Suid-Afrikaanse fotoverhaal-reekse en 433 voorblaaie (1960–1985).",
    url: "https://fotoverhale.softcoverbooks.co.za/reeks",
    type: "website",
    images: [
      {
        url: "https://fotoverhale.softcoverbooks.co.za/icon-512.png",
        width: 512,
        height: 512,
        alt: "Fotoverhaal Argief Reekse Indeks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alle 111 Fotoverhale Reekse | Fotoverhaal Argief",
    description:
      "Volledige argiefgids tot al 111 Suid-Afrikaanse fotoverhaal-reekse uit die 1960's tot 1980's.",
    images: ["https://fotoverhale.softcoverbooks.co.za/icon-512.png"],
  },
};

function getFotoverhaleData(): Series[] {
  const filePath = path.join(process.cwd(), "data", "fotoverhale.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

export default function AllSeriesIndexPage() {
  const allSeries = getFotoverhaleData();

  // Distinct genres
  const genres = [
    "Aksie & Avontuur",
    "Westerns",
    "Speurder & Spioen",
    "Liefde & Romanse",
    "Medies & Hospitaal",
  ];

  // Alphabetical list
  const sortedAlphabetical = [...allSeries].sort((a, b) =>
    a.title.localeCompare(b.title, "af")
  );

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://fotoverhale.softcoverbooks.co.za/reeks#webpage",
        "url": "https://fotoverhale.softcoverbooks.co.za/reeks",
        "name": "Alle 111 Suid-Afrikaanse Fotoverhale Reekse",
        "description":
          "Volledige meesterlys en katalogus van al 111 Suid-Afrikaanse fotoverhaal-reekse (1960–1985).",
        "inLanguage": "af",
        "isPartOf": {
          "@id": "https://fotoverhale.softcoverbooks.co.za/#website",
        },
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": allSeries.length,
          "itemListElement": allSeries.map((s, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": s.title,
            "url": `https://fotoverhale.softcoverbooks.co.za/reeks/${s.id}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Argief Gallery",
            "item": "https://fotoverhale.softcoverbooks.co.za",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Reekse Indeks",
            "item": "https://fotoverhale.softcoverbooks.co.za/reeks",
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 pb-8 sm:pb-12 space-y-8 sm:space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-muted font-mono" aria-label="Broodkrummels">
        <Link href="/" className="hover:text-pulp-amber transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Gallery</span>
        </Link>
        <span>/</span>
        <span className="text-paper font-semibold">Alle Reekse Indeks</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 border-b border-panel-border pb-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pulp-amber/15 text-pulp-amber border border-pulp-amber/30 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>111 Reekse • 433 Voorblaaie</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-paper uppercase tracking-tight">
          Alle Suid-Afrikaanse <br />
          <span className="text-pulp-amber">Fotoverhale Reekse</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-muted leading-relaxed font-serif">
          ’n Volledige oorsig en skakelgids na elke gedokumenteerde fotoverhaal-reeks in ons argief.
          Klik op enige reeks om die voorblaaie, historiese notas en bibliografiese gegewens te verken.
        </p>

        {/* Quick Jump anchors */}
        <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs font-mono">
          <span className="text-slate-muted self-center mr-1">Vinnige navigasie:</span>
          {genres.map((g) => (
            <a
              key={g}
              href={`#${g.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="px-2.5 py-1 rounded bg-panel hover:bg-panel-border border border-panel-border text-paper hover:text-pulp-amber transition-colors"
            >
              {g}
            </a>
          ))}
          <a
            href="#alfabeties"
            className="px-2.5 py-1 rounded bg-panel hover:bg-panel-border border border-pulp-amber/40 text-pulp-amber hover:underline transition-colors"
          >
            A–Z Volledig
          </a>
        </div>
      </header>

      {/* Genre Sections */}
      <div className="space-y-12">
        {genres.map((genre) => {
          const seriesInGenre = allSeries.filter((s) => s.genre === genre);
          const genreAnchor = genre.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          return (
            <section key={genre} id={genreAnchor} className="space-y-4 scroll-mt-20">
              <div className="flex items-center justify-between border-b border-panel-border pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-pulp-amber"></span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide">
                    {genre}
                  </h2>
                </div>
                <span className="text-xs font-mono text-pulp-amber bg-graphite px-2.5 py-1 rounded border border-panel-border">
                  {seriesInGenre.length} {seriesInGenre.length === 1 ? "Reeks" : "Reekse"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {seriesInGenre.map((s) => (
                  <Link
                    key={s.id}
                    href={`/reeks/${s.id}`}
                    className="group flex flex-col justify-between bg-panel hover:bg-graphite border border-panel-border hover:border-pulp-amber/60 rounded-xl p-4 transition-all duration-200 shadow-md hover:scale-[1.01]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            s.language === "Afrikaans"
                              ? "bg-red-600/80 text-white"
                              : "bg-blue-600/80 text-white"
                          }`}
                        >
                          {s.language}
                        </span>
                        <span className="text-[11px] text-pulp-amber font-mono flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {s.total_covers} {s.total_covers === 1 ? "voorblad" : "blaaie"}
                        </span>
                      </div>

                      <h3 className="font-heading text-base font-bold text-paper uppercase group-hover:text-pulp-amber transition-colors line-clamp-2">
                        {s.title}
                      </h3>

                      <p className="text-xs text-slate-muted line-clamp-2 font-serif leading-relaxed">
                        {s.description || `Historiese fotoverhaal-reeks ${s.title} (${genre}).`}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-panel-border/60 flex items-center justify-between text-xs text-slate-muted">
                      <span className="text-[11px] truncate max-w-[150px]">
                        {s.publisher || "Republikeinse Publikasies"}
                      </span>
                      <span className="text-pulp-amber font-bold group-hover:underline">
                        Bekyk →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Complete A–Z Master Index */}
      <section id="alfabeties" className="bg-panel rounded-2xl border border-panel-border p-6 sm:p-8 space-y-6 shadow-xl scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-panel-border pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-pulp-amber" />
            <h2 className="font-heading text-xl sm:text-2xl text-paper uppercase tracking-wide">
              Volledige Alfabetiese Indeks (Al 111 Reekse)
            </h2>
          </div>
          <p className="text-xs text-slate-muted font-mono">
            A–Z gids vir direkte toegang
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {sortedAlphabetical.map((s) => (
            <Link
              key={s.id}
              href={`/reeks/${s.id}`}
              className="flex items-center justify-between p-2.5 rounded-lg bg-graphite/60 hover:bg-graphite border border-panel-border hover:border-pulp-amber/50 transition-colors group"
            >
              <div className="min-w-0 pr-2">
                <span className="font-heading text-sm text-paper group-hover:text-pulp-amber transition-colors uppercase block truncate">
                  {s.title}
                </span>
                <span className="text-[10px] text-slate-muted">
                  {s.genre} • {s.language}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-pulp-amber bg-panel px-1.5 py-0.5 rounded border border-panel-border shrink-0">
                {s.total_covers}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cross-Link Banner */}
      <PulpArchiveBanner />
    </div>
  );
}
