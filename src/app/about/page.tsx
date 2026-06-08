"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, Leaf, Sparkles, Star, Users, Clock, Award, Heart } from "lucide-react";

/* ─────────────────────────────────────────────
   ABOUT PAGE — "Vertical Tape" Editorial
   Aesthetic: Raw editorial newspaper meets
   luxury skincare. Oversized type, pinned
   tape accents, rotated labels, split panels.
───────────────────────────────────────────── */

const STATS = [
  { val: "50K+", label: "Happy Clients", icon: Users },
  { val: "100%", label: "Organic", icon: Leaf },
  { val: "4.9★", label: "Rating", icon: Star },
  { val: "24/7", label: "Support", icon: Clock },
];

const VALUES = [
  { icon: Sparkles, title: "Natural Ingredients", desc: "100% certified organic botanicals sourced from regenerative farms worldwide." },
  { icon: Award,    title: "Expert Formulation", desc: "Balanced by dermatologists to deliver cellular-level transformation." },
  { icon: Heart,    title: "Cruelty Free",        desc: "Ethically produced, never tested on animals. Always." },
  { icon: Leaf,     title: "Bespoke Rituals",     desc: "Tailored luxury essentials crafted to elevate your daily life." },
];

export default function AboutPage() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const marqRef  = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Marquee position
  const marqX = useSpring(0, { stiffness: 40, damping: 25 });
  useEffect(() => {
    let raf: number;
    let pos = 0;
    const tick = () => {
      pos -= 0.4;
      marqX.set(pos);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [marqX]);

  return (
    <main
      className="w-full min-h-screen overflow-hidden"
      style={{ background: "#FFFCF9", fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .about-display  { font-family: 'Playfair Display', Georgia, serif; }
        .about-sans     { font-family: 'DM Sans', sans-serif; }

        .tape {
          position: absolute;
          background: rgba(116,39,9,0.12);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(116,39,9,0.18);
        }

        .ruled-line { border-top: 1px solid rgba(116,39,9,0.12); }

        /* Grain overlay */
        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .split-char { display: inline-block; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-10px) rotate(-2deg); }
        }
        .float-slow { animation: float-slow 6s ease-in-out infinite; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* ════════════════════════════════════════
          HERO — Full-bleed cinematic split
      ════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[700px] overflow-hidden grain">

        {/* Background image — right 60% */}
        <motion.div
          className="absolute right-0 top-0 w-[60%] h-full"
          style={{ y: heroImgY }}
        >
          <Image
            src="/images/about/aboutOne.jpg"
            alt="Alina Atelier"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Left fade */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #FFFCF9 0%, transparent 35%)" }} />
          {/* Bottom fade */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #FFFCF9 0%, transparent 30%)" }} />
        </motion.div>

        {/* Left content */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end pb-16 px-8 sm:px-16 lg:px-24 max-w-[55%]"
          style={{ y: heroTextY }}
        >
          {/* Issue tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="about-sans flex items-center gap-3 mb-8"
          >
            <span className="tape px-3 py-1 text-[9px] tracking-[0.35em] uppercase text-[#742709] font-medium">
              The Alina Atelier
            </span>
            <span className="ruled-line flex-1 max-w-[60px]" />
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#742709]/40 about-sans">Est. 2018</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="about-display font-black text-[#1C1B1B] leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Crafting
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="about-display font-black italic text-[#742709] leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Beauty
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="about-display font-light text-[#1C1B1B]/60 leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              With Nature
            </motion.h1>
          </div>

          {/* Rule + descriptor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-start gap-8"
          >
            <div className="w-[1px] h-16 bg-[#742709]/25 shrink-0 mt-1" />
            <p className="about-sans text-[13px] leading-[1.8] text-[#1C1B1B]/55 font-light max-w-sm">
              Where luxury meets purity. Dedicated to organic skincare rituals that nurture skin, elevate daily life, and protect our world.
            </p>
          </motion.div>
        </motion.div>

        {/* Vertical label — far right edge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-[#742709]/20" />
          <span className="vertical-text text-[9px] tracking-[0.4em] uppercase text-[#742709]/35 about-sans">
            Pure · Organic · Luxury
          </span>
          <div className="w-[1px] h-12 bg-[#742709]/20" />
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="w-[1px] h-10 bg-[#742709]/30"
            style={{ animation: "shimmer 2s ease-in-out infinite" }} />
          <span className="about-sans text-[8px] tracking-[0.4em] uppercase text-[#742709]/40">Scroll</span>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE — Ticker tape divider
      ════════════════════════════════════════ */}
      <div className="w-full overflow-hidden border-y border-[#742709]/10 py-4 bg-[#742709]/[0.02]">
        <motion.div
          ref={marqRef}
          style={{ x: marqX }}
          className="flex items-center gap-0 whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span className="about-display font-light italic text-[22px] text-[#742709]/60">Nature's Finest</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#742709]/30 inline-block" />
              <span className="about-sans text-[10px] tracking-[0.4em] uppercase text-[#742709]/40">Alina Atelier</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#742709]/30 inline-block" />
              <span className="about-display font-light italic text-[22px] text-[#742709]/60">Pure Luxury</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#742709]/30 inline-block" />
              <span className="about-sans text-[10px] tracking-[0.4em] uppercase text-[#742709]/40">Est. 2018</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#742709]/30 inline-block" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════
          STATS ROW — large typographic counters
      ════════════════════════════════════════ */}
      <section className="w-full py-20 px-8 sm:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {STATS.map((s, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true });
              return (
                <motion.div
                  key={s.label}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center px-6 py-10 border-r last:border-r-0 border-[#742709]/8 relative group"
                >
                  {/* Hover fill */}
                  <div className="absolute inset-0 bg-[#742709]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span
                    className="about-display font-black text-[#742709] leading-none mb-3"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                  >
                    {s.val}
                  </span>
                  <div className="w-6 h-[1px] bg-[#742709]/30 mb-3" />
                  <span className="about-sans text-[9px] tracking-[0.3em] uppercase text-[#1C1B1B]/40 font-medium">{s.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MANIFESTO — Full-width editorial text
      ════════════════════════════════════════ */}
      <section className="w-full py-10 px-8 sm:px-16 lg:px-24 border-t border-[#742709]/8">
        <ManifestoSection />
      </section>

      {/* ════════════════════════════════════════
          ASYMMETRIC IMAGE GRID — 3-panel layout
      ════════════════════════════════════════ */}
      <section className="w-full py-20 px-8 sm:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <ImageGrid />
        </div>
      </section>

      {/* ════════════════════════════════════════
          VALUES — alternating horizontal strips
      ════════════════════════════════════════ */}
      <section className="w-full border-t border-[#742709]/8">
        {VALUES.map((v, i) => (
          <ValuesRow key={v.title} item={v} index={i} />
        ))}
      </section>

      {/* ════════════════════════════════════════
          CTA — bold oversized footer block
      ════════════════════════════════════════ */}
      <CtaSection />
    </main>
  );
}

/* ─── Manifesto Section ─── */
function ManifestoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const words = "Every formulation that leaves our atelier is crafted with an uncompromising dedication to quality — marrying scientific innovation with ancient botanical wisdom.".split(" ");

  return (
    <div ref={ref} className="max-w-7xl mx-auto py-16 relative">
      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* Left: label column */}
        <div className="lg:w-48 shrink-0 flex flex-col gap-4 pt-2">
          <div className="tape w-fit px-3 py-1.5">
            <span className="about-sans text-[9px] tracking-[0.35em] uppercase text-[#742709] font-medium">
              Our Standard
            </span>
          </div>
          <div className="w-[1px] h-16 bg-[#742709]/20 ml-3" />
          <span className="about-sans text-[9px] tracking-[0.25em] uppercase text-[#1C1B1B]/30 ml-0.5">§ 01</span>
        </div>

        {/* Right: word-by-word animated text */}
        <div className="flex-1">
          <p
            className="about-display font-light text-[#1C1B1B] leading-[1.35]"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="split-char mr-[0.25em]"
                initial={{ opacity: 0.15, color: "#1C1B1B" }}
                animate={inView ? { opacity: 1 } : { opacity: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Image Grid ─── */
function ImageGrid() {
  const imgs = [
    { src: "/images/about/aboutTwo.jpg",   label: "Philosophy",   title: "Nature meets lab science",   tall: true  },
    { src: "/images/about/aboutThree.jpg", label: "Experience",   title: "The ultimate dressing ritual", tall: false },
    { src: "/images/about/aboutFour.jpg",  label: "Artistry",     title: "Palette of organic colours",  tall: false },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Tall left image */}
      <motion.div
        className="lg:col-span-4 relative overflow-hidden group cursor-pointer"
        style={{ borderRadius: 4, aspectRatio: "3/4" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={imgs[0].src} alt={imgs[0].title} fill className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 p-7 z-10">
          <span className="about-sans text-[9px] tracking-[0.3em] uppercase text-white/50 block mb-2">{imgs[0].label}</span>
          <p className="about-display text-white text-xl font-light italic leading-snug">{imgs[0].title}</p>
        </div>
        <div className="tape absolute top-5 left-5 px-2.5 py-1">
          <span className="about-sans text-[8px] tracking-[0.3em] uppercase text-[#742709] font-medium">01</span>
        </div>
      </motion.div>

      {/* Right 2 stacked */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        {[imgs[1], imgs[2]].map((img, i) => (
          <motion.div
            key={img.src}
            className="relative overflow-hidden group cursor-pointer flex-1"
            style={{ borderRadius: 4, aspectRatio: "16/7" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={img.src} alt={img.title} fill className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-0 p-7 flex items-end justify-between z-10 w-full">
              <div>
                <span className="about-sans text-[9px] tracking-[0.3em] uppercase text-white/50 block mb-1">{img.label}</span>
                <p className="about-display text-white text-xl font-light italic">{img.title}</p>
              </div>
              <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-white/60">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="tape absolute top-5 right-5 px-2.5 py-1">
              <span className="about-sans text-[8px] tracking-[0.3em] uppercase text-[#742709] font-medium">0{i + 2}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Values Row ─── */
function ValuesRow({ item, index }: { item: typeof VALUES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const even = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`w-full flex flex-col md:flex-row items-stretch border-b border-[#742709]/8 ${even ? "" : "md:flex-row-reverse bg-[#742709]/[0.015]"}`}
    >
      {/* Number + Icon block */}
      <div className="md:w-[120px] shrink-0 flex flex-col items-center justify-center py-10 border-r border-[#742709]/8 gap-4">
        <span className="about-display font-light text-[#742709]/20" style={{ fontSize: "2.5rem" }}>
          0{index + 1}
        </span>
        <div className="w-10 h-10 rounded-full bg-[#742709]/6 flex items-center justify-center">
          <item.icon className="w-4 h-4 text-[#742709]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-10 py-10 flex flex-col justify-center gap-3">
        <h4 className="about-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#742709]">{item.title}</h4>
        <p className="about-sans text-[14px] text-[#1C1B1B]/60 leading-[1.8] font-light max-w-lg">{item.desc}</p>
      </div>

      {/* Right: decorative ruled lines */}
      <div className="hidden md:flex md:w-[200px] items-center justify-center px-8 border-l border-[#742709]/8">
        <div className="w-full space-y-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-[1px] bg-[#742709]/15"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.06 }}
              style={{ originX: even ? 0 : 1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── CTA Section ─── */
function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="w-full relative overflow-hidden grain"
      style={{ background: "#742709", minHeight: "400px" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,252,249,0.5) 39px, rgba(255,252,249,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,252,249,0.5) 39px, rgba(255,252,249,0.5) 40px)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 lg:px-24 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="tape w-fit px-3 py-1 mt-[-60]"
            style={{ background: "rgba(255,252,249,0.1)", borderColor: "rgba(255,252,249,0.2)" }}
          >
            <span className="about-sans text-[9px] tracking-[0.35em] uppercase text-[#FFFCF9]/80 font-medium">
              Begin Your Ritual
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="about-display font-black text-[#fffaf4] leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
          >
            Explore Our<br/>
            <span className="italic font-light">Collection</span>
          </motion.h2>
        </div>

        {/* Right CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <button className="premium-btn" style={{ borderRadius: 2 }}>
  <span className="btn-text-first">
    Shop Now
    <ArrowRight className="w-4 h-4 btn-arrow" />
  </span>

  <span className="btn-text-last">
    Shop Now
    <ArrowRight className="w-4 h-4 btn-arrow" />
  </span>
</button>
          <span className="about-sans text-[9px] tracking-[0.25em] uppercase text-[#FFFCF9]/35">
            Free shipping on all orders
          </span>
        </motion.div>
      </div>

      {/* Large bg text */}
      <div
        className="absolute bottom-0 right-0 about-display font-black text-[#FFFCF9]/[0.03] leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 18vw, 18rem)" }}
      >
        Alina
      </div>
     <style jsx global>{`
  .premium-btn {
    position: relative;
    overflow: hidden;
    border: 1px solid #d2bba3;
    color: #d2bba3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.35em;
    padding: 22px 48px 21px;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    transition: all 400ms cubic-bezier(0.48, 0, 0.12, 1);
    text-transform: uppercase;
  }

  .premium-btn .btn-text-first {
    position: relative;
    transition: all 400ms cubic-bezier(0.48, 0, 0.12, 1);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .premium-btn .btn-text-last {
    color: #FFFCF9 !important; 
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 200%); /* নিচ থেকে উপরে স্লাইড হওয়ার জন্য পজিশনিং */
    transition: all 400ms cubic-bezier(0.48, 0, 0.12, 1);
    z-index: 100;
    opacity: 0;
    white-space: nowrap;
  }

  .premium-btn:after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1C1B1B;
    transform-origin: bottom center;
    transition: transform 400ms cubic-bezier(0.48, 0, 0.12, 1);
    transform: skewY(-6deg) scaleY(0);
    z-index: 50;
  }

  .premium-btn:hover {
    border-color: #d2bba3;
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(116, 39, 9, 0.2);
  }

  .premium-btn:hover .btn-text-first {
    transform: translateY(-150%);
    opacity: 0;
  }

  .premium-btn:hover:after {
    transform-origin: bottom center;
    transform: skewY(-6deg) scaleY(2.2);
  }

  .premium-btn:hover .btn-text-last {
    transform: translate(-50%, -50%);
    opacity: 1;
  }

  /* আইকন এরো অ্যানিমেশন ট্র্যাকিং */
  .premium-btn .btn-arrow {
    transition: transform 300ms ease;
  }
  
  .premium-btn:hover .btn-arrow {
    transform: translateX(4px);
  }

  .premium-btn:active {
    transform: translateY(0);
  }
`}</style>
    </section>
  );
}