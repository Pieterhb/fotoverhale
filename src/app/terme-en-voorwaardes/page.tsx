import Link from "next/link";
import { Scale, BookOpen, AlertCircle, ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terme en Voorwaardes & Erfenisvrywaring",
  description:
    "Gebruiksvoorwaardes, billike gebruik (fair use) en nie-kommersiële erfenisvrywaring van die Suid-Afrikaanse Fotoverhaal Argief (fotoverhale.softcoverbooks.co.za).",
  alternates: {
    canonical: "https://fotoverhale.softcoverbooks.co.za/terme-en-voorwaardes",
  },
  openGraph: {
    title: "Terme en Voorwaardes | Suid-Afrikaanse Fotoverhaal Argief",
    description:
      "Nie-kommersiële opvoedkundige argief, billike gebruik (fair use) en historiese erfenisvrywaring.",
    url: "https://fotoverhale.softcoverbooks.co.za/terme-en-voorwaardes",
    type: "website",
    images: [
      {
        url: "https://fotoverhale.softcoverbooks.co.za/icon-512.png",
        width: 512,
        height: 512,
        alt: "Suid-Afrikaanse Fotoverhaal Argief",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terme en Voorwaardes | Fotoverhaal Argief",
    description: "Gebruiksvoorwaardes en nie-kommersiële erfenisvrywaring van die Suid-Afrikaanse Fotoverhaal Argief.",
    images: ["https://fotoverhale.softcoverbooks.co.za/icon-512.png"],
  },
};

const jsonLdTerms = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://fotoverhale.softcoverbooks.co.za/terme-en-voorwaardes#webpage",
      "url": "https://fotoverhale.softcoverbooks.co.za/terme-en-voorwaardes",
      "name": "Terme en Voorwaardes | Suid-Afrikaanse Fotoverhaal Argief",
      "description":
        "Gebruiksvoorwaardes, billike gebruik en nie-kommersiële erfenisvrywaring van die Suid-Afrikaanse Fotoverhaal Argief.",
      "inLanguage": "af",
      "isPartOf": {
        "@id": "https://fotoverhale.softcoverbooks.co.za/#website",
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Tuisblad",
          "item": "https://fotoverhale.softcoverbooks.co.za",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terme en Voorwaardes",
          "item": "https://fotoverhale.softcoverbooks.co.za/terme-en-voorwaardes",
        },
      ],
    },
  ],
};

export default function TermeEnVoorwaardesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 pb-8 sm:pb-12 space-y-8 sm:space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdTerms),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-muted font-mono" aria-label="Broodkrummels">
        <Link href="/" className="hover:text-pulp-amber transition-colors">
          Tuisblad
        </Link>
        <span>/</span>
        <span className="text-paper font-semibold">Terme en Voorwaardes</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 border-b border-panel-border pb-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pulp-amber/15 text-pulp-amber border border-pulp-amber/30 text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Erfenis &amp; Gebruiksvoorwaardes</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-paper uppercase tracking-tight">
          Terme en Voorwaardes
        </h1>

        <p className="text-sm sm:text-base text-slate-muted max-w-2xl mx-auto leading-relaxed font-serif">
          Nie-kommersiële opvoedkundige argief, billike gebruik (Fair Use) en erfenisvrywaring van die Suid-Afrikaanse Fotoverhaal Argief.
        </p>
      </header>

      {/* Main Content Box */}
      <article className="bg-panel rounded-2xl border border-panel-border p-6 sm:p-10 shadow-xl space-y-8 text-paper font-serif leading-relaxed">
        
        {/* Core Notice Banner */}
        <div className="bg-graphite/70 border-l-4 border-pulp-amber p-5 rounded-r-xl space-y-2 not-prose">
          <h2 className="font-heading text-lg sm:text-xl text-paper uppercase tracking-wide flex items-center gap-2 font-bold">
            <BookOpen className="w-5 h-5 text-pulp-amber" />
            Nie-Kommersiële Opvoedkundige Argief &amp; Virtuele Museum
          </h2>
          <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-serif">
            Hierdie webwerf funksioneer as ’n <strong>nie-kommersiële opvoedkundige argief en virtuele bewaarplek</strong> ter bewaring van Suid-Afrika se unieke fotoverhaal-kultuurskatte uit die goue era (1960–1985). Deur hierdie webwerf te besoek en te gebruik, stem u in tot die onderstaande terme en voorwaardes.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            1. Billike Gebruik (Fair Use) Kennisgewing
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Omslagkuns, voorbladbeelde, titels, reeksbesonderhede en skrywersinligting word gedokumenteer en vertoon onder die internasionale en nasionale beginsels van <strong>billike gebruik (fair use)</strong>. Die uitsluitlike doelwit is historiese navorsing, kultuurbewaring, bibliografiese identifikasie, onderrig en nostalgie ter behoud van Suid-Afrikaanse populêre geskiedenis.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            2. Nie-Kommersiële Karakter
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Die Suid-Afrikaanse Fotoverhaal Argief verkoop self <strong>geen fisiese of digitale boeke nie</strong> en genereer geen direkte inkomste uit die vertoon van historiese omslagbeelde nie. Alle inhoud, indekse en meesterlyste word gratis tot beskikking van navorsers, studente, versamelaars en die algemene publiek gestel.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            3. Outeursreg &amp; Kennisgewing van Reghebbendes
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Die oorspronklike fotoverhale is histories uitgegee deur uitgewershuise soos <em>Republikeinse Publikasies</em>, <em>Drakensberg-Pers</em> en ander historiese uitgewers. Die oorgrote meerderheid van hierdie werke is reeds vir dekades buite druk (out-of-print). Indien enige wettige reghebbende, uitgewer of erfgenaam enige navrae of versoeke het rakende spesifieke historiese inskrywings of erkenning, nooi ons u uit om direk met ons in verbinding te tree by{" "}
            <a href="mailto:haasbroek.pieter@gmail.com" className="text-pulp-amber hover:underline font-semibold">
              haasbroek.pieter@gmail.com
            </a>{" "}
            sodat ons die nodige erkenning of aanpassings met die hoogste respek kan aanbring.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            4. Eksterne Skakels &amp; Verwante Projekte
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Hierdie webwerf bevat skakels na ons geassosieerde bewaringsprojekte, insluitend{" "}
            <a href="https://www.softcoverbooks.co.za" target="_blank" rel="noopener noreferrer" className="text-pulp-amber hover:underline font-semibold">
              softcoverbooks.co.za
            </a>{" "}
            en{" "}
            <a href="https://www.pulpbooksarchive.co.za/" target="_blank" rel="noopener noreferrer" className="text-pulp-amber hover:underline font-semibold">
              pulpbooksarchive.co.za
            </a>
            . Hierdie skakels word uitsluitlik as verwysingsdiens verskaf ter bevordering van breër navorsing oor Suid-Afrikaanse pulp-fiksie en Africana-literatuur.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            5. Gebruik van Argiefmateriaal
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Besoekers mag die bibliografiese inligting en lyste vrylik raadpleeg vir persoonlike, nie-kommersiële navorsing en versamelaarsdoeleindes. Massale data-ontginning (scraping) vir kommersiële doeleindes of ongemagtigde herverspreiding sonder bronverwysing word nie toegelaat nie.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            6. Vrywaring van Aanspreeklikheid
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Die inligting, meesterlyste en historiese notas is met die grootste sorgvuldigheid saamgestel uit dekades se navorsing deur mnr. Pieter Haasbroek en mnr. Koos Papenfus. Aangesien historiese rekords uit die 1960’s tot 1980’s soms onvolledig of teenstrydig kan wees, word alle inligting verskaf "soos dit is". Die argief aanvaar geen aanspreeklikheid vir enige onbedoelde tipografiese foute of historiese weglatings nie.
          </p>
        </section>

        {/* Contact & Date Box */}
        <div className="pt-6 border-t border-panel-border/80 text-xs text-slate-muted space-y-2">
          <p>
            <strong>Kurator &amp; Bewaarder:</strong> Pieter Daniel Haasbroek (P.D. Haasbroek)
          </p>
          <p>
            <strong>Kontak vir Erkenning of Navrae:</strong>{" "}
            <a href="mailto:haasbroek.pieter@gmail.com" className="text-pulp-amber hover:underline font-semibold">
              haasbroek.pieter@gmail.com
            </a>
          </p>
          <p>
            <strong>Laas opgedateer:</strong> September 2026 • Suid-Afrikaanse Fotoverhaal Argief
          </p>
        </div>

      </article>

      {/* Back to Home CTA */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-heading uppercase tracking-wider text-pulp-amber hover:text-paper transition-colors bg-panel hover:bg-panel-border border border-panel-border px-4 py-2.5 rounded-lg shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keer Terug na Boekgallery</span>
        </Link>
      </div>

    </div>
  );
}
