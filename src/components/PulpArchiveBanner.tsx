export default function PulpArchiveBanner() {
  return (
    <div className="w-full my-4 sm:my-6">
      <div 
        className="rounded-2xl border border-red-400/30 px-5 sm:px-6 py-3.5 sm:py-4 shadow-xl shadow-red-950/30 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 transition-all duration-300 hover:border-red-400/50"
        style={{
          background: "linear-gradient(90deg, #580d16 0%, #7f1d1d 50%, #450a0a 100%)",
        }}
      >
        {/* Left / Center content */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3.5 text-center sm:text-left">
          <span className="bg-red-950/90 text-red-200 border border-red-400/30 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shrink-0 shadow-inner">
            ONTDEK MEER
          </span>
          <p className="text-white text-xs sm:text-sm md:text-[15px] font-medium leading-snug">
            📖 Lief vir ou fotoverhale én pulp-fiksie? Verken die amptelike <strong className="font-bold text-white">South African Pulp Books Archive</strong>
          </p>
        </div>

        {/* Right CTA Button */}
        <a
          href="https://www.pulpbooksarchive.co.za/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-2 bg-white text-red-950 hover:bg-orange-500 hover:text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer font-heading uppercase"
        >
          <span>Besoek Argief</span>
          <span className="text-base leading-none font-sans">➔</span>
        </a>
      </div>
    </div>
  );
}
