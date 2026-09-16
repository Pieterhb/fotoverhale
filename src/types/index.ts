export interface Issue {
  number: number;
  title: string;
  image?: string | null;
  alt?: string;
}

export interface Series {
  id: string;
  title: string;
  genre: string;
  language: string;
  publisher?: string;
  format?: string;
  description: string;
  total_covers: number;
  cover_image: string | null;
  aliases?: string[];
  issues: Issue[];
  alt?: string;
}

export interface BookItem {
  id: string;
  seriesId: string;
  seriesTitle: string;
  issueNumber: number;
  issueTitle: string;
  image: string;
  genre: string;
  language: string;
  publisher?: string;
  format?: string;
  seriesDescription?: string;
  totalCoversInSeries: number;
  aliases?: string[];
  alt?: string;
}

export type GenreCategory = 
  | "Alles"
  | "Aksie & Avontuur"
  | "Westerns"
  | "Speurder & Spioen"
  | "Liefde & Romanse"
  | "Medies & Hospitaal"
  | "Engelse Uitgawes";

