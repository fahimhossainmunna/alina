"use client";

import { useCollections } from "@/hooks/useCollections";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const FALLBACK_IMAGE = "/images/collection/fallback.jpg";
const AUTO_SLIDE_INTERVAL = 6000;

export const CollectionMarquee = () => {
  const { collections, loading, error } = useCollections();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setImageLoaded(false);
      setImageError(false);
      setCurrentIndex(
        (idx + (collections?.length ?? 1)) % (collections?.length ?? 1),
      );
    },
    [collections?.length],
  );

  const handleNext = useCallback(() => {
    goTo(currentIndex + 1, 1);
  }, [currentIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(currentIndex - 1, -1);
  }, [currentIndex, goTo]);

  // auto-slide
  useEffect(() => {
    if (loading || !collections?.length || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(handleNext, AUTO_SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handleNext, loading, collections?.length, isHovered]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  /* ── Error state ── */
  if (error) {
    return (
      <div className="w-full py-24 flex flex-col items-center gap-4">
        <p className="text-[13px] text-[#C43B3B] font-medium tracking-wide">
          Unable to load collections
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#742709] border border-[#742709]/25 px-6 py-2.5 hover:bg-[#742709] hover:text-[#FFFCF9] transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  /* ── Skeleton ── */
  if (loading || !collections?.length) {
    return (
      <div className="relative w-full h-[75vh] sm:h-[88vh] bg-gradient-to-br from-[#FAF7F2] to-[#FFFCF9] overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 mx-auto rounded-full border-2 border-[#742709]/15 border-t-[#742709]/50"
          />
          <div className="space-y-3">
            <div className="w-48 h-2.5 mx-auto bg-[#742709]/8 rounded-full animate-pulse" />
            <div className="w-72 h-5 mx-auto bg-[#742709]/8 rounded-full animate-pulse" />
            <div className="w-36 h-2.5 mx-auto bg-[#742709]/8 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const slide = collections[currentIndex];
  const imageUrl = imageError ? FALLBACK_IMAGE : slide.src;
  const total = collections.length;

  const slideVariants: Variants = {
    enter: (d: number) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.04,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({
      x: d < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.97,
    }),
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: { opacity: 0, y: -14, transition: { duration: 0.3 } },
  };

  return (
    <section
      className="relative w-full h-[75vh] sm:h-[88vh] bg-[#FFFCF9] overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 220, damping: 28 },
              opacity: { duration: 0.45 },
              scale: { duration: 0.65 },
            }}
            className="absolute inset-0"
          >
            {/* Image - Clear & Visible */}
            <Image
              src={imageUrl}
              alt={slide.title}
              fill
              priority={currentIndex === 0}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              className={`object-cover object-center transition-all duration-700 ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />

            {!imageLoaded && (
              <div className="absolute inset-0 bg-[#F5EFE9] animate-pulse" />
            )}

            {/* ✅ FIXED: Lighter gradients for clear image visibility */}

            {/* Left content gradient - Reduced opacity for clarity */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#FFFCF9]/70 via-[#FFFCF9]/30 to-transparent
              sm:from-[#FFFCF9]/75 sm:via-[#FFFCF9]/35 sm:to-transparent"
            />

            {/* Bottom gradient - Much lighter */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFCF9]/10 via-transparent to-transparent" />

            {/* Subtle vignette - Very light */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,transparent_60%,rgba(28,27,27,0.03)_100%)]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Content ── */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex items-center z-20">
        <div className="w-full max-w-[540px] md:max-w-[600px] flex flex-col items-start">
          {/* Collection badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFCF9]/90 border border-[#742709]/10 rounded-full mb-5 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 text-[#742709]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#742709]">
              New Collection
            </span>
          </motion.div>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${currentIndex}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-[11px] sm:text-[12px] font-semibold tracking-[0.32em] text-[#742709] uppercase mb-3 drop-shadow-sm"
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${currentIndex}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="font-serif text-[38px] sm:text-[52px] md:text-[64px] lg:text-[76px]
                font-light text-[#1C1B1B] leading-[1.04] tracking-tight mb-6 drop-shadow-sm"
            >
              {slide.title.split(" ")[0]}{" "}
              <span className="font-normal italic text-[#742709]">
                {slide.title.split(" ").slice(1).join(" ")}
              </span>
            </motion.h2>
          </AnimatePresence>

          {/* Description — reveals on hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mb-7"
          >
            <p className="text-[13px] sm:text-[14px] text-[#1C1B1B]/80 leading-[1.85] max-w-[480px] tracking-wide">
              {slide.description ??
                "Discover our latest premium collection, crafted with the finest ingredients for an unparalleled sensory experience."}
            </p>
          </motion.div>

          {/* CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`btn-${currentIndex}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 bg-[#742709] hover:bg-[#5A1E07] text-[#FFFCF9]
                  text-[11px] font-bold uppercase tracking-[0.28em] px-9 py-4 rounded-tl-2xl rounded-br-2xl
                  shadow-[0_8px_28px_rgba(116,39,9,0.22)] hover:shadow-[0_16px_40px_rgba(116,39,9,0.32)]
                  transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {slide.btnText}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Hover hint */}
          <motion.p
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="mt-5 text-[9px] text-[#1C1B1B]/50 uppercase tracking-[0.3em] hidden md:block"
          >
            Hover to discover more
          </motion.p>
        </div>
      </div>

      {/* ── Slide counter top-right ── */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 flex items-baseline gap-1.5">
        <span className="text-[22px] font-bold text-[#742709] font-serif leading-none drop-shadow-sm">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col gap-0.5 mb-0.5">
          <div className="w-5 h-px bg-[#742709]/40" />
          <span className="text-[10px] text-[#1C1B1B]/50 tracking-wider">
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Prev / Next buttons ── */}
      <motion.button
        onClick={handlePrev}
        whileHover={{ scale: 1.08, x: -2 }}
        whileTap={{ scale: 0.94 }}
        className="absolute left-4 sm:left-7 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full
          bg-transparent opacity-10 hover:opacity-100 text-[#1C1B1B]/60 hover:text-[#5A1E07]
          border border-[#1C1B1B]/60 hover:border-[#5A1E07]
          hover:bg-[#FFFCF9]/8
          flex items-center justify-center transition-all duration-300 z-30"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      <motion.button
        onClick={handleNext}
        whileHover={{ scale: 1.08, x: 2 }}
        whileTap={{ scale: 0.94 }}
        className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full
          bg-transparent text-[#1C1B1B]/60 hover:text-[#5A1E07]
          border border-[#1C1B1B]/60 hover:border-[#5A1E07]
          hover:bg-[#FFFCF9]/8
          flex items-center justify-center transition-all duration-300 z-30 opacity-10 hover:opacity-100"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* ── Progress dots ── */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {collections.map((_, i) => {
          const active = i === currentIndex;
          return (
            <motion.button
              key={i}
              onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ${
                active
                  ? "w-10 sm:w-12 bg-[#742709]/20"
                  : "w-1.5 bg-[#1C1B1B]/15 hover:bg-[#1C1B1B]/28"
              }`}
              aria-label={`Slide ${i + 1}`}
            >
              {active && (
                <motion.div
                  key={`prog-${currentIndex}`}
                  className="absolute inset-y-0 left-0 bg-[#742709]"
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "0%" : "100%" }}
                  transition={{
                    duration: AUTO_SLIDE_INTERVAL / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Mobile swipe hint ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[9px]
        text-[#1C1B1B]/40 uppercase tracking-wider md:hidden pointer-events-none"
      >
        <ChevronLeft className="w-3 h-3" />
        <span>Swipe</span>
        <ChevronRight className="w-3 h-3" />
      </div>

      {/* ── Vertical collection label (desktop) ── */}
      <div className="absolute right-6 sm:right-8 bottom-16 sm:bottom-20 z-20 hidden lg:flex flex-col items-center gap-2">
        <div className="h-12 w-px bg-[#742709]/20" />
        <p className="text-[9px] font-semibold tracking-[0.35em] uppercase text-[#1C1B1B]/40 rotate-90 origin-center whitespace-nowrap mt-3">
          Collection {String(currentIndex + 1).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
};

export default CollectionMarquee;
