import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Series } from "@/types";
import { generateCleanDescription } from "@/lib/seo-helpers";
import SeriesDetailClient from "@/components/SeriesDetailClient";

async function getFotoverhaleData(): Promise<Series[]> {
  const filePath = path.join(process.cwd(), "data", "fotoverhale.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

export async function generateStaticParams() {
  const allSeries = await getFotoverhaleData();
  return allSeries.map((series) => ({
    slug: series.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const allSeries = await getFotoverhaleData();
  const series = allSeries.find((s) => s.id === params.slug);

  if (!series) {
    return {
      title: "Reeks Nie Gevind Nie",
    };
  }

  const fullImageUrl = series.cover_image
    ? `https://fotoverhale.softcoverbooks.co.za${series.cover_image}`
    : "https://fotoverhale.softcoverbooks.co.za/icon-512.png";

  const cleanDescription = generateCleanDescription(series);

  return {
    title: series.title.length > 25
      ? series.title
      : `${series.title} (${series.language})`,
    description: cleanDescription,
    keywords: [
      series.title,
      series.genre,
      series.language,
      series.publisher || "Republikeinse Publikasies",
      "fotoverhaal",
      "kyk-en-lees",
      "Suid-Afrikaanse fotoverhale",
      ...(series.aliases || []),
    ],
    alternates: {
      canonical: `https://fotoverhale.softcoverbooks.co.za/reeks/${series.id}`,
    },
    openGraph: {
      title: `${series.title} - Voorblaaie & Argief`,
      description: cleanDescription,
      url: `https://fotoverhale.softcoverbooks.co.za/reeks/${series.id}`,
      type: "website",
      images: [
        {
          url: fullImageUrl,
          width: 600,
          height: 800,
          alt: `${series.title} Fotoverhaal Voorblad`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${series.title} (${series.language}) - Voorblaaie`,
      description: cleanDescription,
      images: [fullImageUrl],
    },
  };
}

export default async function SeriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const allSeries = await getFotoverhaleData();
  const series = allSeries.find((s) => s.id === params.slug);

  if (!series) {
    notFound();
  }

  const jsonLdSeries = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BookSeries",
        "@id": `https://fotoverhale.softcoverbooks.co.za/reeks/${series.id}#series`,
        "name": series.title,
        "description": series.description || generateCleanDescription(series),
        "genre": series.genre,
        "inLanguage": series.language === "Afrikaans" ? "af" : "en",
        "publisher": {
          "@type": "Organization",
          "name": series.publisher || "Republikeinse Publikasies",
        },
        "editor": {
          "@type": "Person",
          "@id": "https://pulpbooksarchive.co.za/p-d-haasbroek/#person",
          "name": "Pieter Daniel Haasbroek",
          "alternateName": "P.D. Haasbroek",
          "url": "https://fotoverhale.softcoverbooks.co.za/p-d-haasbroek"
        },
        "image": series.cover_image
          ? `https://fotoverhale.softcoverbooks.co.za${series.cover_image}`
          : undefined,
        "url": `https://fotoverhale.softcoverbooks.co.za/reeks/${series.id}`,
        "numberOfItems": series.total_covers,
        "hasPart": (series.issues || []).map((iss) => ({
          "@type": "PublicationIssue",
          "issueNumber": iss.number,
          "name": iss.title,
          "image": iss.image ? `https://fotoverhale.softcoverbooks.co.za${iss.image}` : undefined,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Argief Gallery",
            "item": "https://fotoverhale.softcoverbooks.co.za",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": series.title,
            "item": `https://fotoverhale.softcoverbooks.co.za/reeks/${series.id}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSeries),
        }}
      />
      <SeriesDetailClient series={series} />
    </>
  );
}
