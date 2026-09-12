export interface Issue {
  number: number;
  title: string;
  image?: string | null;
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
  issues: Issue[];
}

export type GenreCategory = 
  | "Alles"
  | "Aksie & Avontuur"
  | "Westerns"
  | "Speurder & Spioen"
  | "Liefde & Romanse"
  | "Medies & Hospitaal"
  | "Engelse Uitgawes";
