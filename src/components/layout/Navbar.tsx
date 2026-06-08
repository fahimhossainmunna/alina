"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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
  const [isHidden, setIsHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>(DEMO_CART);
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(DEMO_WISHLIST);

  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const lastScrollY = useRef(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalWishlistItems = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for navbar styling
      setIsScrolled(currentScrollY > 20);

      // ── Hide navbar on scroll down, show on scroll up ──
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      }

      // ── ✅ FIXED: Show announcement bar ONLY at the very top ──
      if (currentScrollY === 0) {
        setShowAnnouncement(true);
      } else {
        setShowAnnouncement(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setSearchQuery(""), 300);
      return () => clearTimeout(t);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsAccountOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setIsSearchOpen(false);
    };
    const t = setTimeout(
      () => document.addEventListener("mousedown", onClickOutside),
      100,
    );
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isAccountOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node))
        setIsAccountOpen(false);
    };
    const t = setTimeout(
      () => document.addEventListener("mousedown", onClickOutside),
      100,
    );
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isAccountOpen]);

  useEffect(() => {
    const isSidebarOpen = isCartOpen || isWishlistOpen;

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        const navbar = document.getElementById("main-navbar");
        if (navbar) {
          (navbar as HTMLElement).style.paddingRight = `${scrollbarWidth}px`;
        }
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const navbar = document.getElementById("main-navbar");
      if (navbar) {
        (navbar as HTMLElement).style.paddingRight = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const navbar = document.getElementById("main-navbar");
      if (navbar) {
        (navbar as HTMLElement).style.paddingRight = "";
      }
    };
  }, [isCartOpen, isWishlistOpen]);

  const removeItem = (id: number) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  const updateQty = (id: number, delta: number) =>
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  const removeFromWishlist = (id: number) =>
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  const moveToCartFromWishlist = (item: WishlistItem) => {
    if (!cartItems.find((ci) => ci.id === item.id)) {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 } as CartItem]);
    }
    removeFromWishlist(item.id);
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) console.log("Searching for:", searchQuery);
  };

  const navLinks = [
    { label: "Flavors", href: "/flavors" },
    { label: "Shop", href: "/productShop" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <>
      <div
        id="main-navbar"
        className={`w-full fixed top-0 z-40 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Announcement Bar - Shows ONLY at the very top */}
        <div
          className={`w-full bg-[#742709] text-[#FFFCF9] text-[10px] font-medium tracking-[0.35em] uppercase overflow-hidden relative select-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            showAnnouncement
              ? "py-3 max-h-20 opacity-100"
              : "py-0 max-h-0 opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#742709] via-[#8B3A1E] to-[#742709] pointer-events-none transform-gpu"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
          <div className="relative w-full z-10">
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
          className={`w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border-b ${
            isScrolled
              ? "bg-[#FCF6F2] backdrop-blur-2xl border-[#742709]/10 h-[72px] shadow-2xl shadow-[#742709]/10"
              : "bg-[#FCF6F2] border-transparent h-[84px]"
          }`}
        >
          <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <Link
                href="/"
                className="flex-shrink-0 transition-all duration-500 hover:opacity-80 hover:scale-[1.02] group"
              >
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
                    style={{
                      transitionDelay: isScrolled ? `${index * 30}ms` : "0ms",
                    }}
                  >
                    {link.label}
                    <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-[#742709] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* Right Icons */}
              <div className="hidden md:flex items-center gap-0.5">
                {/* Search */}
                <div ref={searchRef} className="flex items-center">
                  <div
                    style={{ width: isSearchOpen ? "240px" : "0px" }}
                    className="overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  >
                    <form
                      onSubmit={handleSearchSubmit}
                      className={`flex items-center border-b-2 transition-colors duration-500 mx-1 ${isSearchOpen ? "border-[#C9A961]" : "border-transparent"}`}
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-transparent text-[13px] text-[#1C1B1B] placeholder:text-[#1C1B1B]/40 outline-none py-2 pl-1 pr-2 tracking-wide"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="shrink-0 p-1 text-[#1C1B1B]/30 hover:text-[#742709] transition-colors duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-3.5 h-3.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </form>
                  </div>
                  <button
                    onClick={() => setIsSearchOpen((v) => !v)}
                    aria-label={isSearchOpen ? "Close search" : "Open search"}
                    className={`p-3 rounded-full transition-all duration-500 group hover:scale-110 active:scale-95 ${
                      isSearchOpen
                        ? "text-[#742709] bg-[#742709]/8"
                        : "text-[#1C1B1B] hover:text-[#742709] hover:bg-[#742709]/5"
                    }`}
                  >
                    <div className="relative w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.2}
                        stroke="currentColor"
                        className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isSearchOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isSearchOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Account Dropdown */}
                <div ref={accountRef} className="relative">
                  <button
                    onClick={() => setIsAccountOpen((v) => !v)}
                    aria-label="Account"
                    aria-expanded={isAccountOpen}
                    className={`p-3 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 ${
                      isAccountOpen
                        ? "text-[#742709] bg-[#742709]/8"
                        : "text-[#1C1B1B] hover:text-[#742709] hover:bg-[#742709]/5"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </button>

                  <div
                    className={`absolute right-0 top-[calc(100%+8px)] w-[220px] bg-[#FFFCF9] border border-[#742709]/8 shadow-[0_16px_48px_-8px_rgba(116,39,9,0.15)] transition-all duration-300 origin-top-right ${
                      isAccountOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="px-5 py-4 border-b border-[#742709]/6">
                      <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#742709]/60">
                        My Account
                      </p>
                      <p className="text-[12px] font-medium text-[#1C1B1B]/50 mt-0.5 tracking-wide">
                        Welcome to Alina
                      </p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/login"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3.5 px-5 py-3.5 group hover:bg-[#742709]/4 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#742709]/8 flex items-center justify-center shrink-0 group-hover:bg-[#742709]/15 transition-colors duration-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#742709"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#1C1B1B] tracking-wide group-hover:text-[#742709] transition-colors duration-200">
                            Sign In
                          </p>
                          <p className="text-[10px] text-[#1C1B1B]/40 tracking-wide">
                            Access your account
                          </p>
                        </div>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3.5 px-5 py-3.5 group hover:bg-[#742709]/4 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#742709]/8 flex items-center justify-center shrink-0 group-hover:bg-[#742709]/15 transition-colors duration-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#742709"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#1C1B1B] tracking-wide group-hover:text-[#742709] transition-colors duration-200">
                            Create Account
                          </p>
                          <p className="text-[10px] text-[#1C1B1B]/40 tracking-wide">
                            Join the Alina family
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="px-5 py-3 border-t border-[#742709]/6 bg-[#742709]/2">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#1C1B1B]/30 text-center">
                        Premium Members get exclusive benefits
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  aria-label={`Wishlist — ${totalWishlistItems} items`}
                  className="relative text-[#1C1B1B] hover:text-[#742709] transition-all duration-500 p-3 hover:bg-[#742709]/5 rounded-full group hover:scale-110 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform duration-500 group-hover:scale-110"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  {totalWishlistItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-[4px] shadow-lg shadow-[#742709]/30">
                      {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label={`Cart — ${totalItems} items`}
                  className="relative text-[#1C1B1B] hover:text-[#742709] transition-all duration-500 p-3 hover:bg-[#742709]/5 rounded-full group hover:scale-110 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform duration-500 group-hover:rotate-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-[4px] shadow-lg shadow-[#742709]/30">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Icons */}
              <div className="flex md:hidden items-center gap-0.5">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Search"
                  className="p-2.5 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  aria-label="Wishlist"
                  className="relative p-2.5 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  {totalWishlistItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none shadow-md">
                      {totalWishlistItems}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Cart"
                  className="relative p-2.5 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none shadow-md">
                      {totalItems}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                  className="p-2 text-[#1C1B1B] hover:text-[#742709] transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 9h16.5m-16.5 6.75h16.5"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isSearchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="border-t border-[#742709]/10 bg-[#FFFCF9] px-6 py-4">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center border-b-2 border-[#C9A961]"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-[13px] text-[#1C1B1B] placeholder:text-[#1C1B1B]/40 outline-none py-2 pr-2 tracking-wide"
                  autoFocus={isSearchOpen}
                />
                <button
                  type="submit"
                  className="p-1.5 text-[#1C1B1B] hover:text-[#742709] transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="bg-[#FFFCF9] border-t border-[#742709]/10 shadow-2xl">
              <div className="px-8 pt-6 pb-4 space-y-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between text-[11px] font-semibold tracking-[0.25em] text-[#1C1B1B] hover:text-[#742709] uppercase py-5 border-b border-[#742709]/5 transition-all duration-500 hover:pl-2"
                    style={{
                      animation: isMenuOpen
                        ? `slideInRight 0.5s cubic-bezier(0.25,1,0.5,1) forwards ${index * 60}ms`
                        : "none",
                      opacity: 0,
                    }}
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 opacity-30"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="px-8 py-5 border-t border-[#742709]/6 flex items-center gap-4">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center text-[11px] font-bold tracking-[0.2em] uppercase text-[#742709] border border-[#742709]/25 py-3 hover:bg-[#742709] hover:text-[#FFFCF9] transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center text-[11px] font-bold tracking-[0.2em] uppercase text-[#FFFCF9] bg-[#742709] py-3 hover:bg-[#5A1E07] transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => {
          setIsCartOpen(false);
          setIsWishlistOpen(false);
        }}
        className={`fixed inset-0 z-50 bg-[#1C1B1B]/40 backdrop-blur-sm transition-all duration-500 will-change-all ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isCartOpen || isWishlistOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        aria-hidden="true"
      />

      {/* CART DRAWER */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-[440px] bg-[#FFFCF9] flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.1)] transition-all duration-500 will-change-transform ease-[cubic-bezier(0.25,1,0.5,1)] ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#742709]/10 bg-gradient-to-r from-[#FFFCF9] to-[#F9F6F4]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] text-[#742709] uppercase mb-1">
              Your Selection
            </p>
            <h2 className="text-[20px] font-semibold text-[#1C1B1B] tracking-tight">
              Shopping Cart
              {totalItems > 0 && (
                <span className="ml-2.5 text-[13px] font-normal text-[#742709]/60">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-3 rounded-full text-[#1C1B1B]/40 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-500 hover:rotate-90"
          >
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
              <button onClick={() => setIsCartOpen(false)} className="mt-4 text-[11px] font-bold tracking-[0.25em] uppercase text-[#742709] border border-[#742709]/30 px-8 py-3.5 hover:bg-[#742709] hover:text-[#FFFCF9] hover:shadow-xl hover:shadow-[#742709]/20 transition-all duration-500 hover:-translate-y-0.5">
                Explore Flavors
              </button>
            </div>
          ) : (
            <ul className="space-y-0">
              {cartItems.map((item, index) => (
                <li key={item.id} className="py-6 first:pt-0 last:pb-0 border-b border-[#742709]/8 last:border-0" style={{ animation: isCartOpen ? `slideInRight 0.4s ease forwards ${index * 40}ms` : "none" }}>
                  <div className="flex items-start gap-5 group">
                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-[#F5EDE8] to-[#EDE4DE] rounded-sm overflow-hidden relative">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-bold tracking-[0.2em] text-[#742709]/30 uppercase">Alina</span>
                        </div>
                      )}
                      <div className="absolute inset-0 border border-[#742709]/5 group-hover:border-[#742709]/20 transition-colors duration-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <p className="text-[14px] font-semibold text-[#1C1B1B] leading-tight group-hover:text-[#742709] transition-colors duration-300">{item.name}</p>
                          <p className="text-[11px] text-[#1C1B1B]/50 mt-1 tracking-wide">{item.flavor}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 -mr-2 text-[#1C1B1B]/25 hover:text-[#C43B3B] hover:bg-[#C43B3B]/5 rounded-full transition-all duration-500 hover:rotate-90">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#742709]/15 rounded-sm overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} className="w-9 h-9 flex items-center justify-center text-[#1C1B1B]/50 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-300 text-lg leading-none font-light">−</button>
                          <span className="w-10 h-9 flex items-center justify-center text-[12px] font-semibold text-[#1C1B1B] bg-[#F9F6F4]">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-9 h-9 flex items-center justify-center text-[#1C1B1B]/50 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-300 text-base leading-none">+</button>
                        </div>
                        <p className="text-[14px] font-bold text-[#742709]">${(item.price * item.quantity).toLocaleString("en-BD")}</p>
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
              <span className="text-[20px] font-bold text-[#1C1B1B]">${subtotal.toLocaleString("en-BD")}</span>
            </div>
            <p className="text-[11px] text-[#1C1B1B]/40 text-center leading-relaxed">Shipping & taxes calculated at checkout</p>
            <div className="space-y-3">
              <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full text-center bg-[#742709] text-[#FFFCF9] text-[11px] font-bold tracking-[0.28em] uppercase py-4 hover:bg-[#5A1E07] hover:shadow-2xl hover:shadow-[#742709]/30 transition-all duration-500 relative overflow-hidden group hover:-translate-y-0.5">
                <span className="relative z-10">Checkout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
              <Link href="/productShop" onClick={() => setIsCartOpen(false)} className="block w-full text-center border border-[#742709]/25 text-[#742709] text-[11px] font-bold tracking-[0.28em] uppercase py-4 hover:border-[#742709] hover:bg-[#742709]/5 transition-all duration-500 hover:-translate-y-0.5">
                Continue Shopping
              </Link>
            </div>
          </div>
          
        )}
      </aside>

      {/* WISHLIST DRAWER */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-[440px] bg-[#FFFCF9] flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.1)] transition-all duration-500 will-change-transform ease-[cubic-bezier(0.25,1,0.5,1)] ${isWishlistOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#742709]/10 bg-gradient-to-r from-[#FFFCF9] to-[#F9F6F4]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] text-[#742709] uppercase mb-1">Saved for Later</p>
            <h2 className="text-[20px] font-semibold text-[#1C1B1B] tracking-tight">
              My Wishlist
              {totalWishlistItems > 0 && (
                <span className="ml-2.5 text-[13px] font-normal text-[#742709]/60">({totalWishlistItems} {totalWishlistItems === 1 ? "item" : "items"})</span>
              )}
            </h2>
          </div>
          <button onClick={() => setIsWishlistOpen(false)} className="p-3 rounded-full text-[#1C1B1B]/40 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-500 hover:rotate-90">
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
              <button onClick={() => setIsWishlistOpen(false)} className="mt-4 text-[11px] font-bold tracking-[0.25em] uppercase text-[#742709] border border-[#742709]/30 px-8 py-3.5 hover:bg-[#742709] hover:text-[#FFFCF9] hover:shadow-xl hover:shadow-[#742709]/20 transition-all duration-500 hover:-translate-y-0.5">
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="space-y-0">
              {wishlistItems.map((item, index) => (
                <li key={item.id} className="py-6 first:pt-0 last:pb-0 border-b border-[#742709]/8 last:border-0" style={{ animation: isWishlistOpen ? `slideInRight 0.4s ease forwards ${index * 40}ms` : "none" }}>
                  <div className="flex items-start gap-5 group">
                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-[#F5EDE8] to-[#EDE4DE] rounded-sm overflow-hidden relative">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-bold tracking-[0.2em] text-[#742709]/30 uppercase">Alina</span>
                        </div>
                      )}
                      <div className="absolute inset-0 border border-[#742709]/5 group-hover:border-[#742709]/20 transition-colors duration-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <p className="text-[14px] font-semibold text-[#1C1B1B] leading-tight group-hover:text-[#742709] transition-colors duration-300">{item.name}</p>
                          <p className="text-[11px] text-[#1C1B1B]/50 mt-1 tracking-wide">{item.flavor}</p>
                        </div>
                        <button onClick={() => removeFromWishlist(item.id)} className="p-2 -mr-2 text-[#1C1B1B]/25 hover:text-[#C43B3B] hover:bg-[#C43B3B]/5 rounded-full transition-all duration-500 hover:rotate-90">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-[14px] font-bold text-[#742709]">${item.price.toLocaleString("en-BD")}</p>
                        <button onClick={() => moveToCartFromWishlist(item)} className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#742709] hover:text-[#5A1E07] transition-colors duration-300 flex items-center gap-1 group/btn">
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
            <Link href="/productShop" onClick={() => setIsWishlistOpen(false)} className="block w-full text-center border border-[#742709]/25 text-[#742709] text-[11px] font-bold tracking-[0.28em] uppercase py-4 hover:border-[#742709] hover:bg-[#742709]/5 transition-all duration-500">
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow { animation: bounceSlow 3s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(116, 39, 9, 0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(116, 39, 9, 0.3); }
      `}</style>
    </>
  );
};

export default Navbar;