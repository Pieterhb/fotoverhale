import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Series } from "@/types";
import { generateCleanDescription, getSeriesContextualParagraphs } from "@/lib/seo-helpers";
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const fullImageUrl = series.cover_image
    ? `https://fotoverhale.softcoverbooks.co.za${series.cover_image}`
    : "https://fotoverhale.softcoverbooks.co.za/icon-512.png";

  const cleanDescription = generateCleanDescription(series);

  return {
    title: `${series.title} – ${series.genre} Fotoverhaal (${series.language})`,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${series.title} – Voorblaaie & Argief | Fotoverhaal Argief`,
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
      title: `${series.title} (${series.language}) – Voorblaaie`,
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

  const contextualParagraphs = getSeriesContextualParagraphs(series);

  // Find 4 related series in same genre (or fallback to other popular series)
  const relatedSeries = allSeries
    .filter((s) => s.id !== series.id && s.genre === series.genre)
    .slice(0, 5);

  const finalRelated =
    relatedSeries.length >= 3
      ? relatedSeries
      : [
          ...relatedSeries,
          ...allSeries.filter((s) => s.id !== series.id && !relatedSeries.some((r) => r.id === s.id)).slice(0, 5 - relatedSeries.length),
        ];

  const jsonLdSeries = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BookSeries",
        "@id": `https://fotoverhale.softcoverbooks.co.za/reeks/${series.id}#series`,
        "name": series.title,
        "description": generateCleanDescription(series),
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
            "name": "Reekse",
            "item": "https://fotoverhale.softcoverbooks.co.za/reeks",
          },
          {
            "@type": "ListItem",
            "position": 3,
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
      <SeriesDetailClient
        series={series}
        relatedSeries={finalRelated}
        contextualParagraphs={contextualParagraphs}
      />
    </>
  );
}

