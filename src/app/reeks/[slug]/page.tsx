import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Series } from "@/types";
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
      title: "Reeks Nie Gevind Nie | Suid-Afrikaanse Fotoverhaal Argief",
    };
  }

  const fullImageUrl = series.cover_image
    ? `https://fotoverhale.softcoverbooks.co.za${series.cover_image}`
    : "https://fotoverhale.softcoverbooks.co.za/icon-512.png";

  const cleanDescription = series.description
    ? `${series.description.slice(0, 155).trim()}...`
    : `Ontdek die gewilde Suid-Afrikaanse fotoverhaal-reeks ${series.title} (${series.genre}, ${series.language}) met ${series.total_covers} gekatalogiseerde voorblaaie.`;

  return {
    title: `${series.title} (${series.language} Fotoverhaal) | Uitgawes & Voorblaaie`,
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
      title: `${series.title} - Suid-Afrikaanse Fotoverhaal Argief`,
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
      title: `${series.title} (${series.language} Fotoverhaal)`,
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
        "description": series.description,
        "genre": series.genre,
        "inLanguage": series.language === "Afrikaans" ? "af" : "en",
        "publisher": {
          "@type": "Organization",
          "name": series.publisher || "Republikeinse Publikasies",
        },
        "image": series.cover_image
          ? `https://fotoverhale.softcoverbooks.co.za${series.cover_image}`
          : undefined,
        "url": `https://fotoverhale.softcoverbooks.co.za/reeks/${series.id}`,
        "numberOfItems": series.total_covers,
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
            "name": series.genre,
            "item": "https://fotoverhale.softcoverbooks.co.za/#gallery",
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
      <SeriesDetailClient series={series} />
    </>
  );
}
