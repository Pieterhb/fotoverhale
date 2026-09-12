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

  return {
    title: `${series.title} | Fotoverhaal Argief`,
    description: `${series.title} fotoverhale reeks. ${series.description.slice(0, 150)}...`,
    openGraph: {
      title: `${series.title} - Suid-Afrikaanse Fotoverhaal Argief`,
      description: series.description.slice(0, 160),
      images: series.cover_image ? [series.cover_image] : [],
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

  return <SeriesDetailClient series={series} />;
}
