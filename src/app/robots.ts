import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/404",
          "/404.html",
          "/*?*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/404",
          "/404.html",
          "/*?*",
        ],
      },
    ],
    sitemap: "https://fotoverhale.softcoverbooks.co.za/sitemap.xml",
  };
}
