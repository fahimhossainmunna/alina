// src/app/(auth)/layout.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isRegister = pathname?.includes('register');
  const backgroundImage = isRegister ? '/images/regesterPic.jpg' : '/images/loginpic.jpg';

  return (
    // ✅ Navbar height fix: pt-[calc(40px+84px)] = announcement bar (40px) + nav (84px)
    // On scroll nav shrinks to 68px but we use max height to avoid jump
    <div className="min-h-screen bg-[#FFFCF9] flex flex-col md:flex-row font-sans overflow-hidden pt-[124px] md:pt-0">

      {/* ══════════════════════════════
          LEFT PANEL — Full-bleed image
      ══════════════════════════════ */}
      <motion.aside
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex md:w-[52%] xl:w-[55%] relative overflow-hidden min-h-screen"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#742709]/85 via-[#742709]/50 to-[#3a1205]/30" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(255,252,249,0.5) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full pt-12 xl:p-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <Link href="/" className="inline-flex flex-col gap-1 group">
              <span
                className="mt-35 text-[26px] tracking-[0.3em] uppercase font-semibold text-[#FFFCF9] group-hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
              >
                Alina
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#FFFCF9]/50">
                Premium Collections
              </span>
            </Link>
          </motion.div>

          {/* Hero text */}
          <motion.div className="max-w-md space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#FFFCF9]/50"
            >
              {isRegister ? 'Join the Family' : 'Welcome Back'}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[44px] xl:text-[52px] font-semibold leading-[1.1] tracking-tight text-[#FFFCF9]"
              style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
            >
              Unveil Your<br />
              <em className="italic font-normal text-[#FFFCF9]/70">Natural Radiance</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[13px] text-[#FFFCF9]/60 leading-relaxed tracking-wide max-w-[320px]"
            >
              Experience pure organic luxury crafted for modern skincare rituals.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="space-y-3.5 pt-2"
            >
              {[
                'Cruelty-free & vegan formulas',
                'Dermatologist-tested ingredients',
                'Sustainable luxury packaging',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-[18px] h-[18px] rounded-full bg-[#FFFCF9]/15 border border-[#FFFCF9]/20 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#FFFCF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[12px] text-[#FFFCF9]/80 tracking-wide">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-[#FFFCF9]/10"
            >
              {[
                { v: '50K+', l: 'Members' },
                { v: '200+', l: 'Products' },
                { v: '30+', l: 'Countries' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-[22px] font-semibold text-[#FFFCF9]" style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}>{s.v}</p>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#FFFCF9]/40 mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#FFFCF9]/30"
          >
            © {new Date().getFullYear()} Alina. All rights reserved.
          </motion.p>
        </div>
      </motion.aside>

      {/* ══════════════════════════════
          RIGHT PANEL — Form
      ══════════════════════════════ */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-16 py-12 md:py-0 bg-[#FFFCF9] relative overflow-y-auto md:min-h-screen">
        {/* Subtle bg blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#742709]/[0.025] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#742709]/[0.025] rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="w-full max-w-[440px] relative z-10"
        >
          {/* Mobile logo */}
          <div className="block md:hidden text-center ">
            <Link href="/" className="inline-flex flex-col items-center gap-1.5 group">
              <span
                className="text-[24px] tracking-[0.3em] uppercase font-semibold text-[#742709] group-hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
              >
                Alina
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#1C1B1B]/35">Premium Collections</span>
            </Link>
          </div>

          {/* Form card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_8px_48px_-12px_rgba(116,39,9,0.10)] border border-[#742709]/6 p-8 sm:p-10">
            {children}
          </div>

          {/* Secure badge */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[60px] bg-[#742709]/12" />
            <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#1C1B1B]/28">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Secure Authentication
            </div>
            <div className="h-px flex-1 max-w-[60px] bg-[#742709]/12" />
          </div>

          {/* Bottom links */}
          <div className="mt-4 flex items-center justify-center gap-5 text-[10px] tracking-[0.18em] uppercase text-[#1C1B1B]/28">
            <Link href="/privacy" className="hover:text-[#742709] transition-colors duration-300">Privacy</Link>
            <span className="opacity-40">·</span>
            <Link href="/terms" className="hover:text-[#742709] transition-colors duration-300">Terms</Link>
            <span className="opacity-40">·</span>
            <Link href="/contact" className="hover:text-[#742709] transition-colors duration-300">Contact</Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}