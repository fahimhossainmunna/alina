"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 400); // হিরো সেকশন পার হওয়ার পর স্মুথলি আসবে
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle progress values
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Scroll to premium top"
          className="group fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center focus:outline-none"
        >
          {/* ১. লাক্সারি সার্কেল প্রোগ্রেস রিং */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            className="absolute inset-0 -rotate-90 pointer-events-none"
          >
            {/* ব্যাকগ্রাউন্ড ট্র্যাক (অর্গানিক হালকা ব্রাউন টিন্ট) */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="#742709"
              strokeOpacity="0.08"
              strokeWidth="1.5"
            />
            {/* লাইভ প্রোগ্রেস বার (Alina মেইন ব্র্যান্ড কালার) */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="#742709"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100"
            />
          </svg>

          {/* ২. বাটন মেইন ব্যাকগ্রাউন্ড (লাক্সারি হোয়াইট/ব্রাউন ইন্টারঅ্যাকশন) */}
          <div className="absolute inset-2 rounded-full bg-white border border-[#742709]/10 group-hover:bg-[#742709] shadow-[0_8px_24px_rgba(116,39,9,0.06)] group-hover:shadow-[0_12px_32px_rgba(116,39,9,0.2)] transition-all duration-300" />

          {/* ৩. সফ্ট কসমেটিক গ্লো পালস (হোভার করলে গোল্ডেন-ব্রাউন একটা গ্লো আসবে) */}
          <div className="absolute inset-2 rounded-full bg-[#742709] opacity-0 group-hover:opacity-10 blur-[6px] transition-all duration-300 scale-105" />

          {/* ৪. অ্যারো আইকন (স্মুথ লাক্সারি ট্রানজিশন ও বাউন্স ইফেক্ট) */}
          <ArrowUp
            size={16}
            strokeWidth={2.5}
            className="relative z-10 text-[#742709] group-hover:text-[#FFFCF9] group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;