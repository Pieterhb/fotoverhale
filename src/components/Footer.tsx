import Link from "next/link";
import { Heart, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-panel-border bg-charcoal/80 text-slate-muted mt-6 sm:mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
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
            <div className="text-xs text-slate-muted space-y-1.5 pt-2">
              <p className="flex flex-wrap items-center gap-1.5">
                <span>’n Projek van</span>
                <a 
                  href="https://www.softcoverbooks.co.za" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pulp-amber hover:underline inline-flex items-center"
                >
                  softcoverbooks.co.za <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href="https://www.pulpbooksarchive.co.za/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-pulp-amber hover:underline inline-flex items-center"
                >
                  Pulp Books Archive <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </a>
              </p>
              <p className="text-slate-300">
                Geskep en gekureer deur{" "}
                <a
                  href="https://pulpbooksarchive.co.za/p-d-haasbroek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pulp-amber hover:underline font-semibold inline-flex items-center"
                >
                  <span className="whitespace-nowrap">P.D. Haasbroek</span>&nbsp;(Pieter Daniel Haasbroek) <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </a>
              </p>
            </div>
          </div>

          {/* Navigasie */}
          <div>
            <h3 className="font-heading text-paper tracking-wide uppercase text-sm mb-3">
              Argief Navigasie
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-pulp-amber transition-colors">
                  Fotoverhale Gallery
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
                <Link href="/p-d-haasbroek" className="text-pulp-amber/90 hover:text-pulp-amber font-medium transition-colors">
                  Profiel: P.D. Haasbroek
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.pulpbooksarchive.co.za/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pulp-amber transition-colors inline-flex items-center gap-1 text-xs text-slate-400"
                >
                  Pulp Books Archive <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.softcoverbooks.co.za/versamelaars.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pulp-amber transition-colors inline-flex items-center gap-1 text-xs text-slate-400"
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

        {/* Social Icons Strip (Volg Ons) */}
        <div className="border-t border-panel-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-muted">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
              Volg Ons:
            </span>
            
            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@BookswithHooks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-panel border border-panel-border hover:border-[#B91C1C] hover:bg-[#B91C1C] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="YouTube (@BookswithHooks)"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/profile.php?id=61579044552820" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-panel border border-panel-border hover:border-[#1877F2] hover:bg-[#1877F2] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Facebook"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/ebookswithhooks/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-panel border border-panel-border hover:border-[#E4405F] hover:bg-[#E4405F] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Instagram (@ebookswithhooks)"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@ebookswithhooks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-panel border border-panel-border hover:border-[#EAB308] hover:bg-panel-border text-slate-400 hover:text-[#EAB308] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="TikTok (@ebookswithhooks)"
              aria-label="TikTok"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 1.9-.38 3.86-1.47 5.37-1.32 1.84-3.53 2.92-5.78 2.97-2.14.05-4.33-.78-5.83-2.31-1.75-1.77-2.48-4.37-2.02-6.81.42-2.24 1.94-4.21 4.02-5.07 1.25-.53 2.66-.67 4-.41v4.14c-.75-.24-1.59-.25-2.34-.03-.84.23-1.57.84-1.92 1.62-.48 1.05-.29 2.37.49 3.23.82.91 2.12 1.28 3.3.97 1.03-.27 1.79-1.19 1.89-2.26.04-1.42.02-2.84.02-4.26V.02z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a 
              href="https://x.com/PieterHaasbroe2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-panel border border-panel-border hover:border-slate-400 hover:bg-black text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="X (@PieterHaasbroe2)"
              aria-label="X"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Threads */}
            <a 
              href="https://www.threads.com/@ebookswithhooks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-panel border border-panel-border hover:border-[#EAB308] hover:bg-panel-border text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Threads (@ebookswithhooks)"
              aria-label="Threads"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.095 5.467-.372 12.186-.372c6.643 0 12.028 5.29 12.176 11.905H21.98C21.837 6.64 17.502 2.012 12.186 2.012 6.786 2.012 2.384 6.414 2.384 11.814c0 5.4 4.402 9.802 9.802 9.802 4.482 0 8.358-3.084 9.47-7.468H12.186v-2.384h11.758c.09.64.138 1.294.138 1.966 0 6.666-5.26 12.084-11.896 12.084v.186z"/>
              </svg>
            </a>

            {/* Pinterest */}
            <a 
              href="https://za.pinterest.com/BlackLeopardPulp/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-panel border border-panel-border hover:border-[#BD081C] hover:bg-[#BD081C] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Pinterest (BlackLeopardPulp)"
              aria-label="Pinterest"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.379-.057.241-.19.291-.439.176-1.644-.766-2.67-3.17-2.67-5.103 0-4.156 3.019-7.973 8.709-7.973 4.572 0 8.125 3.258 8.125 7.612 0 4.542-2.864 8.2-6.839 8.2-1.336 0-2.592-.695-3.022-1.514l-.823 3.138c-.298 1.144-1.103 2.578-1.642 3.449C9.284 23.834 10.609 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          <div className="text-xs text-slate-muted text-center sm:text-right">
            <span>Ontwerp vir navorsing, erfenisbewaring en nostalgie.</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-panel-border/60 mt-5 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-muted">
          <p>
            Kopiereg &copy; 2026 P.D. Haasbroek (Pieter Daniel Haasbroek) - Suid-Afrikaanse Fotoverhale Argief (fotoverhale.softcoverbooks.co.za). Alle regte voorbehou.
          </p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Geskiedenis bewaar met trots in Suid-Afrika
          </p>
        </div>
      </div>
    </footer>
  );
}
