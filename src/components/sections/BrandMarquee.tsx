"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const brands = [
  { id: 1, name: "Vogue", src: "/images/brand/brandOne.png" },
  { id: 2, name: "Elle", src: "/images/brand/brandTwo.png" },
  { id: 3, name: "Harper", src: "/images/brand/brandThree.png" },
  { id: 4, name: "Allure", src: "/images/brand/brandFour.png" },
  { id: 5, name: "Glamour", src: "/images/brand/brandfive.png" },
  { id: 6, name: "Cosmo", src: "/images/brand/brandsix.png" },
];

// Triple the array for seamless infinite loop
const duplicatedBrands = [...brands, ...brands, ...brands];

export const BrandMarquee = () => {
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFFCF9] via-[#FAF7F2] to-[#FFFCF9] py-20 lg:py-28 overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#742709]/[0.02] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A961]/[0.03] rounded-full blur-3xl pointer-events-none"
      />

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #742709 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* HEADER SECTION - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#742709]/5 border border-[#742709]/10 rounded-full mb-5">
            <Sparkles className="w-4 h-4 text-[#742709]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#742709]">
              Trusted Worldwide
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1B1B] tracking-tight mb-4">
            As Featured In & <br className="hidden sm:block" />
            <span className="font-normal text-[#742709]">
              Trusted Global Partners
            </span>
          </h2>

          <p className="font-sans text-[14px] sm:text-[15px] text-[#1C1B1B]/60 max-w-2xl mx-auto leading-relaxed">
            Join thousands of premium brands who trust Alina for their beauty
            and skincare needs.
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          FULL-WIDTH MARQUEE CONTAINER
      ══════════════════════════════════════════ */}
      <div className="relative w-full flex items-center">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-r from-[#FFFCF9] via-[#FFFCF9]/95 to-transparent z-20 pointer-events-none" />

        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-l from-[#FFFCF9] via-[#FFFCF9]/95 to-transparent z-20 pointer-events-none" />

        {/* INFINITE SCROLL TRACK - FULL WIDTH */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex items-center gap-16 sm:gap-20 lg:gap-28"
            animate={{ x: [0, -1200] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {duplicatedBrands.map((brand, index) => {
              const isHovered = hoveredBrand === brand.id;

              return (
                <motion.div
                  key={`${brand.id}-${index}`}
                  className="relative w-[160px] sm:w-[180px] lg:w-[200px] h-[60px] sm:h-[70px] flex-shrink-0 cursor-pointer group"
                  onHoverStart={() => setHoveredBrand(brand.id)}
                  onHoverEnd={() => setHoveredBrand(null)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Brand Logo Container */}

                  <div className="relative w-full h-full flex items-center justify-center p-4 rounded-xl bg-transparent">
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      fill
                      sizes="(max-w-640px) 160px, (max-width: 1024px) 180px, 200px"
                      className={`object-contain transition-all duration-500 mix-blend-multiply ${
                        isHovered
                          ? "grayscale-0 opacity-100 scale-105"
                          : "grayscale opacity-35 group-hover:grayscale-0 group-hover:opacity-90"
                      }`}
                      priority={index < 6}
                    />
                  </div>

                  {/* Brand name tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1C1B1B] text-[#FFFCF9] text-[10px] font-medium uppercase tracking-wider rounded-lg whitespace-nowrap pointer-events-none z-30"
                  >
                    {brand.name}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12 text-center">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#742709] hover:text-[#5A1E07] transition-colors duration-300"
        >
          View All Partners
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* STATS BADGE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 pt-8 border-t border-[#742709]/8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-8 sm:gap-16"
        >
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#742709]">
              500+
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#1C1B1B]/40 mt-1">
              Brand Partners
            </p>
          </div>
          <div className="w-px h-10 bg-[#742709]/10 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#742709]">50+</p>
            <p className="text-[10px] uppercase tracking-wider text-[#1C1B1B]/40 mt-1">
              Countries
            </p>
          </div>
          <div className="w-px h-10 bg-[#742709]/10 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#742709]">
              10M+
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#1C1B1B]/40 mt-1">
              Happy Customers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandMarquee;
