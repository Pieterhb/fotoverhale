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
 * Generates a clean, 140-155 character meta description for series pages.
 */
export function generateCleanDescription(series: SeriesSeoInfo): string {
  const desc = (series.description || "").replace(/\s+/g, " ").trim();
  
  // If description is comprehensive and not just an issue snippet
  const isSnippet = /^\d+\.\s+/.test(desc) || desc.length < 65;
  if (!isSnippet && desc.length >= 65) {
    if (desc.length <= 155) {
      return desc;
    }
    // Truncate cleanly at word boundary
    const truncated = desc.slice(0, 150);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 110 ? truncated.slice(0, lastSpace) : truncated) + "...";
  }

  // Generate a rich, structured description
  const total = series.total_covers && series.total_covers > 0 ? `${series.total_covers} ` : "";
  const coversText = series.total_covers === 1 ? "voorblad" : "voorblaaie";
  const pub = series.publisher ? `, uitgegee deur ${series.publisher}` : "";
  return `Ontdek die Suid-Afrikaanse fotoverhaal-reeks ${series.title} (${series.genre || "Africana Pulp"}, ${series.language || "Afrikaans"})${pub}. Bekyk alle ${total}${coversText} en argiefinligting (1960–1985).`;
}
