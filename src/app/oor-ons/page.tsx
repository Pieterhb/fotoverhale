import Link from "next/link";
import { Info, ShieldCheck, Mail, Users, BookOpen, ExternalLink, Heart, Send } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oor Ons & Erkenning",
  description: "Erkenning aan Pieter Haasbroek, Koos Papenfus en die pioniers wat hierdie Suid-Afrikaanse fotoverhaal erfenis digitaal bewaar het.",
  alternates: {
    canonical: "https://fotoverhale.softcoverbooks.co.za/oor-ons",
  },
  openGraph: {
    title: "Oor Ons & Erkenning - Suid-Afrikaanse Fotoverhaal Argief",
    description: "Die bewaringsgeskiedenis en erkenning aan Pieter Haasbroek, Koos Papenfus, Sven Barsby en Carol Hardijzer.",
    url: "https://fotoverhale.softcoverbooks.co.za/oor-ons",
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
    title: "Oor Ons & Erkenning | Fotoverhaal Argief",
    description: "Ontdek die bewaringsprojek en die mense agter die Suid-Afrikaanse Fotoverhaal Argief.",
    images: ["https://fotoverhale.softcoverbooks.co.za/icon-512.png"],
  },
};

const jsonLdAbout = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Oor die Suid-Afrikaanse Fotoverhaal Argief",
  "description": "Erkenning en agtergrond oor die digitale bewaring van Suid-Afrikaanse fotoverhale deur Pieter Haasbroek en navorsers.",
  "inLanguage": "af",
  "mainEntity": {
    "@type": "Organization",
    "name": "Suid-Afrikaanse Fotoverhaal Argief",
    "founder": {
      "@type": "Person",
      "@id": "https://pulpbooksarchive.co.za/p-d-haasbroek/#person",
      "name": "Pieter Daniel Haasbroek",
      "alternateName": ["P.D. Haasbroek", "Pieter Haasbroek"],
      "url": "https://fotoverhale.softcoverbooks.co.za/p-d-haasbroek"
    },
    "url": "https://fotoverhale.softcoverbooks.co.za"
  }
};

export default function OorOnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 pb-4 sm:pb-6 space-y-8 sm:space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdAbout),
        }}
      />
      
      {/* Header */}
      <header className="text-center space-y-4 border-b border-panel-border pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pulp-amber/15 text-pulp-amber border border-pulp-amber/30 text-xs font-semibold uppercase tracking-wider">
          <Info className="w-3.5 h-3.5" />
          <span>Oor die Bewaringsprojek</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-paper uppercase tracking-tight">
          Oor die Argief & Erkenning
        </h1>

        <p className="text-sm sm:text-base text-slate-muted max-w-2xl mx-auto leading-relaxed">
          ’n Toegewyde digitale bewaarplek vir Suid-Afrikaanse fotoverhale, gebore uit die pionierswerk van <em>softcoverbooks.co.za</em>.
        </p>
      </header>

      {/* Origin Story */}
      <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
        <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-pulp-amber" />
          Die Oorsprong van Softcoverbooks.co.za
        </h2>
        <div className="text-sm sm:text-base text-slate-muted/95 leading-relaxed font-serif space-y-3">
          <p>
            Byna drie dekades gelede het <strong>mnr. Pieter Haasbroek</strong> die webwerf <code>softcoverbooks.co.za</code> (ook bekend as <em>Skatkisboeke – Treasure Chest Books</em>) op die been gebring. Die doelwit was eenvoudig maar deurslaggewend: <strong>om die herinneringe en kleurvolle voorblaaie van Suid-Afrikaanse sagtebande en fotoverhale te red van vergetelheid.</strong>
          </p>
          <p>
            In daardie vroeë jare van die internet was daar byna geen inligting of beeldmateriaal van ou Afrikaanse en plaaslike pulplektuur beskikbaar nie. Boeke het in stowwerige bokse op solders gelê en stadigaan vergaan. Danksy onvermoeide skandering, katalogisering en die samewerking van passievolle versamelaars, het <em>softcoverbooks.co.za</em> uitgegroei tot die gesaghebbende verwysingsbron vir Africana-pulpboeke.
          </p>
          <p>
            Hierdie nuwe digitale argief (<strong>fotoverhale.softcoverbooks.co.za</strong>) bou voort op daardie ryk nalatenskap. Deur ’n moderne, responsiewe en vinnige platform te bied wat spesifiek op die fotoverhaal-medium fokus, verseker ons dat navorsers, aanhangers en nuuskierige lesers die materiaal met gemak op enige toestel kan verken.
          </p>
        </div>
      </section>

      {/* Roll of Honour / Erkenning */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2">
          <Users className="w-5 h-5 text-pulp-amber" />
          Rol van Eer & Erkenning
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-graphite/80 border border-pulp-amber/40 rounded-xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg text-paper uppercase font-bold">
                  Mnr. Pieter Haasbroek
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-pulp-amber/20 text-pulp-amber border border-pulp-amber/30">
                  P.D. Haasbroek
                </span>
              </div>
              <span className="text-xs text-pulp-amber font-mono block">
                Argiefstigter, Uitgewer &amp; Hoofbewaarder
              </span>
              <p className="text-xs text-slate-muted leading-relaxed font-serif">
                Stigter van <em>softcoverbooks.co.za</em> en die <em>Pulp Books Archive</em>. Sy 30+ jaar toewyding aan die opsporing, bewaring, navorsing en digitalisering van seldsame Suid-Afrikaanse pulp- en fotoverhaal-erfenis vorm die ruggraat van hierdie argief.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <Link
                href="/p-d-haasbroek"
                className="inline-flex items-center space-x-1.5 bg-pulp-amber hover:bg-pulp-amber-hover text-graphite font-heading text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all shadow-sm"
              >
                <span>Biografiese Profiel</span>
              </Link>
              <a
                href="https://pulpbooksarchive.co.za/p-d-haasbroek/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-pulp-amber border border-panel-border px-2.5 py-1.5 rounded transition-colors"
                title="Pulp Books Archive Profiel"
              >
                <span>Pulp Books Archive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="bg-graphite/80 border border-panel-border rounded-xl p-5 space-y-2">
            <h3 className="font-heading text-lg text-paper uppercase">
              Mnr. Koos Papenfus
            </h3>
            <span className="text-xs text-pulp-amber font-mono block">
              Historiese Skrywer & Navorser
            </span>
            <p className="text-xs text-slate-muted leading-relaxed font-serif">
              Outeur van die omvattende historiese oorsigte en ontledings oor Mark Condor, Ruiter in Swart, Grensvegter en die sosiale agtergrond van die fotoverhaal-era.
            </p>
          </div>

          <div className="bg-graphite/80 border border-panel-border rounded-xl p-5 space-y-2">
            <h3 className="font-heading text-lg text-paper uppercase">
              Sven Barsby & Carol Hardijzer
            </h3>
            <span className="text-xs text-pulp-amber font-mono block">
              Katalogiseerders & Samestellers
            </span>
            <p className="text-xs text-slate-muted leading-relaxed font-serif">
              Het onbaatsugtig hul eie gedetailleerde lyste en navorsing beskikbaar gestel om die meestertabel van meer as 320 fotoverhaal-reekse saam te stel.
            </p>
          </div>

          <div className="bg-graphite/80 border border-panel-border rounded-xl p-5 space-y-2">
            <h3 className="font-heading text-lg text-paper uppercase">
              Die Versamelaarsgemeenskap
            </h3>
            <span className="text-xs text-pulp-amber font-mono block">
              Jan Nel, Lukie Carelsen en talle ander
            </span>
            <p className="text-xs text-slate-muted leading-relaxed font-serif">
              Versamelaars regoor Suid-Afrika wat oor dekades heen boeke uitgeruil, verkoop, en voorblaaie gedeel het om leemtes in die rekords te vul.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Collectors / Uitnodiging aan Versamelaars */}
      <section className="bg-gradient-to-r from-panel via-charcoal to-panel rounded-xl border border-pulp-amber/40 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-pulp-amber text-xs uppercase font-mono tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            <span>Versoek aan Versamelaars</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-tight">
            Het u 'n ontbrekende voorblad of inligting?
          </h2>
          <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-serif">
            Daar is steeds uitgawes waarvan voorblaaie baie skaars is of ontbreek. As u ou fotoverhale besit en ’n skandering of foto van ’n ontbrekende uitgawe wil bydra, help u om ons gedeelde nasionale erfenis te voltooi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <a
            href="mailto:haasbroek.pieter@gmail.com?subject=Bydrae%20tot%20Fotoverhale%20Argief"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-pulp-amber hover:bg-pulp-amber-hover text-graphite font-heading text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Stuur 'n Voorblad of E-pos</span>
          </a>

          <a
            href="https://www.softcoverbooks.co.za/versamelaars.html"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-panel hover:bg-panel-border border border-panel-border text-paper font-heading text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
          >
            <span>Besoek Versamelaarsnetwerk</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-muted" />
          </a>
        </div>
      </section>

      {/* Cloudflare & Argief Tegnologie Nota */}
      <section className="text-xs text-slate-muted border-t border-panel-border pt-6 space-y-2">
        <h3 className="font-heading text-sm text-paper uppercase">
          Tegnologie & Toeganklikheid
        </h3>
        <p className="leading-relaxed font-serif">
          Hierdie argief is gebou met Next.js en Tailwind CSS, en word gehuisves met behulp van Cloudflare se globale inhoudsnetwerk onder die subdomein <code>fotoverhale.softcoverbooks.co.za</code>. Alle data en hoë-resolusie voorblaaie word veilig bewaar en blitsvinnig aan lesers wêreldwyd bedien.
        </p>
      </section>

    </div>
  );
}
