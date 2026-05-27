'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ Fixed: Removed invalid mt-25, added proper min-h-screen
    <div className="min-h-screen mt-25 bg-[#FFFCF9] flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* ══════════════════════════════════════════
          LEFT PANEL - Premium Branding (Desktop)
      ══════════════════════════════════════════ */}
      <motion.aside 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex md:w-1/2 bg-[#742709] text-[#FFFCF9] relative overflow-hidden"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#742709] via-[#8B3A1E] to-[#5A1E07]" />
        
        {/* Decorative Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,252,249,0.4) 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />

        {/* Floating Glow Orbs */}
        <motion.div
          className="absolute top-1/4 -left-16 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-16 w-96 h-96 bg-[#FFFCF9]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">
          
          {/* Top: Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="font-serif text-2xl tracking-[0.25em] uppercase font-bold group-hover:opacity-80 transition-opacity">
                Alina
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FFFCF9]/40 group-hover:bg-[#FFFCF9] transition-colors" />
            </Link>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#FFFCF9]/60 mt-1.5">
              Premium Skincare & Cosmetics
            </p>
          </motion.div>

          {/* Middle: Hero Text */}
          <motion.div className="max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl xl:text-5xl font-light tracking-wide leading-[1.15]"
            >
              Unveil Your <br />
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFFCF9] to-[#E5D4C8]">
                Natural Radiance
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xs text-[#FFFCF9]/70 tracking-widest leading-relaxed mt-6 uppercase"
            >
              Experience pure organic luxury crafted for <br />
              modern skincare rituals.
            </motion.p>

            {/* Feature Bullets */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 space-y-3"
            >
              {['Cruelty-free & vegan formulas', 'Dermatologist-tested ingredients', 'Sustainable luxury packaging'].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + (i * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <div className="w-4 h-4 rounded-full bg-[#FFFCF9]/20 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#FFFCF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[11px] text-[#FFFCF9]/85 tracking-wide">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom: Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[10px] tracking-widest text-[#FFFCF9]/40 uppercase"
          >
            © {new Date().getFullYear()} Alina Premium Collections.
          </motion.div>
        </div>
      </motion.aside>

      {/* ══════════════════════════════════════════
          RIGHT PANEL - Form Area (All Devices)
      ══════════════════════════════════════════ */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 md:px-16 py-12 md:py-0 bg-[#FFFCF9] relative">
        
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#742709]/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#742709]/[0.02] rounded-full blur-3xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="block md:hidden text-center mb-8">
            <Link href="/" className="inline-flex flex-col items-center gap-2 group">
              <span className="font-serif text-2xl tracking-[0.25em] uppercase font-bold text-[#742709] group-hover:opacity-80 transition-opacity">
                Alina
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#1C1B1B]/40">
                Premium Skincare
              </span>
            </Link>
          </div>

          {/* Form Card - Premium Styling */}
          <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-[0_8px_40px_-8px_rgba(116,39,9,0.08)] border border-[#742709]/5">
            {children}
          </div>

          {/* Bottom Decorative Line */}
          <div className="hidden md:block mt-8 flex items-center justify-center gap-2 text-[10px] text-[#1C1B1B]/30 uppercase tracking-wider">
            <div className="w-8 h-px bg-[#742709]/20" />
            <span>Secure Authentication</span>
            <div className="w-8 h-px bg-[#742709]/20" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}