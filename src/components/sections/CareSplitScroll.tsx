"use client";

import React, { useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useCareScroll } from "@/hooks/useCareScroll";

// ── 📸 DIRECT IMAGE IMPORTS ──
import imgOne from "../../../public/images/care/imgOne.png";
import imgOneOne from "../../../public/images/care/imgOneOne.png";
import imgTwoTwo from "../../../public/images/care/imgTwoTwo.png";
import imgTwo from "../../../public/images/care/imgTwo.png";
import imgThree from "../../../public/images/care/imgThree.png";
import imgThreeThree from "../../../public/images/care/imgThreeThree.png";

// Map keys to imported static images
const imageMap: Record<string, StaticImageData> = {
  imgOne,
  imgOneOne,
  imgTwoTwo,
  imgTwo,
  imgThree,
  imgThreeThree,
};

export const CareSplitScroll = () => {
  const { data, loading, error } = useCareScroll();
  // ✅ FIXED: পেজের অন্য সেকশনের সাথে কনফ্লিক্ট এড়াতে নির্দিষ্ট রিফ (Ref) লক করা হলো
  const containerRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#FFFCF9] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#742709]/20 border-t-[#742709] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-24 text-center text-[14px] text-red-500 font-medium bg-[#FFFCF9]">
        Error loading section: {error}
      </div>
    );
  }

  return (
    // ✅ FIXED: containerRef এখানে অ্যাসাইন করা হলো যাতে শুধু এই সেকশনের স্ক্রোল ট্র্যাক হয়
    <section ref={containerRef} className="w-full relative box-border antialiased bg-[#FFFCF9]">
      {/* ── 🔒 ORIGINAL HEIGHT BLOCK ── */}
      <div className="relative h-[300vh] w-full">
        
        {/* Sticky Viewport Frame */}
        <div className="sticky top-0 h-screen w-full overflow-hidden grid grid-cols-2">
          
          {/* ── 📸 LEFT PANEL AREA (52% Split with Premium Overlays) ── */}
          <div className="relative w-full h-full bg-[#FCF6F2] overflow-hidden">
            {data.map((item, idx) => (
              <div
                key={`left-${item.id}`}
                className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  zIndex: item.id,
                  transform: `translateY(calc((var(--scroll-step, 0) - ${idx}) * 100%))`
                }}
              >
                <div className="relative w-full h-full group/img">
                  <Image
                    src={imageMap[item.imageKey] || imgOne}
                    alt={item.title}
                    fill
                    placeholder="blur"
                    className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover/img:scale-102"
                    priority={idx === 0}
                  />
                  
                  {/* Subtle editorial shadow filter overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

                  {/* 👑 4-SIDE PREMIUM OUTLINE BORDER MARKERS */}
                  <div className="absolute inset-0 p-6 sm:p-8 border border-white/20 pointer-events-none z-20 transition-all duration-500 group-hover/img:border-white/30">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/10" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/10" />
                  </div>

                  {/* 👑 LUXURY IMAGE CONTENT OVERLAY */}
                  <div className="absolute inset-0 p-10 sm:p-14 flex flex-col justify-between text-white pointer-events-none z-10 font-sans">
                    
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/80 backdrop-blur-[2px] bg-black/5 px-2.5 py-1 rounded-sm">
                        ALINA EDITORIAL
                      </span>
                      <span className="font-serif italic text-sm text-white/90">
                        0{item.id} // 03
                      </span>
                    </div>

                    <div className="flex flex-col items-start space-y-2 max-w-[240px] sm:max-w-xs transition-all duration-700 transform translate-y-2 group-hover/img:translate-y-0">
                      <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.3em] uppercase text-[#B9F2A1]">
                        ✦ LAB TESTED PURITY
                      </span>
                      <h4 className="font-serif text-lg sm:text-2xl font-light leading-tight text-[#FFFCF9] tracking-wide drop-shadow-md">
                        {item.id === 1 ? "The Organic Mineral Bond" : item.id === 2 ? "The Weightless Raw Glow" : "The Timeless Cellular Defense"}
                      </h4>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── 📄 RIGHT PANEL AREA (48% Split) ── */}
          <div className="relative w-full h-full overflow-hidden border-l border-[#742709]/5">
            {data.map((item, idx) => {
              const isRightTextLayout = item.isRightText;

              return (
                <div
                  key={`right-${item.id}`}
                  className={`absolute inset-0 w-full h-full ${item.rightBg} p-4 sm:p-12 lg:p-24 flex flex-col justify-between items-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]`}
                  style={{
                    zIndex: item.id,
                    transform: `translateY(calc((${idx} - var(--scroll-step, 0)) * 100%))`
                  }}
                >
                  <div className="w-full hidden lg:block" />

                  {/* Core Typography Content */}
                  <div className={`w-full flex flex-col ${isRightTextLayout ? "items-center text-center" : "items-center lg:items-start text-center lg:text-left"} max-w-md my-auto px-2`}>
                    <h3 className="font-sans text-xl sm:text-3xl lg:text-5xl font-bold text-[#1C1B1B] tracking-tight uppercase leading-none mb-1 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="font-serif italic text-[12px] sm:text-[16px] lg:text-[18px] text-[#742709] font-light tracking-wide mb-3 lg:mb-6">
                      {item.subtitle}
                    </p>
                    <p className="font-sans text-[11px] sm:text-[13px] lg:text-[14px] text-[#1C1B1B]/65 leading-relaxed tracking-wide font-light max-w-sm hidden md:block">
                      {item.description}
                    </p>
                  </div>

                  {/* Interactive Thumbnail Block */}
                  <div className={`w-full flex ${isRightTextLayout ? "flex-col items-center" : "flex-col lg:flex-row items-center lg:items-end justify-between"} gap-2 sm:gap-4 lg:gap-8 mt-auto`}>
                    
                    <div className="relative w-[75px] sm:w-[130px] lg:w-[185px] aspect-[4/3] rounded-lg lg:rounded-2xl overflow-hidden border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] group/thumb">
                      <Image
                        src={imageMap[item.thumbKey] || imgOneOne}
                        alt={`${item.title} Preview`}
                        fill
                        placeholder="blur"
                        className="object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-105"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 lg:gap-2 group/btn cursor-pointer pb-1 lg:pb-2">
                      <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-widest text-[#1C1B1B]/70 uppercase border-b border-[#1C1B1B]/15 pb-0.5 transition-colors group-hover/btn:text-[#742709]">
                        EXPLORE
                      </span>
                      <ArrowUpRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#1C1B1B]/40 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-[#742709]" />
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ✅ FIXED: containerRef পাস করা হলো নিচের ড্রাইভার স্ক্রিপ্টে */}
      <ScrollTracker containerRef={containerRef} />
    </section>
  );
};

// ── 🎛️ FIXED SCROLL DRIVER SCRIPT (নির্দিষ্ট সেকশন ট্র্যাকিং মেকানিজম) ──
const ScrollTracker = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  useEffect(() => {
    const targetSection = containerRef.current;
    if (!targetSection) return;

    const handleScroll = () => {
      const rect = targetSection.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewHeight = window.innerHeight;
      
      const scrolledIntoSection = -rect.top;
      const totalScrollableDistance = sectionHeight - viewHeight;

      if (scrolledIntoSection >= 0 && scrolledIntoSection <= totalScrollableDistance) {
        const progress = scrolledIntoSection / totalScrollableDistance;
        let currentStep = 0;

        if (progress > 0.33 && progress <= 0.66) {
          currentStep = 1;
        } else if (progress > 0.66) {
          currentStep = 2;
        }

        targetSection.style.setProperty("--scroll-step", currentStep.toString());
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return null;
};

export default CareSplitScroll;