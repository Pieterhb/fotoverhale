import Link from "next/link";
import { History, BookOpen, Calendar, Tv, Users, Award, ShieldAlert, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Die Geskiedenis van die Suid-Afrikaanse Fotoverhaal | Koos Papenfus",
  description: "Die volledige geskiedenis van die fotoverhaal in Suid-Afrika: Mark Condor, Ruiter in Swart, Grensvegter, en die impak van TV in 1976.",
};

export default function GeskiedenisPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <header className="space-y-4 text-center border-b border-panel-border pb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pulp-amber/15 text-pulp-amber border border-pulp-amber/30 text-xs font-semibold uppercase tracking-wider">
          <History className="w-3.5 h-3.5" />
          <span>Historiese Oorsig & Argiefartikel</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold text-paper uppercase tracking-tight leading-tight">
          Die Geskiedenis van die <br />
          <span className="text-pulp-amber">Suid-Afrikaanse Fotoverhaal</span>
        </h1>

        <p className="text-sm text-slate-muted font-mono">
          Saamgestel en opgeteken deur <strong>mnr. Koos Papenfus</strong>, met navorsingsbydraes deur Carol Hardijzer en Pieter Haasbroek.
        </p>
      </header>

      {/* Main Content Body with Vintage Editorial Styling */}
      <div className="prose prose-invert max-w-none text-paper-muted font-serif text-base sm:text-lg leading-relaxed space-y-8">
        
        {/* Intro */}
        <section className="bg-panel/70 p-6 sm:p-8 rounded-xl border border-panel-border space-y-4">
          <h2 className="font-heading text-2xl text-paper uppercase tracking-wide not-prose flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-pulp-amber" />
            Inleiding: Die Unieke Kyk-en-Lees Fenomeen
          </h2>
          <p className="text-paper/90">
            In die 1960’s, 1970’s en vroeë 1980’s het ’n unieke literêre en visuele medium miljoene Suid-Afrikaners weekliks vasgenael gehou: die <strong>fotoverhaal</strong> (ook bekend as die geliefde <em>kyk-en-lees</em> boekie). Anders as oorsese strokiesprente wat met die hand geteken is, het die Suid-Afrikaanse fotoverhaal gebruik gemaak van <strong>regte akteurs, fotograwe, grimering en werklike liggings</strong> in Johannesburg, Durban, Pretoria en die Transvaalse Laeveld.
          </p>
          <p>
            Gedruk op kenmerkende goedkoop koerantpapier met helder, glansende voorblaaie, was hierdie sakgrootte boekies vir slegs ’n paar sent te koop by kafees, stasiewinkels en algemene handelaars. Vir menige jongeling en volwassene was dit die primêre bron van weeklikse aksie, romanse en ontvlugting.
          </p>
        </section>

        {/* 1. Mark Condor */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-pulp-amber text-graphite font-heading text-lg font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide not-prose">
              Die Ontstaan: Mark Condor en die Goue Eeu
            </h2>
          </div>

          <p>
            Die fotoverhaal-era het in die vroeë 1960’s momentum gekry. Een van die vroegste baanbrekers en reuse-suksesse was <strong>Mark Condor</strong>. Mark Condor was Suid-Afrika se eie geheime agent – ’n plaaslike James Bond: aantreklik, onverskrokke, en altyd slaggereed om internasionale misdaadsindikate, sluipmoordenaars en eksotiese spioene vas te vat.
          </p>
          <p>
            Die beproefde formule van vinnige pistoolaksie, eksotiese vroue, motors van die era en dramatiese vuisgevegte het ’n ongekende lesersmark ontsluit. Mark Condor het die fondament gelê vir tientalle ander reekse wat vinnig die mark sou oorstroom.
          </p>

          <div className="not-prose pt-2">
            <Link 
              href="/reeks/mark-condor"
              className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-pulp-amber hover:text-pulp-amber-hover transition-colors font-bold"
            >
              <span>Bekyk Mark Condor Voorblaaie in die Argief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 2. Westerns */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-pulp-amber text-graphite font-heading text-lg font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide not-prose">
              Die Western-Era: Ruiter in Swart en Kid die Swerwer
            </h2>
          </div>

          <p>
            Kort op die hakke van Mark Condor het die "cowboy"-genre Suid-Afrika stormerhand verower. Suid-Afrikaners was tradisioneel baie lief vir cowboy-stories, wat reeds in die 1950’s as gewone sagtebandboeke blitsverkopers was.
          </p>

          <div className="bg-graphite/60 border-l-4 border-pulp-amber p-4 rounded-r-lg my-4 not-prose">
            <h4 className="font-heading text-paper uppercase text-base mb-1">
              Die Legende van Ben Brandt (Ruiter in Swart)
            </h4>
            <p className="text-xs text-slate-muted leading-relaxed font-serif">
              Geklee in swart van kop tot tone, was hy ’n ZARP-man (lid van die ou Zuid-Afrikaansche Republiek Polisie) en ’n persoonlike vriend van president Paul Kruger. Met sy twee pistole gerig vir die berugte "crossdraw", sy swart perd Satan en sy wolfhond, het hy geregtigheid in die goudvelde en laeveld laat geskied. Die rol is vir jare lank meesterlik vertolk deur <strong>Danie van Rensburg</strong>, bekend onder sy akteursnaam <strong>Vonk de Ridder</strong>.
            </p>
          </div>

          <p>
            Saam met die Ruiter het <em>Kid die Swerwer</em> en sy Engelse eweknie <em>Kid Colt</em> reuse leserstalle gelok. Verhale van rowers, delwers en skurke het lesers week na week laat toustaan by die kafees.
          </p>

          <div className="not-prose flex flex-wrap gap-4 pt-2">
            <Link 
              href="/reeks/ruiter-in-swart"
              className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-pulp-amber hover:underline font-bold"
            >
              <span>Ruiter in Swart Argief &rarr;</span>
            </Link>
            <Link 
              href="/reeks/kid-colt"
              className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-pulp-amber hover:underline font-bold"
            >
              <span>Kid Colt Argief &rarr;</span>
            </Link>
          </div>
        </section>

        {/* 3. Die Grensoorlog */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-pulp-amber text-graphite font-heading text-lg font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide not-prose">
              Die Bosoorlog en Rocco de Wet: Grensvegter
            </h2>
          </div>

          <p>
            In die dae van die Bosoorlog het die werklikheid van die grensfeitlik elke gesin in Suid-Afrika geraak. Byna elke familie het ’n seun, broer of man gehad wat iewers op die grens of in die Weermag diens gedoen het. Dit was die era waarin flieks soos <em>Kaptein Caprivi</em> en <em>Boetie gaan Border toe</em> die inryteaters stampvol gepak het.
          </p>
          <p>
            In hierdie tydvak het <strong>Grensvegter</strong> die lig gesien. <strong>Rocco de Wet</strong> was die onstuitbare eenman-oorlogsmasjien wat die vyand diep in die bos gaan aanvat en uitgewis het. Later het <strong>Dan Pienaar</strong> die fakkel by hom oorgeneem – ’n slim skuif van die uitgewers om ’n vars dinamika te bring sonder om die karakter se geloofwaardigheid in te boet.
          </p>

          <div className="not-prose pt-2">
            <Link 
              href="/reeks/grensvegter"
              className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-pulp-amber hover:underline font-bold"
            >
              <span>Bekyk Grensvegter se 31 Voorblaaie in die Argief &rarr;</span>
            </Link>
          </div>
        </section>

        {/* 4. Tessa en Vroulike Karakters */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-pulp-amber text-graphite font-heading text-lg font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide not-prose">
              Tessa, Wit Tier, en Mediese Romans
            </h2>
          </div>

          <p>
            Fotoverhale was nie net vir mans nie. Reekse soos <strong>Tessa</strong> het ’n nuwe era van vroulike aksieheldinne ingelui. As ’n beeldskone, blonde spioen en avonturier wat gereeld in swemklere of ’n bikini verskyn het, het sy gewys dat ’n vrou net so vaardig met die vuiste en die rewolwer kon wees. Die uitgewers het streng binne die Sensuurraad se riglyne gebly, maar Tessa het ’n vars bries in die mark gebring.
          </p>
          <p>
            Aan die ander kant van die spektrum was <strong>Dr. Conrad Brand</strong> ("die dokter met die goue hart") en <strong>Saal 10 / Saal 10 Ongevalle</strong> – lewenswerklike, emosiebelaaide hospitaal- en verpleegster-dramas wat veral groot aanklank by vroulike lesers gevind het.
          </p>
          <p>
            Vir oerwoud-aanhangers was daar <strong>Die Wit Tier</strong> in die denkbeeldige Afrika-koninkryk Takaranië – ’n Afrika-Tarzan wat met jagmes en spiere teen ivoorsmokkelaars en geheimsinnige diere geveg het, soortgelyk aan Lee Falk se <em>The Phantom</em>.
          </p>
        </section>

        {/* 5. Anonieme Akteurs */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-pulp-amber text-graphite font-heading text-lg font-bold flex items-center justify-center shrink-0">
              5
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide not-prose">
              Waarom Akteurs en Skeppers Selde Gekrediteer is
            </h2>
          </div>

          <p>
            ’n Vraag wat vandag dikwels gevra word: <em>Waarom het die akteurs, fotograwe en skrywers byna nooit erkenning in die boekies ontvang nie?</em>
          </p>
          <ul className="list-disc pl-6 space-y-2 text-paper/90">
            <li>
              <strong>Streng Uitgewersbeheer:</strong> Uitgewersreuse soos <strong>Republikeinse Publikasies</strong> in Durban wou volle eienaarskap oor die karakters behou. As ’n akteur te veeleisend sou word, kon die uitgewer die akteur eenvoudig vervang sonder dat lesers amptelik daarvan geweet het.
            </li>
            <li>
              <strong>Beskerming van Privaatheid:</strong> Baie van die modelle en akteurs was gewone studente, onderwysers of kantoorwerkers wat slegs ’n beskeie ekstra inkomste (dikwels slegs R10 tot R20 per opnamesessie) verdien het. Hulle wou nie noodwendig in hul daaglikse lewens met die sensasionele intriges verbind word nie.
            </li>
            <li>
              <strong>Hoë Produksiespoed:</strong> ’n Tipiese fotoverhaal is dikwels binne ’n enkele naweek opgeneem en binne enkele dae op die rotasiepers gedruk.
            </li>
          </ul>
        </section>

        {/* 6. Die Impak van Televisie (1976) */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-pulp-amber text-graphite font-heading text-lg font-bold flex items-center justify-center shrink-0">
              6
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-paper uppercase tracking-wide not-prose">
              Die Koms van Televisie (1976) en die Einde van die Era
            </h2>
          </div>

          <p>
            Die waterskeidingsdatum vir die fotoverhaal was <strong>1 Januarie 1976</strong>: die amptelike bekendstelling van <strong>Suid-Afrikaanse Televisie (SAUK)</strong>.
          </p>
          <p>
            Skielik het Suid-Afrikaners bewegende beelde, klank en internasionale drama direk in hul sitkamers gehad. Die noodsaaklikheid van stilstaande fotoboekies om die verbeelding te prikkel het vinnig begin afneem. Tesame met stygende papier- en drukkoste in die 1980’s en die opkoms van video-kassette (VHS), het die glorieryke era van die kyk-en-lees fotoverhaal tot ’n einde gekom.
          </p>
        </section>

        {/* Slot / Erkenning */}
        <section className="bg-panel rounded-xl border border-panel-border p-6 sm:p-8 space-y-4 not-prose">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-pulp-amber" />
            <h3 className="font-heading text-xl text-paper uppercase tracking-wider">
              Bewaring van Hierdie Erfenis
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-serif">
            Hierdie artikel is oorspronklik opgestel deur <strong>mnr. Koos Papenfus</strong> en digitaal bewaar deur <strong>mnr. Pieter Haasbroek</strong> op <em>softcoverbooks.co.za</em>. Ons bring hiermee hulde aan die skrywers, fotograwe, akteurs en versamelaars wat hierdie unieke Suid-Afrikaanse storie-erfenis lewend hou.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-pulp-amber hover:bg-pulp-amber-hover text-graphite font-heading text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors"
            >
              <span>Gaan Terug na die Boekgallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>

    </article>
  );
}
