export interface SeriesSeoInfo {
  title: string;
  genre?: string;
  language?: string;
  publisher?: string;
  description?: string;
  total_covers?: number;
}

export interface IssueSeoInfo {
  number?: number;
  title?: string;
  alt?: string;
}

/**
 * Generates an SEO-rich, descriptive alt text for a series cover image.
 */
export function generateCoverAlt(series: SeriesSeoInfo): string {
  const lang = series.language ? `${series.language} ` : "";
  const genre = series.genre ? `${series.genre}, ` : "";
  const pub = series.publisher ? ` - Uitgegee deur ${series.publisher}` : "";
  return `Oorspronklike voorblad van die Suid-Afrikaanse fotoverhaal-reeks ${series.title} (${genre}${lang}fotoverhaal)${pub}`;
}

/**
 * Generates an SEO-rich, descriptive alt text for an individual issue cover image.
 */
export function generateIssueAlt(
  seriesTitle: string,
  issue: IssueSeoInfo,
  language?: string,
  genre?: string,
  publisher?: string
): string {
  if (issue.alt && issue.alt.trim().length > 0) {
    return issue.alt;
  }
  const rawTitle = (issue.title || "").trim();
  const isGeneric = !rawTitle || ["geen titel", "no title"].includes(rawTitle.toLowerCase());
  const cleanTitlePart = isGeneric ? "" : `: "${rawTitle}"`;
  const langText = language ? `${language} ` : "";
  const genreText = genre ? `, ${genre}` : "";
  const pubText = publisher ? ` - ${publisher}` : "";
  
  if (issue.number) {
    return `Vintage voorblad van ${seriesTitle} Uitgawe #${issue.number}${cleanTitlePart} (${langText}fotoverhaal${genreText})${pubText}`;
  }
  return `Historiese voorblad van ${seriesTitle}${cleanTitlePart} (${langText}fotoverhaal${genreText})${pubText}`;
}

/**
 * Generates a clean, rich 140-160 character meta description for series pages.
 */
export function generateCleanDescription(series: SeriesSeoInfo): string {
  const desc = (series.description || "").replace(/\s+/g, " ").trim();
  
  // Check if description is a generic placeholder or short snippet
  const isGeneric = /^gewilde suid-afrikaanse fotoverhaal-reeks/i.test(desc);
  const isSnippet = /^\d+\.\s+/.test(desc) || desc.length < 95;
  
  if (!isGeneric && !isSnippet && desc.length >= 95) {
    if (desc.length <= 158) {
      return desc;
    }
    // Truncate cleanly at word boundary
    const truncated = desc.slice(0, 155);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 115 ? truncated.slice(0, lastSpace) : truncated) + "...";
  }

  // Generate a rich, structured and unique description
  const total = series.total_covers && series.total_covers > 0 ? `${series.total_covers} ` : "";
  const coversText = series.total_covers === 1 ? "voorblad" : "voorblaaie";
  const pub = series.publisher ? `, uitgegee deur ${series.publisher}` : "";
  const genre = series.genre || "Africana Pulp";
  const lang = series.language || "Afrikaans";
  return `Verken die Suid-Afrikaanse fotoverhaal-reeks ${series.title} (${genre}, ${lang})${pub}. Argiefrekord met ${total}${coversText} en historiese agtergrond (1960–1985).`;
}

/**
 * Provides rich contextual paragraphs for series pages, guaranteeing substantive
 * crawl value even for series with minimal or missing initial notes.
 */
export function getSeriesContextualParagraphs(series: SeriesSeoInfo): string[] {
  const paragraphs: string[] = [];
  const rawDesc = (series.description || "").trim();

  // If there's an existing custom description that isn't just a generic placeholder
  const isGeneric = /^gewilde suid-afrikaanse fotoverhaal-reeks/i.test(rawDesc) && rawDesc.length < 100;
  if (rawDesc.length > 0 && !isGeneric) {
    // Split by newlines or use as paragraph
    const customParts = rawDesc.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    paragraphs.push(...customParts);
  }

  // Genre-specific historical context
  const genreContext: Record<string, string> = {
    Westerns:
      "Die Western-fotoverhaal was een van die mees geliefde genres in Suid-Afrikaanse pulp-fiksie tussen 1960 en 1985. Geïnspireer deur sowel die woeste goudvelde en laeveld van Suid-Afrika as die tradisionele Amerikaanse cowboy-legendes, het hierdie verhale lesers weekliks geboei met rewolweraksie, perdejagte en vuisgevegte tussen geregsdienaars en rowers.",
    "Medies & Hospitaal":
      "Hospitaal- en mediese fotoverhale het 'n reuse-aanhang gehad, veral onder lesers wat gehou het van intense emosionele verhoudings, dokter-verpleegster dinamika en lewensreddende operasiesale. Hierdie dramas het 'n realiteitsgevoel geskep danksy regte akteurs in outentieke Suid-Afrikaanse hospitaalomgewings.",
    "Speurder & Spioen":
      "Speurder- en geheime agent-fotoverhale het die opwinding van die internasionale spioenasie-era na Suid-Afrika gebring. Met vinnige sportmotors, slinkse misdaadsindikate, eksotiese lokasies en onverskrokke speurders het hierdie reekse 'n ongekende lesersmark verower.",
    "Aksie & Avontuur":
      "Aksie- en avontuurverhale het die goue era van plaaslike kyk-en-lees boekies gedefinieer. Elke episode is sorgvuldig beplan met regte akteurs, fotograwe, grimering en werklike liggings regoor Suid-Afrika, wat 'n unieke visuele tydkapsule van die 1960's tot 1980's vorm.",
    "Liefde & Romanse":
      "Liefdes- en romanse-fotoverhale het lesers bekoor met hartstogtelike intriges, familiegeheime en die mode van die era. Hierdie kyk-en-lees tydskrifte was bekostigbaar by plaaslike kafees en stasiewinkels beskikbaar en het 'n belangrike rol in populêre ontvlugtingslektuur gespeel.",
  };

  const genreNote = genreContext[series.genre || ""] ||
    "Hierdie reeks vorm 'n outentieke onderdeel van die Suid-Afrikaanse kyk-en-lees erfenis wat tussen 1960 en 1985 deur miljoene lesers verslind is.";
  paragraphs.push(genreNote);

  // Archival and bibliographic provenance note
  const pubText = series.publisher ? `uitgegee deur ${series.publisher}` : "uitgegee in Suid-Afrika";
  const coversCount = series.total_covers || 1;
  const coversText = coversCount === 1 ? "1 gekatalogiseerde voorblad" : `${coversCount} gekatalogiseerde voorblaaie`;

  paragraphs.push(
    `Hierdie rekord van "${series.title}" (${series.language || "Afrikaans"}, ${pubText}) is saamgestel as deel van die nasionale fotoverhaal-bewaringsprojek deur Pieter Haasbroek en Koos Papenfus. Die argief bevat tans ${coversText} vir hierdie reeks. Indien u oor addisionele uitgawes of seldsame voorblaaie van hierdie reeks beskik, nooi ons u uit om met die argief in verbinding te tree om die historiese rekord te help voltooi.`
  );

  return paragraphs;
}

