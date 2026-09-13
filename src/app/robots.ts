import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://fotoverhale.softcoverbooks.co.za/sitemap.xml",
    host: "https://fotoverhale.softcoverbooks.co.za",
  };
}
