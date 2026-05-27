'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // আপাতত কার্ট আইটেম সংখ্যা ০ রাখা হলো। পরবর্তীতে Redux দিয়ে এখানে ডাইনামিক স্টেট বসবে।
  const cartItemsCount = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Flavors', href: '/flavors' },
    { label: 'Store', href: '/store' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <div className="w-full fixed top-0 z-50 transition-all duration-300">
      
      {/* ১. টপ অ্যানাউন্সমেন্ট বার */}
      <div className="w-full bg-brand-primary text-[#FFFCF9] text-[11px] font-sans font-medium tracking-[0.25em] uppercase py-2.5 text-center px-4">
        Free shipping on all premium collections • Experience Alina
      </div>

      {/* ২. মেইন ন্যাববার */}
      <nav 
        className={`w-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#FFFCF9]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(116,39,9,0.03)] h-20' 
            : 'bg-[#FFFCF9] h-24'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            
            {/* লোগো সেকশন */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
                <Image 
                  src="/images/alinaLogoo.png"
                  alt="Alina Logo"
                  width={130} 
                  height={45}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* ডেস্কটপ নেভিগেশন লিঙ্ক */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative group font-sans text-xs font-semibold tracking-[0.2em] text-[#1C1B1B] hover:text-brand-primary uppercase transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute bottom-[-6px] left-0 w-0 h-[1.5px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* ডানদিকের আইকন অ্যাকশনসমূহ */}
            <div className="hidden md:flex items-center space-x-5">
              {/* সার্চ বাটন */}
              <button className="text-[#1C1B1B] hover:text-brand-primary transition-all duration-300 p-2.5 hover:bg-brand-primary/5 rounded-full focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
                </svg>
              </button>

              {/* প্রোফাইল বাটন */}
              <button className="text-[#1C1B1B] hover:text-brand-primary transition-all duration-300 p-2.5 hover:bg-brand-primary/5 rounded-full focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>

              {/* কার্ট বাটন (image_2f88a9.png এর রেড অ্যারো চিহ্নিত অংশ) */}
              <button className="text-[#1C1B1B] hover:text-brand-primary transition-all duration-300 p-2.5 hover:bg-brand-primary/5 rounded-full relative focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {/* কন্ডিশনাল ব্যাজ: সংখ্যা ০ হলেও ব্যাজটি সুন্দরভাবে দেখাবে */}
                <span className="absolute top-1.5 right-1.5 bg-brand-primary text-[#FFFCF9] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemsCount}
                </span>
              </button>
            </div>

            {/* মোবাইল হ্যামবার্গার বাটন */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#1C1B1B] hover:text-brand-primary focus:outline-none p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* মোবাইল ড্রপডাউন মেনু */}
        {isOpen && (
          <div className="md:hidden bg-[#FFFCF9] border-b border-brand-primary/5">
            <div className="px-6 pt-4 pb-8 space-y-4 shadow-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-sans text-xs font-semibold tracking-widest text-[#1C1B1B] hover:text-brand-primary uppercase py-2.5 border-b border-gray-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 flex justify-around text-xs font-medium tracking-wider text-[#1C1B1B]">
                <button className="hover:text-brand-primary">Search</button>
                <button className="hover:text-brand-primary">Account</button>
                <button className="hover:text-brand-primary">Cart ({cartItemsCount})</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};