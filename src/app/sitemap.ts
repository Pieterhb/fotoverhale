import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { Series } from "@/types";

const BASE_URL = "https://fotoverhale.softcoverbooks.co.za";

function getFotoverhaleData(): Series[] {
  try {
    const filePath = path.join(process.cwd(), "data", "fotoverhale.json");
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

function getDataLastMod(): Date {
  try {
    const filePath = path.join(process.cwd(), "data", "fotoverhale.json");
    if (fs.existsSync(filePath)) {
      return fs.statSync(filePath).mtime;
    }
  } catch {
    // fallback
  }
  return new Date("2026-09-17T12:00:00Z");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const seriesList = getFotoverhaleData();
  const archiveLastMod = getDataLastMod();

  // Static core routes (100% 200 OK canonical URLs)
  // Root URL MUST include trailing slash to match HTTP protocol and server canonical standard
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: archiveLastMod,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/reeks`,
      lastModified: archiveLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/p-d-haasbroek`,
      lastModified: archiveLastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/geskiedenis`,
      lastModified: archiveLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/oor-ons`,
      lastModified: archiveLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privaatheidsbeleid`,
      lastModified: archiveLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terme-en-voorwaardes`,
      lastModified: archiveLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic series routes: filter active, valid canonical series
  const seenSlugs = new Set<string>();
  const validSeries = seriesList.filter((series) => {
    if (!series.id || typeof series.id !== "string") return false;
    const cleanSlug = series.id.trim().toLowerCase();
    if (!cleanSlug || seenSlugs.has(cleanSlug)) return false;
    seenSlugs.add(cleanSlug);

    // Ensure series has at least one catalogued issue or cover image
    const hasCovers = (series.total_covers && series.total_covers > 0) ||
      (series.issues && series.issues.length > 0) ||
      Boolean(series.cover_image);
    return hasCovers;
  });

  const seriesRoutes: MetadataRoute.Sitemap = validSeries.map((series) => {
    const coversCount = series.total_covers || (series.issues ? series.issues.length : 1);
    const cleanSlug = series.id.trim().toLowerCase();
    
    // Tiered priority based on archival content depth
    let priority = 0.7;
    let changeFrequency: "weekly" | "monthly" = "monthly";
    if (coversCount >= 5) {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (coversCount >= 2) {
      priority = 0.8;
      changeFrequency = "monthly";
    }

    return {
      url: `${BASE_URL}/reeks/${cleanSlug}`,
      lastModified: archiveLastMod,
      changeFrequency,
      priority,
    };
  });

  return [...staticRoutes, ...seriesRoutes];
}
