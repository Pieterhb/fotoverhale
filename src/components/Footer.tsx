import Link from "next/link";
import { Heart, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-panel-border bg-charcoal/80 text-slate-muted mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded bg-pulp-crimson/90 border border-pulp-amber/30 flex items-center justify-center font-heading text-lg text-paper font-bold">
                FV
              </div>
              <span className="font-heading text-xl text-paper tracking-wider uppercase">
                Suid-Afrikaanse Fotoverhaal Argief
              </span>
            </div>
            <p className="text-sm text-slate-muted/90 max-w-md leading-relaxed">
              ’n Digitale bewaarplek en historiese rekord van die gewilde Suid-Afrikaanse fotoverhaal-era (1960–1985). Gestig om die unieke kyk-en-lees kultuurskatte vir navorsers, versamelaars en aanhangers te bewaar.
            </p>
            <p className="text-xs text-slate-muted flex items-center gap-1.5 pt-2">
              <span>’n Projek van</span>
              <a 
                href="https://www.softcoverbooks.co.za" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pulp-amber hover:underline inline-flex items-center"
              >
                softcoverbooks.co.za <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </p>
          </div>

          {/* Navigasie */}
          <div>
            <h3 className="font-heading text-paper tracking-wide uppercase text-sm mb-3">
              Argief Navigasie
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-pulp-amber transition-colors">
                  Fotoverhale Galery
                </Link>
              </li>
              <li>
                <Link href="/geskiedenis" className="hover:text-pulp-amber transition-colors">
                  Geskiedenis (Koos Papenfus)
                </Link>
              </li>
              <li>
                <Link href="/oor-ons" className="hover:text-pulp-amber transition-colors">
                  Oor die Argief & Erkenning
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.softcoverbooks.co.za/versamelaars.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pulp-amber transition-colors inline-flex items-center gap-1"
                >
                  Versamelaars Netwerk <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Erkenning & Kontak */}
          <div>
            <h3 className="font-heading text-paper tracking-wide uppercase text-sm mb-3">
              Erkenning & Kontak
            </h3>
            <p className="text-xs text-slate-muted leading-relaxed mb-3">
              Met opregte dank aan <strong>Pieter Haasbroek</strong>, <strong>Koos Papenfus</strong>, <strong>Sven Barsby</strong> en <strong>Carol Hardijzer</strong> vir hul onskatbare navorsing en bewaringswerk.
            </p>
            <a
              href="mailto:haasbroek.pieter@gmail.com"
              className="inline-flex items-center space-x-2 text-xs text-paper bg-panel hover:bg-panel-border border border-panel-border px-3 py-2 rounded transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-pulp-amber" />
              <span>Kontak die Argief</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-panel-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-muted">
          <p>
            Kopiereg &copy; {new Date().getFullYear()} Suid-Afrikaanse Fotoverhaal Argief (fotoverhale.softcoverbooks.co.za). Alle regte voorbehou.
          </p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Geskiedenis bewaar met trots in Suid-Afrika
          </p>
        </div>
      </div>
    </footer>
  );
}
