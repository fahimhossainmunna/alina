'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ───── Types ─────
interface CartItem {
  id: number;
  name: string;
  flavor: string;
  price: number;
  quantity: number;
  image: string;
}

interface WishlistItem {
  id: number;
  name: string;
  flavor: string;
  price: number;
  image: string;
}

const DEMO_CART: CartItem[] = [];
const DEMO_WISHLIST: WishlistItem[] = [];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>(DEMO_CART);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(DEMO_WISHLIST);

  const overlayRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWishlistItems = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── SEARCH: focus input when opened, clear when closed ──
  useEffect(() => {
    if (isSearchOpen) {
      // small delay so CSS transition runs first, then input gets focus
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setSearchQuery(''), 300);
      return () => clearTimeout(t);
    }
  }, [isSearchOpen]);

  // ── SEARCH: close on Escape key ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) setIsSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen]);

  // ── SEARCH: close when clicking outside ──
  useEffect(() => {
    if (!isSearchOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    // delay so the open-click itself doesn't immediately close
    const t = setTimeout(() => document.addEventListener('mousedown', onClickOutside), 100);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (isCartOpen || isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, isWishlistOpen]);

  const removeItem = (id: number) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCartItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0)
    );

  const removeFromWishlist = (id: number) =>
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));

  const moveToCartFromWishlist = (item: WishlistItem) => {
    const existingCart = cartItems.find((ci) => ci.id === item.id);
    if (!existingCart) {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 } as CartItem]);
    }
    removeFromWishlist(item.id);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const navLinks = [
    { label: 'Flavors', href: '/flavors' },
    { label: 'Store', href: '/store' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <>
      <div className="w-full fixed top-0 z-40 transition-all duration-700">
        {/* Announcement Bar */}
        <div className="w-full bg-gradient-to-r from-[#742709] via-[#8B3A1E] to-[#742709] text-[#FFFCF9] text-[10px] font-medium tracking-[0.35em] uppercase py-3 overflow-hidden shadow-2xl">
          <div className="relative w-full">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-3 mx-8">
                  <span className="w-1.5 h-1.5 bg-[#FFFCF9] rounded-full animate-pulse"></span>
                  Free shipping on all premium collections
                  <span className="w-px h-3 bg-[#FFFCF9]/40"></span>
                  Experience Alina
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav
          className={`w-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] border-b ${
            isScrolled
              ? 'bg-[#FFFCF9]/95 backdrop-blur-2xl border-[#742709]/10 h-[72px] shadow-2xl shadow-[#742709]/10'
              : 'bg-[#FFFCF9] border-transparent h-[84px]'
          }`}
        >
          <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-full">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0 transition-all duration-500 hover:opacity-80 hover:scale-[1.02] group">
                <Image
                  src="/images/alinaLogoo.png"
                  alt="Alina"
                  width={130}
                  height={42}
                  className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-12">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative group text-[11px] font-semibold tracking-[0.25em] text-[#1C1B1B] hover:text-[#742709] uppercase transition-all duration-500"
                    style={{ transitionDelay: isScrolled ? `${index * 50}ms` : '0ms' }}
                  >
                    {link.label}
                    <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-[#742709] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* Right Icons — Desktop */}
              <div className="hidden md:flex items-center gap-0.5">

                {/* ════════════════════════════════════
                    SEARCH — smooth expand/collapse
                ════════════════════════════════════ */}
                <div ref={searchRef} className="flex items-center">
                  {/* Expanding input wrapper */}
                  <div
                    style={{ width: isSearchOpen ? '240px' : '0px' }}
                    className="overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    <form
                      onSubmit={handleSearchSubmit}
                      className={`flex items-center border-b-2 transition-colors duration-500 mx-1 ${
                        isSearchOpen ? 'border-[#C9A961]' : 'border-transparent'
                      }`}
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-transparent text-[13px] text-[#1C1B1B] placeholder:text-[#1C1B1B]/40 outline-none py-2 pl-1 pr-2 tracking-wide"
                      />
                      {/* Clear button */}
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="shrink-0 p-1 text-[#1C1B1B]/30 hover:text-[#742709] transition-colors duration-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Search icon button — toggles open/close */}
                  <button
                    onClick={() => setIsSearchOpen((v) => !v)}
                    aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                    className={`p-3 rounded-full transition-all duration-500 group hover:scale-110 active:scale-95 ${
                      isSearchOpen
                        ? 'text-[#742709] bg-[#742709]/8 rotate-0'
                        : 'text-[#1C1B1B] hover:text-[#742709] hover:bg-[#742709]/5'
                    }`}
                  >
                    {/* Animates between search ↔ close icon */}
                    <div className="relative w-5 h-5">
                      {/* Search icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.2} stroke="currentColor"
                        className={`absolute inset-0 w-5 h-5 transition-all duration-400 ${
                          isSearchOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
                      </svg>
                      {/* Close icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor"
                        className={`absolute inset-0 w-5 h-5 transition-all duration-400 ${
                          isSearchOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Account */}
                <IconBtn aria-label="Account">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </IconBtn>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  aria-label={`Wishlist — ${totalWishlistItems} items`}
                  className="relative text-[#1C1B1B] hover:text-[#742709] transition-all duration-500 p-3 hover:bg-[#742709]/5 rounded-full group hover:scale-110 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 transition-transform duration-500 group-hover:scale-110">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  {totalWishlistItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-[4px] shadow-lg shadow-[#742709]/30">
                      {totalWishlistItems > 9 ? '9+' : totalWishlistItems}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label={`Cart — ${totalItems} items`}
                  className="relative text-[#1C1B1B] hover:text-[#742709] transition-all duration-500 p-3 hover:bg-[#742709]/5 rounded-full group hover:scale-110 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 transition-transform duration-500 group-hover:rotate-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-[4px] shadow-lg shadow-[#742709]/30 animate-pulse">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Icons */}
              <div className="flex md:hidden items-center gap-0.5">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search"
                  className="p-2.5 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300 hover:scale-110 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
                  </svg>
                </button>
                <button onClick={() => setIsWishlistOpen(true)} aria-label="Wishlist"
                  className="relative p-2.5 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300 hover:scale-110 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  {totalWishlistItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none shadow-md">
                      {totalWishlistItems}
                    </span>
                  )}
                </button>
                <button onClick={() => setIsCartOpen(true)} aria-label="Cart"
                  className="relative p-2.5 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300 hover:scale-110 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none shadow-md animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu"
                  className="p-2 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300">
                  <svg className="w-6 h-6 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {isMenuOpen
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    }
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Search Slide-down */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isSearchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="border-t border-[#742709]/10 bg-[#FFFCF9] px-6 py-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center border-b-2 border-[#C9A961]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-[13px] text-[#1C1B1B] placeholder:text-[#1C1B1B]/40 outline-none py-2 pr-2 tracking-wide"
                  autoFocus={isSearchOpen}
                />
                <button type="submit" className="p-1.5 text-[#1C1B1B] hover:text-[#742709] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-[#FFFCF9] border-t border-[#742709]/10 shadow-2xl">
              <div className="px-8 pt-6 pb-10 space-y-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between text-[11px] font-semibold tracking-[0.25em] text-[#1C1B1B] hover:text-[#742709] uppercase py-5 border-b border-[#742709]/5 transition-all duration-500 hover:pl-2"
                    style={{
                      animation: isMenuOpen ? `slideInRight 0.5s ease forwards ${index * 100}ms` : 'none',
                      opacity: 0,
                    }}
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-30">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => { setIsCartOpen(false); setIsWishlistOpen(false); }}
        className={`fixed inset-0 z-50 bg-[#1C1B1B]/50 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          (isCartOpen || isWishlistOpen) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* ══ CART DRAWER ══ */}
      <aside
        role="dialog" aria-modal="true" aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-[440px] bg-[#FFFCF9] flex flex-col shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#742709]/10 bg-gradient-to-r from-[#FFFCF9] to-[#F9F6F4]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] text-[#742709] uppercase mb-1">Your Selection</p>
            <h2 className="text-[20px] font-semibold text-[#1C1B1B] tracking-tight">
              Shopping Cart
              {totalItems > 0 && <span className="ml-2.5 text-[13px] font-normal text-[#742709]/60">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>}
            </h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} aria-label="Close cart"
            className="p-3 rounded-full text-[#1C1B1B]/40 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-500 hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-8">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 pb-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#742709]/5 to-[#742709]/10 flex items-center justify-center relative animate-bounce-slow">
                <div className="absolute inset-0 rounded-full border border-[#742709]/10"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="#742709" className="w-11 h-11 opacity-40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-[16px] font-semibold text-[#1C1B1B]">Your cart is empty</p>
                <p className="text-[13px] text-[#1C1B1B]/50 leading-relaxed max-w-[240px] mx-auto">Discover our premium chocolate collections</p>
              </div>
              <button onClick={() => setIsCartOpen(false)}
                className="mt-4 text-[11px] font-bold tracking-[0.25em] uppercase text-[#742709] border border-[#742709]/30 px-8 py-3.5 hover:bg-[#742709] hover:text-[#FFFCF9] hover:shadow-xl hover:shadow-[#742709]/20 transition-all duration-500 hover:-translate-y-0.5">
                Explore Flavors
              </button>
            </div>
          ) : (
            <ul className="space-y-0">
              {cartItems.map((item, index) => (
                <li key={item.id} className="py-6 first:pt-0 last:pb-0 border-b border-[#742709]/8 last:border-0"
                  style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-start gap-5 group">
                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-[#F5EDE8] to-[#EDE4DE] rounded-sm overflow-hidden relative">
                      {item.image
                        ? <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        : <div className="absolute inset-0 flex items-center justify-center"><span className="text-[9px] font-bold tracking-[0.2em] text-[#742709]/30 uppercase">Alina</span></div>
                      }
                      <div className="absolute inset-0 border border-[#742709]/5 group-hover:border-[#742709]/20 transition-colors duration-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <p className="text-[14px] font-semibold text-[#1C1B1B] leading-tight group-hover:text-[#742709] transition-colors duration-300">{item.name}</p>
                          <p className="text-[11px] text-[#1C1B1B]/50 mt-1 tracking-wide">{item.flavor}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}
                          className="p-2 -mr-2 text-[#1C1B1B]/25 hover:text-[#C43B3B] hover:bg-[#C43B3B]/5 rounded-full transition-all duration-500 hover:rotate-90">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#742709]/15 rounded-sm overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease"
                            className="w-9 h-9 flex items-center justify-center text-[#1C1B1B]/50 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-300 text-lg leading-none font-light">−</button>
                          <span className="w-10 h-9 flex items-center justify-center text-[12px] font-semibold text-[#1C1B1B] bg-[#F9F6F4]">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} aria-label="Increase"
                            className="w-9 h-9 flex items-center justify-center text-[#1C1B1B]/50 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-300 text-base leading-none">+</button>
                        </div>
                        <p className="text-[14px] font-bold text-[#742709]">৳{(item.price * item.quantity).toLocaleString('en-BD')}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-[#742709]/10 px-8 py-7 space-y-5 bg-gradient-to-t from-[#F9F6F4]/50 to-transparent">
            <div className="flex items-center justify-between pb-4 border-b border-[#742709]/8">
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#1C1B1B]/60">Subtotal</span>
              <span className="text-[20px] font-bold text-[#1C1B1B]">৳{subtotal.toLocaleString('en-BD')}</span>
            </div>
            <p className="text-[11px] text-[#1C1B1B]/40 text-center leading-relaxed">Shipping & taxes calculated at checkout</p>
            <div className="space-y-3">
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}
                className="block w-full text-center bg-[#742709] text-[#FFFCF9] text-[11px] font-bold tracking-[0.28em] uppercase py-4 hover:bg-[#5A1E07] hover:shadow-2xl hover:shadow-[#742709]/30 transition-all duration-500 relative overflow-hidden group hover:-translate-y-0.5">
                <span className="relative z-10">Checkout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
              <Link href="/store" onClick={() => setIsCartOpen(false)}
                className="block w-full text-center border border-[#742709]/25 text-[#742709] text-[11px] font-bold tracking-[0.28em] uppercase py-4 hover:border-[#742709] hover:bg-[#742709]/5 transition-all duration-500 hover:-translate-y-0.5">
                Continue Shopping
              </Link>
            </div>
            <div className="pt-4 flex items-center justify-center gap-6 text-[#1C1B1B]/30">
              <div className="flex items-center gap-1.5 text-[10px] hover:text-[#742709] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                Secure
              </div>
              <div className="w-px h-3 bg-[#1C1B1B]/20"></div>
              <div className="flex items-center gap-1.5 text-[10px] hover:text-[#742709] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                Free Shipping
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ══ WISHLIST DRAWER ══ */}
      <aside
        role="dialog" aria-modal="true" aria-label="Wishlist"
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-[440px] bg-[#FFFCF9] flex flex-col shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isWishlistOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#742709]/10 bg-gradient-to-r from-[#FFFCF9] to-[#F9F6F4]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] text-[#742709] uppercase mb-1">Saved for Later</p>
            <h2 className="text-[20px] font-semibold text-[#1C1B1B] tracking-tight">
              My Wishlist
              {totalWishlistItems > 0 && <span className="ml-2.5 text-[13px] font-normal text-[#742709]/60">({totalWishlistItems} {totalWishlistItems === 1 ? 'item' : 'items'})</span>}
            </h2>
          </div>
          <button onClick={() => setIsWishlistOpen(false)} aria-label="Close wishlist"
            className="p-3 rounded-full text-[#1C1B1B]/40 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-500 hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-8">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 pb-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#742709]/5 to-[#742709]/10 flex items-center justify-center relative animate-bounce-slow">
                <div className="absolute inset-0 rounded-full border border-[#742709]/10"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="#742709" className="w-11 h-11 opacity-40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-[16px] font-semibold text-[#1C1B1B]">Your wishlist is empty</p>
                <p className="text-[13px] text-[#1C1B1B]/50 leading-relaxed max-w-[240px] mx-auto">Save your favourite products here</p>
              </div>
              <button onClick={() => setIsWishlistOpen(false)}
                className="mt-4 text-[11px] font-bold tracking-[0.25em] uppercase text-[#742709] border border-[#742709]/30 px-8 py-3.5 hover:bg-[#742709] hover:text-[#FFFCF9] hover:shadow-xl hover:shadow-[#742709]/20 transition-all duration-500 hover:-translate-y-0.5">
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="space-y-0">
              {wishlistItems.map((item, index) => (
                <li key={item.id} className="py-6 first:pt-0 last:pb-0 border-b border-[#742709]/8 last:border-0"
                  style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-start gap-5 group">
                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-[#F5EDE8] to-[#EDE4DE] rounded-sm overflow-hidden relative">
                      {item.image
                        ? <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        : <div className="absolute inset-0 flex items-center justify-center"><span className="text-[9px] font-bold tracking-[0.2em] text-[#742709]/30 uppercase">Alina</span></div>
                      }
                      <div className="absolute inset-0 border border-[#742709]/5 group-hover:border-[#742709]/20 transition-colors duration-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <p className="text-[14px] font-semibold text-[#1C1B1B] leading-tight group-hover:text-[#742709] transition-colors duration-300">{item.name}</p>
                          <p className="text-[11px] text-[#1C1B1B]/50 mt-1 tracking-wide">{item.flavor}</p>
                        </div>
                        <button onClick={() => removeFromWishlist(item.id)} aria-label={`Remove ${item.name} from wishlist`}
                          className="p-2 -mr-2 text-[#1C1B1B]/25 hover:text-[#C43B3B] hover:bg-[#C43B3B]/5 rounded-full transition-all duration-500 hover:rotate-90">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-[14px] font-bold text-[#742709]">৳{item.price.toLocaleString('en-BD')}</p>
                        <button onClick={() => moveToCartFromWishlist(item)}
                          className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#742709] hover:text-[#5A1E07] transition-colors duration-300 flex items-center gap-1 group/btn">
                          Add to Cart
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="border-t border-[#742709]/10 px-8 py-7 space-y-4 bg-gradient-to-t from-[#F9F6F4]/50 to-transparent">
            <p className="text-[11px] text-[#1C1B1B]/40 text-center leading-relaxed">Items in your wishlist are not reserved</p>
            <Link href="/store" onClick={() => setIsWishlistOpen(false)}
              className="block w-full text-center border border-[#742709]/25 text-[#742709] text-[11px] font-bold tracking-[0.28em] uppercase py-4 hover:border-[#742709] hover:bg-[#742709]/5 transition-all duration-500">
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(-5%); }
          50%       { transform: translateY(5%); }
        }
        .animate-bounce-slow { animation: bounceSlow 3s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(116,39,9,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(116,39,9,0.3); }
      `}</style>
    </>
  );
};

const IconBtn = ({
  children,
  'aria-label': label,
  onClick,
}: {
  children: React.ReactNode;
  'aria-label': string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="text-[#1C1B1B] hover:text-[#742709] transition-all duration-500 p-3 hover:bg-[#742709]/5 rounded-full group hover:scale-110 active:scale-95"
  >
    {children}
  </button>
);

export default Navbar;