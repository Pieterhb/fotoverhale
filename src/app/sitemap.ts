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

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
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
      url: `${BASE_URL}/p-d-haasbroek`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Dynamic series routes (111 series)
  const seriesRoutes: MetadataRoute.Sitemap = seriesList.map((series) => ({
    url: `${BASE_URL}/reeks/${series.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...seriesRoutes];
}
