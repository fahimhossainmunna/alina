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

// ───── Demo cart data (Redux দিয়ে replace করবে পরে) ─────
const DEMO_CART: CartItem[] = [
  { id: 1, name: 'Alina Classic', flavor: 'Rose & Saffron', price: 1200, quantity: 2, image: '/images/product1.jpg' },
  { id: 2, name: 'Alina Noir', flavor: 'Dark Truffle', price: 1500, quantity: 1, image: '/images/product2.jpg' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(DEMO_CART);
  const overlayRef = useRef<HTMLDivElement>(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart খোলা/বন্ধ হলে body scroll বন্ধ করা
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const removeItem = (id: number) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCartItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0)
    );

  const navLinks = [
    { label: 'Flavors', href: '/flavors' },
    { label: 'Store', href: '/store' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════
          MAIN NAVBAR
      ══════════════════════════════════════════ */}
      <div className="w-full fixed top-0 z-40 transition-all duration-300">
        {/* Announcement Bar */}
        <div className="w-full bg-[#742709] text-[#FFFCF9] text-[10px] font-medium tracking-[0.3em] uppercase py-2.5 text-center px-4">
          Free shipping on all premium collections&nbsp;·&nbsp;Experience Alina
        </div>

        {/* Main Nav */}
        <nav
          className={`w-full transition-all duration-500 border-b ${
            isScrolled
              ? 'bg-[#FFFCF9]/90 backdrop-blur-xl border-[#742709]/10 h-[68px]'
              : 'bg-[#FFFCF9] border-transparent h-[80px]'
          }`}
        >
          <div className="max-w-7xl mx-auto h-full px-5 sm:px-8">
            <div className="flex items-center justify-between h-full">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0 transition-opacity duration-200 hover:opacity-80">
                <Image
                  src="/images/alinaLogoo.png"
                  alt="Alina"
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative group text-[11px] font-semibold tracking-[0.22em] text-[#1C1B1B] hover:text-[#742709] uppercase transition-colors duration-300"
                  >
                    {link.label}
                    <span className="absolute -bottom-[5px] left-0 h-[1px] w-0 bg-[#742709] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* Right Icons */}
              <div className="hidden md:flex items-center gap-1">
                {/* Search */}
                <IconBtn aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-[19px] h-[19px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
                  </svg>
                </IconBtn>

                {/* Account */}
                <IconBtn aria-label="Account">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-[19px] h-[19px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </IconBtn>

                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label={`Cart — ${totalItems} items`}
                  className="relative text-[#1C1B1B] hover:text-[#742709] transition-colors duration-300 p-2.5 hover:bg-[#742709]/5 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-[19px] h-[19px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>

                  {/* Badge */}
                  {totalItems > 0 && (
                    <span className="absolute top-[6px] right-[6px] bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-[3px] shadow-sm leading-none">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile: Cart + Hamburger */}
              <div className="flex md:hidden items-center gap-1">
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Cart"
                  className="relative p-2.5 text-[#1C1B1B] hover:text-[#742709]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute top-[6px] right-[6px] bg-[#742709] text-[#FFFCF9] text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center leading-none">
                      {totalItems}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                  className="p-2 text-[#1C1B1B]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {isMenuOpen
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    }
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#FFFCF9] border-t border-[#742709]/8">
              <div className="px-6 pt-4 pb-8 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between text-[11px] font-semibold tracking-[0.22em] text-[#1C1B1B] hover:text-[#742709] uppercase py-4 border-b border-gray-100 transition-colors"
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 opacity-40">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* ══════════════════════════════════════════
          CART SIDEBAR OVERLAY + DRAWER
      ══════════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 z-50 bg-[#1C1B1B]/40 backdrop-blur-[2px] transition-opacity duration-400 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-[420px] bg-[#FFFCF9] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[#742709]/8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#742709] uppercase mb-0.5">Your Selection</p>
            <h2 className="text-[18px] font-semibold text-[#1C1B1B] tracking-tight">
              Shopping Cart
              {totalItems > 0 && (
                <span className="ml-2 text-[12px] font-normal text-[#742709]/60">({totalItems} items)</span>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-2.5 rounded-full text-[#1C1B1B]/50 hover:text-[#742709] hover:bg-[#742709]/5 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4 px-7">
          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full text-center gap-5 pb-16">
              <div className="w-20 h-20 rounded-full bg-[#742709]/6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#742709" className="w-9 h-9 opacity-60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-medium text-[#1C1B1B] mb-1.5">Your cart is empty</p>
                <p className="text-[13px] text-[#1C1B1B]/45 leading-relaxed">Discover our premium<br />chocolate collections</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#742709] border border-[#742709]/30 px-7 py-3 hover:bg-[#742709] hover:text-[#FFFCF9] transition-all duration-300"
              >
                Explore Flavors
              </button>
            </div>
          ) : (
            <ul className="space-y-0 divide-y divide-[#742709]/6">
              {cartItems.map((item) => (
                <li key={item.id} className="py-5 flex items-start gap-4">
                  {/* Product Image Placeholder */}
                  <div className="w-[72px] h-[72px] flex-shrink-0 bg-[#742709]/8 rounded-sm overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-[#742709]/30 text-[10px] font-medium tracking-wider uppercase">
                      Alina
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-semibold text-[#1C1B1B] leading-snug">{item.name}</p>
                        <p className="text-[11px] text-[#1C1B1B]/45 mt-0.5 tracking-wide">{item.flavor}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="p-1 text-[#1C1B1B]/25 hover:text-[#742709] transition-colors shrink-0 mt-0.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty Controls */}
                      <div className="flex items-center gap-0 border border-[#742709]/15">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-[#1C1B1B]/50 hover:text-[#742709] hover:bg-[#742709]/5 transition-colors text-base leading-none"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-[12px] font-semibold text-[#1C1B1B] border-x border-[#742709]/15">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-[#1C1B1B]/50 hover:text-[#742709] hover:bg-[#742709]/5 transition-colors text-base leading-none"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-[13px] font-semibold text-[#742709]">
                        ৳{(item.price * item.quantity).toLocaleString('en-BD')}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#742709]/8 px-7 py-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-[#1C1B1B]/50">Subtotal</span>
              <span className="text-[17px] font-semibold text-[#1C1B1B]">
                ৳{subtotal.toLocaleString('en-BD')}
              </span>
            </div>

            <p className="text-[11px] text-[#1C1B1B]/35 text-center">
              Shipping & taxes calculated at checkout
            </p>

            {/* CTA Buttons */}
            <div className="space-y-2.5">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full text-center bg-[#742709] text-[#FFFCF9] text-[11px] font-semibold tracking-[0.25em] uppercase py-4 hover:bg-[#5a1e07] transition-colors duration-300"
              >
                Checkout
              </Link>
              <Link
                href="/store"
                onClick={() => setIsCartOpen(false)}
                className="block w-full text-center border border-[#742709]/25 text-[#742709] text-[11px] font-semibold tracking-[0.25em] uppercase py-3.5 hover:border-[#742709] hover:bg-[#742709]/4 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

// ── Helper: Icon Button ──
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
    className="text-[#1C1B1B] hover:text-[#742709] transition-colors duration-300 p-2.5 hover:bg-[#742709]/5 rounded-full"
  >
    {children}
  </button>
);