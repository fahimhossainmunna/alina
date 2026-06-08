"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

// Product data
const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "Velvet Citrus Essence",
    category: "Ritual / Glow",
    price: "$85.00",
    description:
      "A luxurious blend of citrus extracts and botanical oils for radiant, youthful skin.",
    src: "/images/product/productOne.png",
  },
  {
    id: 2,
    name: "Earth Noir Treatment",
    category: "Botanical / Serum",
    price: "$92.00",
    description:
      "Deep nourishing serum with rare botanical extracts for intense hydration and repair.",
    src: "/images/product/productTwo.png",
  },
  {
    id: 3,
    name: "Saffron Youth Infusion",
    category: "Luxury / Cream",
    price: "$120.00",
    description:
      "Premium anti-aging cream infused with saffron and gold particles for timeless beauty.",
    src: "/images/product/productThree.png",
  },
];

export const ProductShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse tracking - DISCOVER button follows cursor
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#FFFCF9] via-[#FCF6F2] to-[#FFFCF9] py-32 px-6 sm:px-8 lg:px-12 overflow-hidden select-none relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#742709]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C9A961]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        {/* ──  PREMIUM SECTION HEADER ── */}
        <div className="text-center mb-24 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#742709]/5 border border-[#742709]/10 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#742709] animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#742709] uppercase">
              The Curation
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1B1B] tracking-tight uppercase mb-6 leading-tight">
            Premium{" "}
            <span className="font-normal text-[#742709]">Essentials</span>
          </h2>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#742709]/40 to-transparent mx-auto mb-6" />

          <p className="font-sans text-[14px] sm:text-[15px] text-[#1C1B1B]/60 leading-relaxed max-w-xl mx-auto">
            Discover our handpicked selection of luxury skincare and beauty
            essentials
          </p>
        </div>

        {/* ── 🛍️ PRODUCT CARDS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full mb-20">
          {STATIC_PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              className="group cursor-pointer relative flex flex-col"
            >
              {/* Product Image Frame */}
              <div className="relative w-full aspect-[3/4] rounded-2xl bg-[#FAF7F2] border border-[#742709]/5 overflow-hidden shadow-[0_8px_30px_rgba(116,39,9,0.06)] transition-all duration-700 group-hover:shadow-[0_25px_60px_rgba(116,39,9,0.15)]">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  priority={index < 3}
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 🛒 ADD TO CART BUTTON OVERLAY (Slides up beautifully from the bottom on hover) */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/40 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-center z-20">
                  <button 
                    
                    className="w-full bg-white/95 backdrop-blur-md border border-[#18181a]/10 py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 text-[11px] font-sans font-bold text-[#ffffff] tracking-widest uppercase hover:bg-[#fefeff] hover:text-white active:scale-98 transition-all duration-300 shadow-md cursor-pointe premium-btn"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                    <span>Add To Cart</span>
                  </button>
                </div>

                {/* 🎯 MOUSE-FOLLOWING DISCOVER BUTTON */}
                {hoveredCard === index && (
                  <div
                    className="absolute z-10 pointer-events-none transition-all duration-150 ease-out"
                    style={{
                      left: `${mousePos.x}px`,
                      top: `${mousePos.y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="bg-[#1C1B1B] text-[#FFFCF9] px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl border border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        Discover
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>

              {/* Product Meta Details */}
              <div className="mt-6 flex flex-col items-start px-1">
                <span className="text-[9px] font-sans font-bold text-[#742709]/50 tracking-[0.25em] uppercase mb-2">
                  {product.category}
                </span>
                <div className="w-full flex justify-between items-baseline gap-4 mb-3">
                  <h3 className="font-serif text-lg text-[#1C1B1B] font-normal tracking-wide group-hover:text-[#742709] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <span className="font-sans text-[14px] font-semibold text-[#742709]">
                    {product.price}
                  </span>
                </div>

                {/* Product Description */}
                <p className="text-[12px] sm:text-[13px] text-[#1C1B1B]/60 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ──  VIEW ALL PRODUCTS BUTTON ── */}
        <div className="mt-8">
          <button className="premium-btn">
            <span>VIEW ALL PRODUCTS</span>
            <span>SHOP NOW</span>
          </button>
        </div>
      </div>

      {/* ── 🎨 PREMIUM SKEW-Y BUTTON ANIMATION ── */}
      <style jsx global>{`
        .premium-btn {
          position: relative;
          overflow: hidden;
          border: 1.5px solid #18181a;
          color: #18181a;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: "Inter", sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.35em;
          padding: 22px 48px 21px;
          text-decoration: none;
          cursor: pointer;
          background: transparent;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          transition: all 400ms cubic-bezier(0.48, 0, 0.12, 1);
          text-transform: uppercase;
        }

        .premium-btn span:first-child {
          position: relative;
          transition: color 400ms cubic-bezier(0.48, 0, 0.12, 1);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .premium-btn span:last-child {
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
          position: absolute;
          bottom: 0;
          transition: all 400ms cubic-bezier(0.48, 0, 0.12, 1);
          z-index: 100;
          opacity: 0;
          top: 50%;
          left: 50%;
          transform: translateY(200%) translateX(-50%);
          white-space: nowrap;
        }

        .premium-btn:after {
          content: "";
          position: absolute;
          bottom: -50%;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #030303;
          transform-origin: bottom center;
          transition: transform 400ms cubic-bezier(0.48, 0, 0.12, 1);
          transform: skewY(-6deg) scaleY(0);
          z-index: 50;
        }

        .premium-btn:hover {
          border-color: #ceeaeb;
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(116, 39, 9, 0.2);
        }

        .premium-btn:hover span:first-child {
          color: transparent;
        }

        .premium-btn:hover:after {
          transform-origin: bottom center;
          transform: skewY(-6deg) scaleY(2.2);
        }

        .premium-btn:hover span:last-child {
          transform: translateX(-50%) translateY(-50%);
          opacity: 1;
          transition: all 400ms cubic-bezier(0.48, 0, 0.12, 1);
        }

        .premium-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default ProductShowcase;