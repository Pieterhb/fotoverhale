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

export default function sitemap(): MetadataRoute.Sitemap {
  const seriesList = getFotoverhaleData();
  const currentDate = new Date();

  // Static core routes (100% 200 OK canonical URLs)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/reeks`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/p-d-haasbroek`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/geskiedenis`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/oor-ons`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privaatheidsbeleid`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terme-en-voorwaardes`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic series routes: filter active, valid canonical series
  const seenSlugs = new Set<string>();
  const validSeries = seriesList.filter((series) => {
    if (!series.id || typeof series.id !== "string") return false;
    const cleanSlug = series.id.trim();
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
      url: `${BASE_URL}/reeks/${series.id.trim()}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    };
  });

  return [...staticRoutes, ...seriesRoutes];
}
