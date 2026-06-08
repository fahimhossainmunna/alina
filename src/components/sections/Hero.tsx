"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // ✅ Link Component ইম্পোর্ট করা আছে
import React, { useCallback, useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    image: "/images/bannerOne.png",
    label: "Best Seller",
    price: "$4.97",
    tag: "Rose & Saffron",
    accent: "#742709",
    headline: "Nature",
    sub: "Premium organic luxury for your skin ritual.",
  },
  {
    image: "/images/heroProducttwo.png",
    label: "New Arrival",
    price: "$5.49",
    tag: "Vanilla Pearl",
    accent: "#5A1E07",
    headline: "Radiance",
    sub: "Unveil your natural glow with pure botanical care.",
  },
];

// ── Animated Counter ─
const AnimatedCounter: React.FC<{
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}> = ({ end, suffix = "", decimals = 0, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime: number;
          const animate = (t: number) => {
            if (!startTime) startTime = t;
            const progress = Math.min((t - startTime) / (duration * 1000), 1);
            setCount((1 - Math.pow(2, -10 * progress)) * end);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 18 });

  const changeProduct = useCallback(
    (progress: number) => {
      const idx = Math.min(
        Math.floor(progress * PRODUCTS.length),
        PRODUCTS.length - 1,
      );
      if (idx !== activeIndex) {
        setDirection(idx > activeIndex ? 1 : -1);
        setActiveIndex(idx);
      }
    },
    [activeIndex],
  );

  useEffect(() => {
    const unsub = smooth.on("change", changeProduct);
    return () => unsub();
  }, [smooth, changeProduct]);

  const product = PRODUCTS[activeIndex] ?? PRODUCTS[0];

  const imgVariants = {
    enter: (d: number) => ({
      opacity: 0,
      y: d * 60,
      scale: 0.9,
      filter: "blur(10px)",
    }),
    center: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: (d: number) => ({
      opacity: 0,
      y: d * -60,
      scale: 0.9,
      filter: "blur(10px)",
    }),
  };

  return (
    <div
      className="mt-25 sm:mt-32 lg:mt-20 relative"
      style={{ height: `calc(${PRODUCTS.length * 100}vh)` }}
      ref={scrollRef}
    >
      {/* ══ STICKY PANEL ─═ */}
      <div className="sticky top-0 h-screen overflow-y-auto overflow-x-hidden bg-[#FFFCF9] flex">
        {/* Progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#742709]/30 via-[#742709] to-[#742709]/30 origin-left z-30"
          style={{ scaleX: smooth }}
        />

        {/* ── Background blobs ── */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-[-10%] left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] bg-[#742709]/[0.033] rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#742709]/[0.04] rounded-full blur-2xl sm:blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #742709 1px, transparent 0)`,
              backgroundSize: "38px 38px",
            }}
          />
        </div>

        {/* ── Dot nav ── */}
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
          {PRODUCTS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-1.5 h-6 sm:h-7 bg-[#742709]"
                  : "w-1.5 h-1.5 bg-[#742709]/20"
              }`}
            />
          ))}
        </div>

        {/* ════════════════════════════════════════
            INNER LAYOUT
        ════════════════════════════════════════ */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 flex items-center relative z-10 py-12 sm:py-0">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* ════════  LEFT — Content ════════ */}
            <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
              {/* Tag pill */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-2 self-center lg:self-start mb-4 sm:mb-5 px-3 sm:px-4 py-1.5 bg-[#742709]/6 border border-[#742709]/12 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#742709] animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.32em] text-[#742709]">
                    {product.tag}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Eyebrow */}
              <p className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-[0.3em] sm:tracking-[0.38em] text-[#1C1B1B]/45 uppercase mb-3 sm:mb-4">
                Embrace the Pure Power of
              </p>

              {/* Giant heading */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`h-${activeIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  className="font-serif text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] xl:text-[116px]
                    font-light text-[#742709] leading-[0.88] tracking-tighter select-none mb-4 sm:mb-6"
                >
                  <span className="inline-block relative">
                    {product.headline[0]}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#742709]/20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.35 }}
                    />
                  </span>
                  <span
                    className="font-sans font-extralight lowercase tracking-tight -ml-1 sm:-ml-2
                    text-[36px] sm:text-[52px] md:text-[68px] lg:text-[84px] xl:text-[98px]"
                  >
                    {product.headline.slice(1)}
                  </span>
                </motion.h1>
              </AnimatePresence>

              {/* Sub */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${activeIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                  className="text-[12px] sm:text-[13px] md:text-[14px] text-[#1C1B1B]/52 leading-[1.8] sm:leading-[1.9] tracking-wide
                    max-w-[280px] sm:max-w-[360px] md:max-w-[440px] mx-auto lg:mx-0 mb-6 sm:mb-9"
                >
                  {product.sub}
                </motion.p>
              </AnimatePresence>

              {/* ── CTA BUTTONS SET WITH NEXT.JS ROUTING ── */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8 sm:mb-11">
                <Link href="/productShop" className="block">
                  <motion.div
                    whileHover={{ scale: 1.025, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group bg-[#742709] hover:bg-[#5A1E07] text-[#FFFCF9] 
      text-[11px] font-bold uppercase tracking-[0.28em] 
      px-10 py-4 rounded-tl-[15px] rounded-br-[15px] 
      shadow-[0_10px_32px_rgba(116,39,9,0.22)] hover:shadow-[0_20px_44px_rgba(116,39,9,0.32)] 
      transition-all duration-300 flex items-center justify-center gap-2.5 relative overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Shop Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>

                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                  </motion.div>
                </Link>
                {/* ✅ FIXED: Discover Button wrapped with Next.js Link pointing to /discover or /store */}
                <Link href="/about" className="block">
                  <motion.div
                    whileHover={{ scale: 1.025, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group text-[#742709] hover:text-[#FFFCF9] 
      text-[11px] font-bold uppercase tracking-[0.28em] 
      px-10 py-4 rounded-[5px] border border-[#742709]/20 hover:border-[#742709] 
      bg-[#742709] shadow-[0_4px_16px_rgba(116,39,9,0.08)] hover:shadow-[0_12px_36px_rgba(116,39,9,0.24)] 
      transition-all duration-300 relative overflow-hidden backdrop-blur-sm flex items-center justify-center cursor-pointer"
                  >
                    {/* টেক্সট লেয়ার */}
                    <span className="relative z-10 transition-colors duration-300">
                      Discover
                    </span>

                    {/* হোভার করলে যে সুন্দর ব্যাকগ্রাউন্ড কালার স্লাইড/স্কেল আউট হবে তার লেয়ার */}
                    <div className="absolute inset-0 bg-[#FFFCF9]/90 z-0 pointer-events-none origin-center transition-transform duration-300 ease-out group-hover:scale-x-0" />
                  </motion.div>
                </Link>
              </div>

              {/* Stats */}
              <div className="pt-6 sm:pt-7 border-t border-[#742709]/8 flex items-center justify-center lg:justify-start gap-5 sm:gap-7 md:gap-11">
                {[
                  { end: 50, suffix: "K+", label: "Happy Clients", dec: 0 },
                  { end: 100, suffix: "%", label: "Organic", dec: 0 },
                  { end: 4.9, suffix: "★", label: "Rating", dec: 1 },
                ].map((s, i) => (
                  <React.Fragment key={s.label}>
                    {i > 0 && (
                      <div className="w-px h-8 sm:h-10 bg-[#742709]/10 shrink-0" />
                    )}
                    <div className="text-center">
                      <p className="text-[20px] sm:text-[26px] md:text-[30px] font-bold text-[#742709] leading-none">
                        <AnimatedCounter
                          end={s.end}
                          suffix={s.suffix}
                          decimals={s.dec}
                          duration={2 + i * 0.3}
                        />
                      </p>
                      <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#1C1B1B]/38 mt-1.5">
                        {s.label}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ═══════  RIGHT — Image ════════ */}
            <div className="flex items-center justify-center order-1 lg:order-2 relative min-h-[300px] sm:min-h-[400px]">
              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px]
                  border border-[#742709]/6 rounded-full pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="absolute w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[340px] lg:h-[340px] xl:w-[410px] xl:h-[410px]
                  border border-dashed border-[#742709]/4 rounded-full pointer-events-none"
              />

              {/* Colour glow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`glow-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] rounded-full blur-2xl sm:blur-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${product.accent}22 0%, transparent 68%)`,
                  }}
                />
              </AnimatePresence>

              {/* Product image */}
              <div className="relative w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] xl:w-[440px] xl:h-[440px] select-none">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`img-${activeIndex}`}
                    custom={direction}
                    variants={imgVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.tag}
                      fill
                      priority
                      className="object-contain drop-shadow-[0_20px_40px_rgba(116,39,9,0.16)] sm:drop-shadow-[0_28px_52px_rgba(116,39,9,0.16)]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badge */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`badge-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.75, x: 16 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.75, x: 16 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="absolute -right-2 sm:-right-3 top-[15%] sm:top-[20%] bg-white/92 backdrop-blur-md
                      px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-lg border border-[#742709]/10 z-20"
                  >
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#742709]">
                      {product.label}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Price */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`price-${activeIndex}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.4, delay: 0.18 }}
                    className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-[#742709] text-[#FFFCF9]
                      px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-xl z-20 whitespace-nowrap"
                  >
                    <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em]">
                      {product.price}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 01 / 02 counter */}
              <div className="absolute -bottom-8 sm:-bottom-10 right-0 sm:right-2 md:right-4 flex items-baseline gap-1.5 sm:gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`n-${activeIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#742709] font-serif leading-none"
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <div className="flex flex-col items-center gap-0.5 mb-0.5">
                  <div className="w-4 sm:w-6 h-px bg-[#742709]/30" />
                  <span className="text-[9px] sm:text-[11px] text-[#1C1B1B]/35 tracking-wider leading-none">
                    {String(PRODUCTS.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <AnimatePresence>
          {activeIndex === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
            >
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.38em] text-[#1C1B1B]/32">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#742709]/40 to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
