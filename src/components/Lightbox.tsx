"use client";
import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Issue } from "@/types";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
  issues: Issue[];
  seriesTitle: string;
}

export default function Lightbox({
  isOpen,
  onClose,
  currentIndex,
  onIndexChange,
  issues,
  seriesTitle,
}: LightboxProps) {
  const currentIssue = issues[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else {
      onIndexChange(issues.length - 1);
    }
  }, [currentIndex, issues.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (currentIndex < issues.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      onIndexChange(0);
    }
  }, [currentIndex, issues.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentIssue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Top Bar with Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="text-left">
          <span className="text-xs uppercase font-mono tracking-widest text-pulp-amber">
            {seriesTitle}
          </span>
          <h4 className="font-heading text-lg sm:text-xl text-paper uppercase tracking-wide">
            Uitgawe #{currentIssue.number}: {currentIssue.title}
          </h4>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-block text-xs font-mono text-slate-muted bg-panel px-3 py-1 rounded border border-panel-border">
            {currentIndex + 1} van {issues.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-panel hover:bg-panel-border text-paper transition-colors border border-panel-border"
            title="Sluit Ligkas (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      {issues.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-panel/80 hover:bg-panel text-paper transition-all border border-panel-border hover:border-pulp-amber z-20 shadow-lg"
            title="Vorige Voorblad (Pyltjie Links)"
          >
            <ChevronLeft className="w-7 h-7 text-pulp-amber" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-panel/80 hover:bg-panel text-paper transition-all border border-panel-border hover:border-pulp-amber z-20 shadow-lg"
            title="Volgende Voorblad (Pyltjie Regs)"
          >
            <ChevronRight className="w-7 h-7 text-pulp-amber" />
          </button>
        </>
      )}

      {/* Image Display */}
      <div 
        className="max-w-4xl max-h-[82vh] flex flex-col items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {currentIssue.image ? (
          <img
            src={currentIssue.image}
            alt={currentIssue.alt || `Volskerm voorblad van ${seriesTitle} Uitgawe #${currentIssue.number}: ${currentIssue.title}`}
            className="max-w-full max-h-[78vh] object-contain rounded shadow-2xl border border-panel-border"
          />
        ) : (
          <div className="w-80 h-[480px] bg-panel rounded border border-panel-border flex flex-col items-center justify-center p-6 text-center">
            <p className="font-heading text-xl text-paper uppercase mb-2">
              Voorblad nie tans beskikbaar
            </p>
            <p className="text-xs text-slate-muted">
              Weens die skaarsheid van sekere uitgawes word hierdie voorblad nog gesoek deur ons versamelaars.
            </p>
          </div>
        )}

        {/* Bottom caption on mobile */}
        <div className="sm:hidden mt-3 text-center text-xs text-slate-muted font-mono">
          {currentIndex + 1} / {issues.length}
        </div>
      </div>

    </div>
  );
}
