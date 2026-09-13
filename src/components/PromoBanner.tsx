import { Gift, ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <div className="w-full my-2 sm:my-1">
      <div 
        className="rounded-2xl border border-red-400/30 px-5 sm:px-6 py-3.5 sm:py-4 shadow-xl shadow-red-950/30 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 transition-all duration-300 hover:border-red-400/50"
        style={{
          background: "linear-gradient(90deg, #580d16 0%, #7f1d1d 50%, #450a0a 100%)",
        }}
      >
        {/* Left / Center content */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3.5 text-center sm:text-left">
          <span className="bg-red-950/90 text-red-200 border border-red-400/30 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shrink-0 shadow-inner">
            GRATIS E-BOEK
          </span>
          <p className="text-white text-xs sm:text-sm md:text-[15px] font-medium leading-snug">
            🎁 Gratis Aflaai: <strong className="font-bold text-white">“Witch of the Sahara”</strong> – Volledige Vintage Pulp PDF-Roman
          </p>
        </div>

        {/* Right CTA Button */}
        <a
          href="https://magicebooks.sendibble.com/Optin-Squeeze-Page-be2f4065-41c8629a"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-2 bg-white text-red-950 hover:bg-orange-500 hover:text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer font-heading uppercase"
        >
          <span>Laai Gratis Af</span>
          <span className="text-base leading-none">→</span>
        </a>
      </div>
    </div>
  );
}
