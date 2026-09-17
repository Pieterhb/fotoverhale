import Link from "next/link";
import { Shield, Lock, FileText, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privaatheidsbeleid & POPIA-kennisgewing",
  description:
    "Amptelike privaatheidsbeleid en POPIA-nakoming vir die Suid-Afrikaanse Fotoverhaal Argief (fotoverhale.softcoverbooks.co.za). Hoe ons u privaatheid as vrye navorsingsargief beskerm.",
  alternates: {
    canonical: "https://fotoverhale.softcoverbooks.co.za/privaatheidsbeleid",
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
    title: "Privaatheidsbeleid | Suid-Afrikaanse Fotoverhaal Argief",
    description:
      "Privaatheidsbeleid en POPIA-nakoming van die Suid-Afrikaanse Fotoverhaal Argief. Vrye nie-kommersiële navorsingsplatform.",
    url: "https://fotoverhale.softcoverbooks.co.za/privaatheidsbeleid",
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
    title: "Privaatheidsbeleid | Fotoverhaal Argief",
    description: "Privaatheidsbeleid en POPIA-nakoming van die Suid-Afrikaanse Fotoverhaal Argief.",
    images: ["https://fotoverhale.softcoverbooks.co.za/icon-512.png"],
  },
};

const jsonLdPrivacy = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://fotoverhale.softcoverbooks.co.za/privaatheidsbeleid#webpage",
      "url": "https://fotoverhale.softcoverbooks.co.za/privaatheidsbeleid",
      "name": "Privaatheidsbeleid | Suid-Afrikaanse Fotoverhaal Argief",
      "description":
        "Privaatheidsbeleid en POPIA-nakoming van die Suid-Afrikaanse Fotoverhaal Argief.",
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
          "name": "Privaatheidsbeleid",
          "item": "https://fotoverhale.softcoverbooks.co.za/privaatheidsbeleid",
        },
      ],
    },
  ],
};

export default function PrivaatheidsbeleidPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 pb-8 sm:pb-12 space-y-8 sm:space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdPrivacy),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-muted font-mono" aria-label="Broodkrummels">
        <Link href="/" className="hover:text-pulp-amber transition-colors">
          Tuisblad
        </Link>
        <span>/</span>
        <span className="text-paper font-semibold">Privaatheidsbeleid</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 border-b border-panel-border pb-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pulp-amber/15 text-pulp-amber border border-pulp-amber/30 text-xs font-semibold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          <span>Privaatheid &amp; POPIA-Nakoming</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-paper uppercase tracking-tight">
          Privaatheidsbeleid
        </h1>

        <p className="text-sm sm:text-base text-slate-muted max-w-2xl mx-auto leading-relaxed font-serif">
          Hoe die Suid-Afrikaanse Fotoverhaal Argief u privaatheid en navorsingservaring respekteer en beskerm volgens Suid-Afrikaanse wetgewing.
        </p>
      </header>

      {/* Main Content Box */}
      <article className="bg-panel rounded-2xl border border-panel-border p-6 sm:p-10 shadow-xl space-y-8 text-paper font-serif leading-relaxed">
        
        {/* Core Statement Banner */}
        <div className="bg-graphite/70 border-l-4 border-pulp-amber p-5 rounded-r-xl space-y-2 not-prose">
          <h2 className="font-heading text-lg sm:text-xl text-paper uppercase tracking-wide flex items-center gap-2 font-bold">
            <Shield className="w-5 h-5 text-pulp-amber" />
            U Privaatheid is vir Ons Belangrik
          </h2>
          <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-serif">
            Die <strong>Suid-Afrikaanse Fotoverhaal Argief</strong> (<code>fotoverhale.softcoverbooks.co.za</code>) funksioneer as ’n vrye digitale kultuurhistoriese museum en opvoedkundige navorsingsbron. Ons samel geen persoonlike data in sonder u uitdruklike wete en toestemming nie, en ons voldoen ten volle aan die beginsels van die <strong>Wet op die Beskerming van Persoonlike Inligting (POPIA — Wet 4 van 2013)</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            1. Geen Persoonlike Data-insameling
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            U kan vrylik, veilig en anoniem deur die hele argief blaai. Ons vereis <strong>geen gebruikersregistrasie, profiele, intekengelde of wagwoorde</strong> om toegang te verkry tot die 111 reekse, 433 gekatalogiseerde voorblaaie, skrywersbiografieë, uitgewerslyste of historiese artikels nie.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            2. Nakoming van POPIA (Wet 4 van 2013)
          </h3>
          <div className="text-sm sm:text-base text-slate-muted/95 pl-6 space-y-2">
            <p>
              Ingevolge die Wet op die Beskerming van Persoonlike Inligting (POPIA):
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300">
              <li>
                <strong>Verantwoordelike Party:</strong> P.D. Haasbroek (Pieter Daniel Haasbroek), skepper en kurator van die argief.
              </li>
              <li>
                <strong>Regmatige Doel:</strong> Alle inligting op hierdie platform word uitsluitlik aangebied ter wille van nie-kommersiële kultuurhistoriese bewaring, opvoeding en Africana-bibliografie.
              </li>
              <li>
                <strong>Geen Verwerking van Sensitiewe Data:</strong> Ons verwerk of stoor geen finansiële gegewens, identiteitsnommers, biometriese data of ander sensitiewe persoonlike besonderhede nie.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            3. Webwerfkoekies &amp; Tegniese Analise
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Webwerfkoekies word slegs gebruik vir noodsaaklike tegniese funksionaliteit (soos kitssoektogte en vinnige beeldlewering via Cloudflare) en anonieme besoekerstatistiek (Google Analytics). Hierdie anonieme data help ons om te monitor watter reekse gewild is en waar tegniese prestasie verbeter kan word. Geen individuele gedragsprofiele word geskep nie, en u word nooit oor derdeparty-webwerwe nagespeur nie.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            4. Geen Derdeparty-deling of Verkoop van Inligting
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Geen inligting van enige aard word ooit aan derde partye, advertensienetwerke of kommersiële datamakelaars verkoop, verhuur of gedeel nie. Ons argief bevat geen opdringerige advertensiebaniere of eksterne naspoorders nie.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            5. Kontak, Vrae en Argiefbydraes
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            Indien u vrywillig per e-pos met die argief in verbinding tree (byvoorbeeld om navorsingsvrae te stel of om ’n hoë-resolusie skandering van ’n seldsame voorblad by te dra), word u naam en e-posadres uitsluitlik gebruik om u korrespondensie persoonlik te beantwoord. Dit word nooit by enige bemarkingslyste gevoeg nie.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-paper uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulp-amber shrink-0" />
            6. U Regte ingevolge POPIA
          </h3>
          <p className="text-sm sm:text-base text-slate-muted/95 pl-6">
            U behou te alle tye die reg om navraag te doen oor enige korrespondensie wat u aan die argief gestuur het, om regstelling daarvan te versoek, of om te versoek dat u vrywillige kommunikasie permanent uit ons rekords verwyder word.
          </p>
        </section>

        {/* Contact & Date Box */}
        <div className="pt-6 border-t border-panel-border/80 text-xs text-slate-muted space-y-2">
          <p>
            <strong>Inligtingsbeampte / Kurator:</strong> Pieter Daniel Haasbroek (P.D. Haasbroek)
          </p>
          <p>
            <strong>E-posadres vir POPIA-navrae:</strong>{" "}
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
