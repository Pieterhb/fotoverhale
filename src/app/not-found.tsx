import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Bladsy Nie Gevind Nie",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-panel border border-panel-border flex items-center justify-center mx-auto text-pulp-amber">
        <BookOpen className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-paper uppercase tracking-tight">
          404: Bladsy Nie Gevind Nie
        </h1>
        <p className="text-slate-muted text-base max-w-md mx-auto leading-relaxed font-serif">
          Die fotoverhaal-bladsy of argiefrekord wat u soek, bestaan nie meer nie of is geskuif.
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-pulp-amber hover:bg-pulp-amber-hover text-graphite font-heading text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-lg hover:shadow-pulp-amber transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keer Terug na Boekgallery</span>
        </Link>
      </div>
    </div>
  );
}
