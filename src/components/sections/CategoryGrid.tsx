"use client";

import { useCategories } from "@/hooks/useCategories";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Eye, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export const CategoryGrid = () => {
  const { categories, loading, error } = useCategories();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (error) {
    return (
      <div className="w-full py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C43B3B]/10 border border-[#C43B3B]/20 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#C43B3B]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C43B3B]">
              Connection Issue
            </span>
          </motion.div>
          <p className="text-[14px] text-[#1C1B1B]/70 mb-6">
            Unable to load categories. Please check your connection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#742709] border border-[#742709]/25 px-6 py-3 hover:bg-[#742709] hover:text-[#FFFCF9] transition-all duration-300 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#FFFCF9] via-[#FAF7F2] to-[#FFFCF9] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* ══════════════════════════════════════════
          PREMIUM BACKGROUND EFFECTS
      ══════════════════════════════════════════ */}

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-[#742709]/[0.02] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-80 h-80 sm:w-[400px] sm:h-[400px] bg-[#C9A961]/[0.02] rounded-full blur-3xl pointer-events-none"
      />

      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #742709 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ══════════════════════════════════════════
            ULTRA-PREMIUM SECTION HEADER
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24"
        >
          <div className="max-w-2xl">
            {/* Premium Badge with Glow */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#742709]/5 border border-[#742709]/10 rounded-full mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#742709]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#742709]">
                Curated Collections
              </span>
            </motion.div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#1C1B1B] tracking-tight leading-[1.1]">
              Browse our{" "}
              <span className="font-normal text-[#742709] relative inline-block">
                Categories
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#742709]/20 origin-left"
                />
              </span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-sans text-[14px] sm:text-[15px] text-[#1C1B1B]/60 max-w-md leading-relaxed lg:text-right"
          >
            Find the perfect solution for your skin type with our expert-curated
            premium beauty selections.
          </motion.p>
        </motion.div>

        {/* ══════════════════════════════════════════
            LUXURY CATEGORY GRID
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* ⏳ PREMIUM SKELETON LOADING */}
          {loading
            ? [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative h-[380px] sm:h-[440px] rounded-3xl bg-[#FAF7F2] overflow-hidden border border-[#742709]/5"
                >
                  {/* Image skeleton with shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#742709]/5 to-[#C9A961]/5">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </div>

                  {/* Content skeleton */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="space-y-3">
                      <div className="w-16 h-2 bg-[#742709]/10 rounded-full animate-pulse" />
                      <div className="w-34 h-6 bg-[#742709]/10 rounded-full animate-pulse" />
                      <div className="w-32 h-10 bg-[#742709]/10 rounded-full animate-pulse mt-4" />
                    </div>
                  </div>
                </motion.div>
              ))
            : /* ✅ REAL DATA CARDS */
              categories.map((cat, index) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  index={index}
                  isInView={isInView}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════
// INDIVIDUAL CATEGORY CARD COMPONENT
// ══════════════════════════════════════════
const CategoryCard = ({
  category,
  index,
  isInView,
}: {
  category: any;
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden group cursor-pointer
        shadow-[0_4px_20px_rgba(116,39,9,0.04)] hover:shadow-[0_30px_60px_rgba(116,39,9,0.15)]
        border border-[#742709]/5 hover:border-[#742709]/15
        transition-all duration-500"
    >
      {/* Dynamic glow following mouse */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, rgba(116,39,9,0.1), transparent 40%)`,
          ),
        }}
      />

      {/* 📸 Category Image with Advanced Effects */}
      <div className="absolute inset-0">
        <Image
          src={category.src}
          alt={category.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={index < 3}
        />

        {/* Image zoom on hover */}
        <motion.div
          initial={false}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        />

        {/* Premium gradient overlay */}
        <div
          // ✅ এই পুরো স্ট্রিংটিকে কোনো লাইন ব্রেক ছাড়া এক লাইনে লিখে দিন ভাই:
          className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B]/95 via-[#1C1B1B]/50 to-transparent group-hover:from-[#1C1B1B]/98 group-hover:via-[#1C1B1B]/60 transition-all duration-700"
        />
      </div>

      {/* ✨ Corner sparkle animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
          rotate: isHovered ? 0 : -180,
        }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute top-4 right-4 z-30"
      >
        <div className="w-10 h-10 rounded-full bg-[#FFFCF9]/95 backdrop-blur-md flex items-center justify-center shadow-xl border border-[#742709]/10">
          <Sparkles className="w-5 h-5 text-[#742709]" />
        </div>
      </motion.div>

      {/* 🎯 Quick action buttons */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 left-4 z-30 flex gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full bg-[#FFFCF9]/95 backdrop-blur-md flex items-center justify-center 
            text-[#1C1B1B]/60 hover:text-[#742709] hover:bg-[#FFFCF9] 
            transition-all duration-300 shadow-lg border border-[#742709]/5"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full bg-[#FFFCF9]/95 backdrop-blur-md flex items-center justify-center 
            text-[#1C1B1B]/60 hover:text-[#C43B3B] hover:bg-[#FFFCF9] 
            transition-all duration-300 shadow-lg border border-[#742709]/5"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* 📝 Card Content */}
      <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end z-20">
        {/* Product count badge */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFFCF9]/60" />
          <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.25em] text-[#FFFCF9]/70 uppercase">
            {category.count}
          </span>
        </motion.div>

        {/* Category title */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-[#FFFCF9] tracking-wide leading-tight mb-3"
        >
          {category.title}
        </motion.h3>

        {/* 🎯 FIXED: HOVER REVEAL BLACK & WHITE BUTTON LINK WITH FULL ACTION CLICK */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 25 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-2 relative z-30"
        >
          <Link
            href={`/category/${category.id}`}
            className="inline-block relative z-30 cursor-pointer"
          >
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="group/btn relative w-max overflow-hidden rounded-full border border-[#1C1B1B] bg-[#1C1B1B] px-6 py-2.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#FFFCF9] shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#FFFCF9] cursor-pointer"
            >
              {/* ── 🎭 TEXT ALTERNATE KEYFRAME ANIMATION ── */}
              <span
                className="text-container block relative overflow-hidden pointer-events-none z-10 select-none"
                style={{ mixBlendMode: "difference" }}
              >
                <span className="text block relative transition-transform duration-300 ease-in-out group-hover/btn:animate-[move-up-alternate_0.35s_forwards]">
                  View Collection
                </span>
              </span>

              {/* ── 📐 BACKGROUND SKEW MASKS ── */}
              <div className="absolute w-full h-[104%] top-[-104%] left-[-60%] bg-[#FFFCF9] pointer-events-none z-0 transition-transform duration-300 ease-out transform skew-x-[-30deg] group-hover/btn:translate-y-[204%]" />
              <div className="absolute w-full h-[104%] top-[102%] left-[60%] bg-[#FFFCF9] pointer-events-none z-0 transition-transform duration-300 ease-out transform skew-x-[-30deg] group-hover/btn:translate-y-[-204%]" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* ✨ Animated border glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-3xl pointer-events-none z-10
          border-2 border-[#FFFCF9]/20"
      />

      {/* 🧩 অল্টারনেট টেক্সট অ্যানিমেশনের গ্লোবাল কে ফ্রেম ইনজেকশন */}
      <style jsx global>{`
        @keyframes move-up-alternate {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(120%);
          }
          51% {
            transform: translateY(-120%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CategoryGrid;
