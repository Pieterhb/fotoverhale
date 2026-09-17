import Link from "next/link";
import { BookOpen, History, Info, Compass, Sparkles, UserCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-panel-border bg-graphite/95 backdrop-blur supports-[backdrop-filter]:bg-graphite/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 sm:py-0 sm:h-14 gap-2 sm:gap-2 md:gap-4 lg:gap-8">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 lg:space-x-3 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded bg-pulp-crimson/90 border border-pulp-amber/40 flex items-center justify-center shadow-lg group-hover:bg-pulp-crimson transition-all duration-200 shrink-0">
              <span className="font-heading text-base sm:text-lg lg:text-xl font-bold text-paper tracking-wider">FV</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-heading text-base sm:text-base md:text-lg lg:text-2xl font-bold text-paper tracking-wide uppercase group-hover:text-pulp-amber transition-colors whitespace-nowrap">
                  Fotoverhale Argief
                </span>
                <span className="inline-block px-1.5 sm:px-1.5 md:px-2 py-0.5 text-[9px] sm:text-[9px] md:text-[10px] uppercase font-bold tracking-wider bg-pulp-amber/20 text-pulp-amber border border-pulp-amber/30 rounded shrink-0">
                  1960–1985
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-muted hidden lg:block">
                Suid-Afrikaanse Kyk-en-Lees Erfenis • softcoverbooks.co.za
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-stretch sm:items-center justify-between sm:justify-end gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm font-medium w-full sm:w-auto shrink-0">
            <Link
              href="/"
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-0.5 sm:space-x-1 px-1 sm:px-1.5 md:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-md text-paper-muted hover:text-paper hover:bg-panel bg-panel/50 sm:bg-transparent border border-panel-border sm:border-transparent transition-all text-center min-w-0"
            >
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pulp-amber shrink-0" />
              <span className="font-heading tracking-tight sm:tracking-tight md:tracking-normal lg:tracking-wide uppercase text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-tight whitespace-nowrap">Gallery</span>
            </Link>

            <Link
              href="/reeks"
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-0.5 sm:space-x-1 px-1 sm:px-1.5 md:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-md text-paper-muted hover:text-paper hover:bg-panel bg-panel/50 sm:bg-transparent border border-panel-border sm:border-transparent transition-all text-center min-w-0"
            >
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pulp-amber shrink-0" />
              <span className="font-heading tracking-tight sm:tracking-tight md:tracking-normal lg:tracking-wide uppercase text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-tight whitespace-nowrap">Reekse</span>
            </Link>

            <Link
              href="/geskiedenis"
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-0.5 sm:space-x-1 px-1 sm:px-1.5 md:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-md text-paper-muted hover:text-paper hover:bg-panel bg-panel/50 sm:bg-transparent border border-panel-border sm:border-transparent transition-all text-center min-w-0"
            >
              <History className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pulp-amber shrink-0" />
              <span className="font-heading tracking-tight sm:tracking-tight md:tracking-normal lg:tracking-wide uppercase text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-tight whitespace-nowrap">Geskiedenis</span>
            </Link>

            <Link
              href="/oor-ons"
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-0.5 sm:space-x-1 px-1 sm:px-1.5 md:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-md text-paper-muted hover:text-paper hover:bg-panel bg-panel/50 sm:bg-transparent border border-panel-border sm:border-transparent transition-all text-center min-w-0"
            >
              <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pulp-amber shrink-0" />
              <span className="font-heading tracking-tight sm:tracking-tight md:tracking-normal lg:tracking-wide uppercase text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-tight whitespace-nowrap">Oor Ons</span>
            </Link>

            <Link
              href="/p-d-haasbroek"
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-0.5 sm:space-x-1 px-1 sm:px-1.5 md:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-md text-paper-muted hover:text-paper hover:bg-panel bg-panel/50 sm:bg-transparent border border-panel-border sm:border-transparent transition-all text-center min-w-0"
            >
              <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pulp-amber shrink-0" />
              <span className="font-heading tracking-tight sm:tracking-tight md:tracking-normal lg:tracking-wide uppercase text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-tight whitespace-nowrap">P.D. Haasbroek</span>
            </Link>

            {/* External link to main softcoverbooks.co.za */}
            <a
              href="https://www.softcoverbooks.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-1 text-xs text-slate-muted hover:text-pulp-amber px-2.5 py-1.5 rounded border border-panel-border hover:border-pulp-amber/50 transition-colors ml-2"
              title="Gaan na die hoof Sagtebandboeke webwerf"
            >
              <span>Sagtebandboeke</span>
              <Sparkles className="w-3 h-3 text-pulp-amber" />
            </a>
          </nav>

        </div>
      </div>
    </header>
  );
}
