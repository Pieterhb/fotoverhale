import Link from "next/link";
import { Metadata } from "next";
import {
  UserCheck,
  ShieldCheck,
  BookOpen,
  Palette,
  Code2,
  GraduationCap,
  ExternalLink,
  Layers,
  Sparkles,
  Archive,
  Globe,
  Award,
  AlertCircle,
  FileText,
  Smartphone,
  Library,
  Compass,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "P.D. Haasbroek (Pieter Daniel Haasbroek) | Skrywer, Uitgewer, Digitale Kunstenaar & Bewaarder",
  description:
    "Amptelike biografiese profiel van P.D. Haasbroek (Pieter Daniel Haasbroek) – Suid-Afrikaanse skrywer, uitgewer, digitale kunstenaar, toepassingontwikkelaar en bewaarder van Suid-Afrikaanse pulp-fiksie en fotoverhale.",
  keywords: [
    "P.D. Haasbroek",
    "Pieter Daniel Haasbroek",
    "Pieter Haasbroek",
    "Pulp Books Archive",
    "Fotoverhale Argief",
    "Softcoverbooks",
    "Treasure Chest Books",
    "South African pulp fiction",
    "FlickFuture",
    "HousePlanQuote",
    "The Black Panther",
    "Suid-Afrikaanse fotoverhale erfenis",
  ],
  alternates: {
    canonical: "https://fotoverhale.softcoverbooks.co.za/p-d-haasbroek",
  },
  openGraph: {
    title: "P.D. Haasbroek – Pieter Daniel Haasbroek | Biografiese Profiel",
    description:
      "Skrywer, uitgewer, digitale kunstenaar, toepassing-skepper en bewaarder van Suid-Afrikaanse pulp- en sagtebandfiksie vir meer as 30 jaar.",
    url: "https://fotoverhale.softcoverbooks.co.za/p-d-haasbroek",
    type: "profile",
    images: [
      {
        url: "https://fotoverhale.softcoverbooks.co.za/icon-512.png",
        width: 512,
        height: 512,
        alt: "P.D. Haasbroek - Pieter Daniel Haasbroek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P.D. Haasbroek – Pieter Daniel Haasbroek",
    description:
      "Author, Publisher, Digital Artist, App Creator and South African Pulp-Fiction Preservationist.",
    images: ["https://fotoverhale.softcoverbooks.co.za/icon-512.png"],
    creator: "@PieterHaasbroe2",
    site: "@PieterHaasbroe2",
  },
};

const jsonLdProfile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://fotoverhale.softcoverbooks.co.za/p-d-haasbroek/#profile",
  "url": "https://fotoverhale.softcoverbooks.co.za/p-d-haasbroek",
  "name": "P.D. Haasbroek – Pieter Daniel Haasbroek",
  "description":
    "Profile of P.D. Haasbroek (Pieter Daniel Haasbroek), a South African author, editor, publisher, digital artist, independent app creator and pulp-fiction preservationist.",
  "inLanguage": ["af", "en"],
  "mainEntity": {
    "@type": "Person",
    "@id": "https://pulpbooksarchive.co.za/p-d-haasbroek/#person",
    "name": "Pieter Daniel Haasbroek",
    "givenName": "Pieter Daniel",
    "familyName": "Haasbroek",
    "alternateName": ["P.D. Haasbroek", "Pieter Haasbroek"],
    "description":
      "South African author, editor, publisher, digital artist, independent app creator and long-time collector and preservationist of South African pulp and softcover fiction.",
    "jobTitle": [
      "Author",
      "Editor",
      "Publisher",
      "Pulp-fiction preservationist",
      "Digital artist",
      "Book-cover designer",
      "Independent app creator"
    ],
    "knowsAbout": [
      "South African pulp fiction",
      "South African softcover books",
      "Paperback fiction",
      "Literary preservation",
      "Digital archives",
      "Ebook publishing",
      "Book publishing",
      "Book cover design",
      "Digital art",
      "Print-on-demand artwork",
      "Software development",
      "AI-assisted app development"
    ],
    "sameAs": [
      "https://www.pulpbooksarchive.co.za/",
      "https://pulpbooksarchive.co.za/p-d-haasbroek/",
      "https://softcoverbooks.co.za/",
      "https://ebooks.softcoverbooks.co.za/",
      "https://pod.softcoverbooks.co.za/",
      "https://fotoverhale.softcoverbooks.co.za/",
      "https://www.flickfuture.com/",
      "https://www.teepublic.com/user/theblackpanther",
      "https://www.amazon.com/stores/Pieter-Haasbroek/author/B0FQ44RRLQ",
      "https://x.com/PieterHaasbroe2",
      "https://www.youtube.com/@BookswithHooks"
    ],
    "subjectOf": {
      "@type": "CreativeWork",
      "name": "Verfyning en verbetering van 'n donsige skimmel waarskuwingsmodel vir die Wes-Kaap",
      "datePublished": "2006",
      "url": "https://scholar.ufs.ac.za/items/8859893a-0c52-4d7a-81ff-b7e8d631c3b5"
    }
  }
};

const PROJECTS = [
  {
    name: "Pulp Books Archive",
    badge: "Navorsing & Bewaring",
    description: "South African pulp-fiction preservation and research archive documenting thousands of historical book covers, authors, pseudonyms and publishers.",
    link: "https://www.pulpbooksarchive.co.za/",
    external: true,
    highlight: true,
  },
  {
    name: "Fotoverhale Archive",
    badge: "Kyk-en-Lees Argief",
    description: "Archive and research project documenting South African fotoverhale series (1960–1985) with over 460 catalogued covers and comprehensive issue records.",
    link: "https://fotoverhale.softcoverbooks.co.za/",
    external: false,
    highlight: true,
  },
  {
    name: "Softcover Books",
    badge: "Geskiedenis & Argief",
    description: "South African softcover-book archive and pioneer research project (Skatkisboeke / Treasure Chest Books).",
    link: "https://softcoverbooks.co.za/",
    external: true,
  },
  {
    name: "PDF & Ebooks Softcover Books",
    badge: "Digitale Publikasies",
    description: "Digital softcover-book and ebook publishing project reviving historical South African works for modern readers.",
    link: "https://ebooks.softcoverbooks.co.za/",
    external: true,
  },
  {
    name: "POD Softcover Books",
    badge: "Print-on-Demand",
    description: "Print-on-demand publishing and vintage artwork restoration project.",
    link: "https://pod.softcoverbooks.co.za/",
    external: true,
  },
  {
    name: "The Black Panther on TeePublic",
    badge: "Digitale Kuns",
    description: "Extensive print-on-demand artwork portfolio and digital illustration store.",
    link: "https://www.teepublic.com/user/theblackpanther",
    external: true,
  },
  {
    name: "Amazon Author Store",
    badge: "Skrywer & Uitgewer",
    description: "Pieter Haasbroek's author, compilation and publishing presence on Amazon Kindle & Paperback.",
    link: "https://www.amazon.com/stores/Pieter-Haasbroek/author/B0FQ44RRLQ",
    external: true,
  },
  {
    name: "FlickFuture",
    badge: "Toepassing / Platform",
    description: "Film and television discovery and search platform developed with modern software engineering.",
    link: "https://www.flickfuture.com/",
    external: true,
  },
  {
    name: "HousePlanQuote",
    badge: "Sagteware / Utility",
    description: "Construction and house-plan estimating application built for practical workflow efficiency.",
    link: "#",
    external: false,
  },
  {
    name: "Cool-Cat",
    badge: "Toepassing",
    description: "Independent digital and interactive app project.",
    link: "#",
    external: false,
  },
];

export default function PdHaasbroekPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-2.5 pb-6 space-y-10 sm:space-y-14">
      {/* Schema.org ProfilePage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdProfile),
        }}
      />

      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-panel via-charcoal to-graphite rounded-2xl border border-panel-border p-5 sm:px-8 sm:py-6 shadow-2xl overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pulp-amber/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pulp-amber/15 text-pulp-amber border border-pulp-amber/30 text-xs font-semibold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Biografiese &amp; Identiteitsverwysing</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-pulp-crimson/20 text-paper border border-pulp-crimson/40 text-xs font-mono">
            <span>30+ Jaar Bewaring</span>
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-paper uppercase tracking-tight">
            P.D. Haasbroek
          </h1>
          <p className="text-lg sm:text-2xl text-pulp-amber font-heading font-medium tracking-wide">
            Pieter Daniel Haasbroek
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-3xl leading-relaxed">
            Author · Publisher · Digital Artist · App Creator · South African Pulp-Fiction Preservationist
          </p>
        </div>

        {/* Identity & Canonical Cross-Link Banner */}
        <div className="bg-graphite/80 border border-panel-border rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-muted leading-relaxed font-serif">
            <p>
              Hierdie bladsy dien as die amptelike biografiese en identiteitsverwysing vir{" "}
              <strong className="whitespace-nowrap">P.D. Haasbroek</strong> (Pieter Daniel Haasbroek) op die Suid-Afrikaanse Fotoverhaal Argief en skakel direk met ons susterargief, die <a href="https://www.pulpbooksarchive.co.za/" target="_blank" rel="noopener noreferrer" className="text-pulp-amber underline font-sans">Pulp Books Archive</a>.
            </p>
          </div>
          <a
            href="https://pulpbooksarchive.co.za/p-d-haasbroek/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center space-x-2 bg-pulp-amber hover:bg-pulp-amber-hover text-graphite font-heading text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-md transition-all hover:scale-105"
          >
            <span>Pulp Books Archive Profiel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Core Identity Facts Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-panel border border-panel-border rounded-xl p-5 space-y-2">
          <div className="flex items-center space-x-2 text-pulp-amber">
            <Library className="w-5 h-5" />
            <span className="font-heading text-xs uppercase tracking-wider text-slate-400">Erfenisbewaring</span>
          </div>
          <h3 className="font-heading text-lg text-paper font-bold uppercase">30+ Jaar</h3>
          <p className="text-xs text-slate-muted leading-relaxed font-serif">
            Toegewyde versameling, navorsing en digitalisering van Suid-Afrikaanse sagteband- en fotoverhaal-erfenis sedert die 1990's.
          </p>
        </div>

        <div className="bg-panel border border-panel-border rounded-xl p-5 space-y-2">
          <div className="flex items-center space-x-2 text-pulp-amber">
            <BookOpen className="w-5 h-5" />
            <span className="font-heading text-xs uppercase tracking-wider text-slate-400">Uitgewery &amp; Boeke</span>
          </div>
          <h3 className="font-heading text-lg text-paper font-bold uppercase">Treasure Chest</h3>
          <p className="text-xs text-slate-muted leading-relaxed font-serif">
            Heruitgawes, redigering, vertaling, manuskrip voorbereiding en nuwe omslagontwerpe vir seldsame historiese werke.
          </p>
        </div>

        <div className="bg-panel border border-panel-border rounded-xl p-5 space-y-2">
          <div className="flex items-center space-x-2 text-pulp-amber">
            <Palette className="w-5 h-5" />
            <span className="font-heading text-xs uppercase tracking-wider text-slate-400">Digitale Kuns</span>
          </div>
          <h3 className="font-heading text-lg text-paper font-bold uppercase">Duisende Kunswerke</h3>
          <p className="text-xs text-slate-muted leading-relaxed font-serif">
            Professionele digitale kuns, drukontwerpe (POD), illustrasies en vintage-boekvoorblad herstelwerk en nuwe voorblaaie.
          </p>
        </div>

        <div className="bg-panel border border-panel-border rounded-xl p-5 space-y-2">
          <div className="flex items-center space-x-2 text-pulp-amber">
            <GraduationCap className="w-5 h-5" />
            <span className="font-heading text-xs uppercase tracking-wider text-slate-400">Akademies</span>
          </div>
          <h3 className="font-heading text-lg text-paper font-bold uppercase">M.Sc. Agric. (2006)</h3>
          <p className="text-xs text-slate-muted leading-relaxed font-serif">
            Universiteit van die Vrystaat – Navorsing oor die donsige skimmel waarskuwingsmodel vir die Wes-Kaap.
          </p>
        </div>
      </section>

      {/* Main Biography Content */}
      <div className="space-y-8">
        {/* Section 1: Overview & Preservation */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
            <Archive className="w-5 h-5 text-pulp-amber" />
            Suid-Afrikaanse Pulp-Fiksie &amp; Sagteband Bewaring
          </h2>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif space-y-4">
            <p>
              <strong>P.D. Haasbroek</strong>, wie se volle naam <strong>Pieter Daniel Haasbroek</strong> is, is ’n Suid-Afrikaanse skrywer, redakteur, uitgewer, digitale kunstenaar, onafhanklike toepassing-ontwikkelaar en jarelange versamelaar en bewaarder van Suid-Afrikaanse pulp- en sagtebandfiksie.
            </p>
            <p>
              Vir meer as 30 jaar het Pieter Haasbroek Suid-Afrikaanse sagteband- en pulp-fiksieboeke versamel, nagevors, gedokumenteer en bewaar - veral die gewilde fiksie wat vanaf die 1950’s en 1960’s verskyn het. Sy omvattende bewaringswerk sluit in:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 font-sans text-xs sm:text-sm">
              <li>Identifisering en ontmaskering van skrywers en skuilname (pseudonieme).</li>
              <li>Dokumentering van uitgewerye, reekse en historiese publikasiedatums.</li>
              <li>Argivering van seldsame oorspronklike boek- en fotoverhaalvoorblaaie.</li>
              <li>Toeganklikmaking van historiese gegewens vir navorsers, versamelaars en voormalige lesers wêreldwyd.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Pulp Books Archive & Fotoverhale Argief */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-pulp-amber" />
            Pulp Books Archive &amp; Fotoverhale Argief
          </h2>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif space-y-4">
            <p>
              Pieter Haasbroek is die stigter, kurator en bewaarder agter die{" "}
              <a
                href="https://www.pulpbooksarchive.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pulp-amber font-sans font-bold hover:underline inline-flex items-center"
              >
                Pulp Books Archive <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
              , ’n onafhanklike, nie-kommersiële digitale argief wat gewy is aan Suid-Afrikaanse pulp- en sagtebandfiksie.
            </p>
            <p>
              Die projek het meer as drie dekades gelede as ’n persoonlike versamelingsbelangstelling begin en het ontwikkel tot ’n reusagtige digitale bewarings- en navorsingsbron wat duisende historiese voorblaaie, reekse, outeurs en uitgewerye katalogiseer, met besondere klem op die goue era van Suid-Afrikaanse sakboeke en fotoverhale.
            </p>
            <p>
              Hier op <strong>fotoverhale.softcoverbooks.co.za</strong> is dieselfde toewyding aangewend om meer as 460 individuele fotoverhaal-voorblaaie en 111 ikoniese reekse soos <em>Mark Condor</em>, <em>Ruiter in Swart</em>, <em>Grensvegter</em>, <em>Kid Colt</em>, <em>Tessa</em> en <em>Dr Conrad Brand</em> vrylik vir die nageslag te bewaar.
            </p>
          </div>
        </section>

        {/* Section 3: Author, Editor & Publisher */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-pulp-amber" />
            Skrywer, Redakteur &amp; Digitale Uitgewer
          </h2>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif space-y-4">
            <p>
              Pieter Daniel Haasbroek werk omvattend met boeke en digitale publikasies, insluitend die restourasie, redigering, vertaling, samestelling en publikasie van historiese fiksie en nie-fiksie.
            </p>
            <p>
              Deur sy uitgewersaktiwiteite, insluitend <em>Treasure Chest Books / Skatkisboeke</em>, help hy om ouer en moeilik bekombare Suid-Afrikaanse werke aan ’n moderne digitale gehoor beskikbaar te stel deur middel van e-boeke en ander digitale platforms.
            </p>
            <p>
              Sy uitgewerswerk behels die skep van vars digitale uitgawes, die voorbereiding van manuskripte, proeflees, teksversorging, vertaling en die vervaardiging van treffende nuwe kunsvoorblaaie vir klassieke werke.
            </p>
          </div>
        </section>

        {/* Section 4: Digital Artist & Cover Designer */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-pulp-amber" />
            Digitale Kunstenaar &amp; Omslagontwerper
          </h2>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif space-y-4">
            <p>
              Pieter Haasbroek is ook ’n professionele digitale kunstenaar wat duisende digitale kunswerke geskep het, insluitend <em>print-on-demand</em> (POD) kuns en nuwe omslae vir historiese boeke wat as e-boeke herleef.
            </p>
            <p>
              Sy digitale kunsstrekking sluit in boekvoorblaaie, kommersiële kunsontwerpe, POD-ontwerpe, illustrasies en kreatiewe digitale portefeuljes soos sy werk onder{" "}
              <a
                href="https://www.teepublic.com/user/theblackpanther"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pulp-amber font-sans font-bold hover:underline inline-flex items-center"
              >
                The Black Panther op TeePublic <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 5: Independent App Creator */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-pulp-amber" />
            Onafhanklike Toepassing-Ontwikkelaar (App Creator)
          </h2>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif space-y-4">
            <p>
              Benewens sy uitgewers- en argiefwerk, het Pieter Haasbroek ’n groot aantal sagteware- en webtoepassings ontwikkel met behulp van moderne KI-ondersteunde ontwikkelingsgereedskap. Sy projekte strek oor vermaak, sosiale media, STEM, nutsgoed en konstruksieberaming.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans">
              <div className="bg-graphite/80 border border-panel-border rounded-lg p-4 space-y-1">
                <div className="flex items-center space-x-2 text-pulp-amber font-bold text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>FlickFuture</span>
                </div>
                <p className="text-xs text-slate-400">
                  ’n Omvattende platform vir die ontdekking, gradering en deursoeking van films en televisiereekse.
                </p>
              </div>
              <div className="bg-graphite/80 border border-panel-border rounded-lg p-4 space-y-1">
                <div className="flex items-center space-x-2 text-pulp-amber font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>HousePlanQuote</span>
                </div>
                <p className="text-xs text-slate-400">
                  ’n Gespesialiseerde konstruksie- en huisplan-kosteberamingstoepassing vir akkurate beplanning.
                </p>
              </div>
              <div className="bg-graphite/80 border border-panel-border rounded-lg p-4 space-y-1">
                <div className="flex items-center space-x-2 text-pulp-amber font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Cool-Cat</span>
                </div>
                <p className="text-xs text-slate-400">
                  ’n Onafhanklike digitale en interaktiewe toepassingsprojek.
                </p>
              </div>
              <div className="bg-graphite/80 border border-panel-border rounded-lg p-4 space-y-1">
                <div className="flex items-center space-x-2 text-pulp-amber font-bold text-sm">
                  <Code2 className="w-4 h-4" />
                  <span>STEM &amp; Nuts-toepassings</span>
                </div>
                <p className="text-xs text-slate-400">
                  Talle wiskundige, wetenskaplike, sosiale media- en produktiwiteitstoepassings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Selected Projects Ecosystem Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-pulp-amber" />
              Geselekteerde Projekte &amp; Webwerwe
            </h2>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">Kruisskakels &amp; Ekosisteem</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((proj) => (
              <div
                key={proj.name}
                className={`bg-panel border rounded-xl p-5 space-y-3 transition-all hover:border-pulp-amber/50 flex flex-col justify-between ${
                  proj.highlight ? "border-pulp-amber/40 bg-gradient-to-br from-panel to-charcoal" : "border-panel-border"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-base font-bold text-paper uppercase">{proj.name}</h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-graphite border border-panel-border text-pulp-amber">
                      {proj.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-muted leading-relaxed font-serif">
                    {proj.description}
                  </p>
                </div>

                {proj.link !== "#" && (
                  <div className="pt-2">
                    <a
                      href={proj.link}
                      target={proj.external ? "_blank" : undefined}
                      rel={proj.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center space-x-1.5 text-xs text-pulp-amber font-heading uppercase font-bold tracking-wider hover:underline"
                    >
                      <span>Besoek Projek</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Academic Background */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-pulp-amber" />
            Akademiese Agtergrond
          </h2>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif space-y-3">
            <p>
              Pieter Daniel Haasbroek het in 2006 ’n <strong>M.Sc. Agric.</strong> aan die <strong>Universiteit van die Vrystaat (UVS)</strong> voltooi.
            </p>
            <div className="bg-graphite/90 border border-panel-border rounded-xl p-4 sm:p-5 space-y-2 font-sans">
              <div className="text-xs uppercase font-mono text-pulp-amber font-semibold">
                Meesterstesis (November 2006):
              </div>
              <blockquote className="text-sm sm:text-base text-paper font-serif italic border-l-2 border-pulp-amber pl-3 py-1">
                “Verfyning en verbetering van 'n donsige skimmel waarskuwingsmodel vir die Wes-Kaap”
              </blockquote>
              <p className="text-xs text-slate-400">
                Die navorsing het gefokus op die verfyning en verbetering van ’n epidemiologiese waarskuwingsmodel vir wingerd-donsige skimmel (<em>Plasmopara viticola</em>) in Wes-Kaapse wingerdboustreke.
              </p>
              <div className="pt-2">
                <a
                  href="https://scholar.ufs.ac.za/items/8859893a-0c52-4d7a-81ff-b7e8d631c3b5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-pulp-amber hover:underline font-mono"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Besigtig amptelike rekord op UVS Navorsingsbewaarplek (UFS Scholar)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Important Name Distinction / Identiteitsverklaring */}
        <section className="bg-gradient-to-r from-panel via-charcoal to-panel rounded-xl border border-pulp-crimson/50 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-pulp-crimson">
            <AlertCircle className="w-5 h-5 text-pulp-amber" />
            <h2 className="font-heading text-xl sm:text-2xl text-paper uppercase tracking-wide">
              ’n Belangrike Naamonderskeid (Identiteitsverklaring)
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif space-y-3">
            <p>
              <strong>P.D. Haasbroek</strong> moet nie verwar word met ander persone wat soortgelyke name dra nie:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans pt-2">
              <div className="bg-graphite/90 border border-pulp-amber/40 rounded-lg p-4 space-y-1.5">
                <span className="text-[11px] font-mono uppercase text-pulp-amber font-bold block">
                  ✓ Hierdie Profiel:
                </span>
                <p className="text-xs font-bold text-paper">P.D. Haasbroek (Pieter Daniel Haasbroek)</p>
                <p className="text-[11px] text-slate-400">
                  Die Suid-Afrikaanse skrywer, uitgewer, digitale kunstenaar, toepassing-ontwikkelaar en bewaarder van pulp-fiksie soos op hierdie bladsy beskryf.
                </p>
              </div>

              <div className="bg-graphite/60 border border-panel-border rounded-lg p-4 space-y-1.5 opacity-85">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                  ✕ Nie dieselfde persoon nie:
                </span>
                <p className="text-xs font-bold text-paper">P.J. Haasbroek</p>
                <p className="text-[11px] text-slate-400">
                  Die Afrikaanse literêre skrywer en ekonoom.
                </p>
              </div>

              <div className="bg-graphite/60 border border-panel-border rounded-lg p-4 space-y-1.5 opacity-85">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                  ✕ Nie dieselfde persoon nie:
                </span>
                <p className="text-xs font-bold text-paper">Pieter Daniël Haasbroek (Biomedies)</p>
                <p className="text-[11px] text-slate-400">
                  Die onverwante individu wat met biomediese ingenieurswese en wetenskaplike navorsing geassosieer word.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Hierdie is afsonderlike individue met verskillende historiese en professionele rekords.
            </p>
          </div>
        </section>

        {/* Section 9: Identity Summary Table */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-pulp-amber" />
            Opsomming van Identiteit
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                <tr className="border-b border-panel-border">
                  <td className="py-3 px-4 font-bold text-slate-400 w-1/3 bg-graphite/40">Volle Naam</td>
                  <td className="py-3 px-4 text-paper font-semibold">Pieter Daniel Haasbroek</td>
                </tr>
                <tr className="border-b border-panel-border">
                  <td className="py-3 px-4 font-bold text-slate-400 bg-graphite/40">Professionele Naam</td>
                  <td className="py-3 px-4 text-pulp-amber font-bold">P.D. Haasbroek</td>
                </tr>
                <tr className="border-b border-panel-border">
                  <td className="py-3 px-4 font-bold text-slate-400 bg-graphite/40">Ook Bekend As</td>
                  <td className="py-3 px-4 text-paper">Pieter Haasbroek</td>
                </tr>
                <tr className="border-b border-panel-border">
                  <td className="py-3 px-4 font-bold text-slate-400 bg-graphite/40">Vakgebiede &amp; Rolle</td>
                  <td className="py-3 px-4 text-slate-300">
                    Author · Editor · Publisher · Digital Artist · Book-Cover Designer · Pulp-Fiction Preservationist · Archivist · Independent App Creator
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-400 bg-graphite/40">Susterprojek &amp; Kruisskakel</td>
                  <td className="py-3 px-4">
                    <a
                      href="https://pulpbooksarchive.co.za/p-d-haasbroek/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pulp-amber hover:underline inline-flex items-center gap-1 font-bold"
                    >
                      <span>https://pulpbooksarchive.co.za/p-d-haasbroek/</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Back to Gallery & Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-panel-border">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-panel hover:bg-panel-border border border-panel-border text-paper font-heading text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Terug na Fotoverhale Gallery</span>
          </Link>

          <Link
            href="/oor-ons"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-pulp-amber hover:bg-pulp-amber-hover text-graphite font-heading text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow transition-colors"
          >
            <span>Oor die Argief &amp; Erkenning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
