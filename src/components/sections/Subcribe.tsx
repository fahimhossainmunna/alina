"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { IoSparklesOutline } from "react-icons/io5";
import Link from "next/link";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  return (
    <section className="w-full relative px-6 sm:px-16 lg:px-28 py-24 sm:py-36 font-sans overflow-hidden bg-[#1C1B1B] border-b border-[#FFFCF9]/10 selection:bg-[#742709] selection:text-white">
      
      {/* ── 📸 BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/subscribe.jpg"
          alt="Alina Luxury Atelier Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

     
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/55 to-transparent z-10 pointer-events-none" />
     
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/55 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
      
      {/* Editorial Fine Lines */}
      <div className="absolute top-0 bottom-0 left-6 sm:left-16 lg:left-28 w-[1px] bg-white/[0.04] z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-6 sm:right-16 lg:right-28 w-[1px] bg-white/[0.04] z-10 pointer-events-none" />

      {/* ── 📧 ELEGANT CONTENT LAYER ── */}
      <div className="max-w-7xl mx-auto z-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Editorial Copy (7-Columns) */}
          <div className="lg:col-span-7 space-y-6 lg:pr-8">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-white/[0.08] rounded-full">
              <HiOutlineMail className="w-3.5 h-3.5 text-[#C9A961]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#C9A961]">
                The Alina Journal
              </span>
            </div>
            
            <div className="space-y-3">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C9A961]/80 block">
                ✦ EXCLUSIVE PRIVILEGES
              </span>
              
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#FFFCF9] tracking-tight leading-[1.15] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Join the <span className="italic font-normal text-[#C9A961] tracking-normal">Alina Essence</span> Family
              </h3>
            </div>
            
            <p className="font-sans text-[13px] sm:text-[14px] text-[#FFFCF9]/90 leading-relaxed max-w-md font-light tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
              Subscribe to receive curated luxury offers, private access to new seasonal collections, and beauty tips.
            </p>
          </div>

          {/* Right Side: Floating Form (5-Columns) */}
          <div className="lg:col-span-5 w-full">
            
            <div className="bg-black/35 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
              <form onSubmit={handleSubscribe} className="space-y-4">
                
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white/[0.03] focus:bg-white/[0.06] border border-white/40 rounded-xl px-4 py-4 pr-12 text-[13px] text-[#FFFCF9] placeholder:text-[#FFFCF9]/70 outline-none focus:border-[#C9A961]/40 transition-all duration-500 font-light tracking-wide"
                  />
                  <HiOutlineMail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFFCF9]/30 group-focus-within:text-[#C9A961] transition-colors duration-300" />
                </div>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.01, 
                    boxShadow: "0 20px 35px -10px rgba(116, 39, 9, 0.4)",
                    backgroundColor: "#5A1E07"
                  }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubscribed}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.25em] text-[10px] transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer relative overflow-hidden ${
                    isSubscribed
                      ? 'bg-green-700 text-white shadow-lg shadow-green-900/20'
                      : 'bg-[#742709] text-[#FFFCF9]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {isSubscribed ? (
                    <>
                      <IoSparklesOutline className="w-3.5 h-3.5 text-white animate-spin" />
                      Welcome to the Atelier
                    </>
                  ) : (
                    <>
                      Request Invitation
                      <HiArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                    </>
                  )}
                </motion.button>

                <div className="flex items-center justify-between pt-2 text-[10px] text-[#FFFCF9]/40 tracking-wide font-light">
                  <span>No Spam. Unsubscribe anytime.</span>
                  <Link href="/privacy" className="hover:text-[#C9A961] transition-colors duration-300 underline underline-offset-2">
                    Privacy Policy
                  </Link>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Subscribe;