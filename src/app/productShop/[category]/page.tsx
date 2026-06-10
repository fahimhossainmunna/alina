"use client";

import { useBrandProducts } from "@/hooks/useBrandProducts";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";

export default function CategoryProductsDirectPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categorySlug = params.category as string;

  // 🎯 URL Query Parameter (?brand=...) থেকে সিলেক্টেড ব্র্যান্ড রিড করা হচ্ছে
  const selectedBrandSlug = searchParams.get("brand") || undefined;
  const activeFilter = searchParams.get("filter") || "All";

  // কাস্টম হুক থেকে ডাটা ফেচিং
  const { products, loading } = useBrandProducts(
    categorySlug,
    selectedBrandSlug,
  );

  // 🔍 Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isBrowsingSubProducts = selectedBrandSlug !== undefined;

  // ── 🎯 ডাইনামিক এবং প্রফেশনাল হেডার টাইটেল মেকানিজম ──
  let displayTitle = categorySlug
    ? categorySlug
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
    : "Collection";

  if (isBrowsingSubProducts && products.length > 0 && products[0]?.brand) {
    displayTitle = products[0].brand;
  }

  // ফিল্টার লজিক
  const uniqueFilters = useMemo(() => {
    const tags = Array.from(new Set(products.map((p: any) => p.tag).filter(Boolean)));
    return ["All", ...tags];
  }, [products]);

  // 🔍 Search + Filter combined
  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeFilter !== "All") {
      result = result.filter((p: any) => p.tag === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [products, activeFilter, searchQuery]);

  // ইউআরএল কুয়েরি প্যারামিটার আপডেট করার জন্য হেল্পার ফাংশন
  const updateQueries = (brand: string | undefined, filter: string) => {
    let url = `/productShop/${categorySlug}`;
    const queryParts = [];
    if (brand) queryParts.push(`brand=${brand}`);
    if (filter !== "All") queryParts.push(`filter=${filter}`);

    if (queryParts.length > 0) {
      url += `?${queryParts.join("&")}`;
    }
    router.push(url);
  };

  return (
    <main className="w-full min-h-screen bg-[#FAFAF8] text-[#1A1A1A] pt-32 pb-24 font-sans selection:bg-[#742709] selection:text-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* 🔙 BACK CONTROL */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            if (selectedBrandSlug) {
              updateQueries(undefined, "All");
            } else {
              router.push("/productShop");
            }
          }}
          className="group inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#742709] mb-10 cursor-pointer focus:outline-none hover:gap-3.5 transition-all duration-300"
        >
          <div className="w-7 h-7 rounded-[5px] bg-[#742709]/5 flex items-center justify-center group-hover:bg-[#742709] group-hover:text-white transition-all duration-300">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          {selectedBrandSlug ? "Back to Brands" : "Back to Shop"}
        </motion.button>

        {/* 📜 HEADER PANEL — Premium */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#742709]/30" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#742709]/70">
              Atelier Studio
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-tight leading-tight">
            {displayTitle}{" "}
            <span className="font-normal text-[#742709] italic">
              {isBrowsingSubProducts ? "Collection" : "Houses"}
            </span>
          </h2>
          <p className="text-[13px] text-[#1A1A1A]/40 mt-2 font-light max-w-md">
            {isBrowsingSubProducts
              ? "Curated pieces from our exclusive collection"
              : "Explore our curated selection of premium brands"}
          </p>
        </motion.div>

        {/* ── 🔍 PREMIUM SEARCH BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10"
        >
          <div
            className={`relative flex items-center bg-white border rounded-[5px] transition-all duration-300 ${
              isSearchFocused
                ? "border-[#742709]/40 shadow-[0_4px_20px_rgba(116,39,9,0.06)]"
                : "border-[#1A1A1A]/8 shadow-none"
            }`}
          >
            <Search
              className={`w-4 h-4 ml-4 transition-colors duration-300 ${
                isSearchFocused ? "text-[#742709]" : "text-[#1A1A1A]/30"
              }`}
            />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-transparent px-3 py-3.5 text-[13px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none tracking-wide"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-3 p-1 rounded-[5px] hover:bg-[#742709]/5 text-[#1A1A1A]/30 hover:text-[#742709] transition-all duration-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1.5 mr-4 px-2.5 py-1 bg-[#1A1A1A]/[0.03] rounded-[5px] border border-[#1A1A1A]/5">
              <kbd className="text-[9px] font-mono font-semibold text-[#1A1A1A]/40">⌘</kbd>
              <kbd className="text-[9px] font-mono font-semibold text-[#1A1A1A]/40">K</kbd>
            </div>
          </div>
        </motion.div>

        {/* ── 🛒 MAIN WORKSPACE ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* 🎛️ SIDEBAR FILTER BAR — Premium */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-full lg:w-[240px] bg-white border border-[#1A1A1A]/5 rounded-[5px] p-5 shrink-0 lg:sticky lg:top-36 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#1A1A1A]/5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#742709]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A]/70">
                Filters
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/30 mb-3">
                  Categories
                </h4>
                <div className="flex flex-col gap-1">
                  {uniqueFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => updateQueries(selectedBrandSlug, filter)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-[5px] text-[12px] tracking-wide transition-all duration-200 cursor-pointer ${
                        activeFilter === filter
                          ? "bg-[#742709] text-white font-medium shadow-sm"
                          : "hover:bg-[#742709]/[0.04] text-[#1A1A1A]/60 hover:text-[#1A1A1A]/80"
                      }`}
                    >
                      <span>{filter}</span>
                      {activeFilter === filter && (
                        <Check className="w-3 h-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A]/5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#1A1A1A]/35 font-light">
                    Showing
                  </span>
                  <span className="text-[11px] font-semibold text-[#742709] bg-[#742709]/5 px-2 py-0.5 rounded-[5px]">
                    {filteredProducts.length} items
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* 📦 COMPACT CARDS GRID — Professional */}
          <div className="flex-1 w-full">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-3">
                    <div className="aspect-[3/4] bg-[#1A1A1A]/[0.04] rounded-[5px]" />
                    <div className="space-y-2 px-1">
                      <div className="h-2.5 w-12 bg-[#1A1A1A]/[0.04] rounded-[5px]" />
                      <div className="h-3 w-3/4 bg-[#1A1A1A]/[0.04] rounded-[5px]" />
                      <div className="h-2.5 w-1/2 bg-[#1A1A1A]/[0.04] rounded-[5px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center border border-dashed border-[#1A1A1A]/8 rounded-[5px] bg-white/50"
              >
                <Search className="w-8 h-8 text-[#1A1A1A]/10 mx-auto mb-4" />
                <p className="text-[13px] text-[#1A1A1A]/40 font-light">
                  {searchQuery
                    ? "No results match your search"
                    : "No items found in this collection"}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-[11px] font-semibold text-[#742709] hover:underline cursor-pointer"
                  >
                    Clear search
                  </button>
                )}
              </motion.div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  isBrowsingSubProducts
                    ? "md:grid-cols-3 xl:grid-cols-4"
                    : "md:grid-cols-3 xl:grid-cols-4"
                } gap-x-4 gap-y-8`}
              >
                <AnimatePresence>
                  {filteredProducts.map((product: any, index: number) => (
                    <motion.article
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      onClick={() => {
                        if (product.isBrandOption) {
                          updateQueries(product.slug, "All");
                        } else {
                          router.push(
                            `/productShop/${categorySlug}/product/${product.id}`,
                          );
                        }
                      }}
                      className={`flex flex-col relative ${
                        product.isBrandOption
                          ? "cursor-pointer group"
                          : "cursor-pointer group"
                      }`}
                    >
                      {/* 📸 IMAGE LAYERS — Professional */}
                      <div className="relative aspect-[3/4] rounded-[5px] overflow-hidden bg-[#F5F3F0] border border-[#1A1A1A]/[0.04] mb-3 transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] group-hover:border-[#742709]/10">
                        {product.hoverImage &&
                        product.hoverImage !== product.defaultImage ? (
                          <>
                            <Image
                              src={product.defaultImage}
                              alt={product.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                              priority={index < 4}
                            />
                            <Image
                              src={product.hoverImage}
                              alt={`${product.name} Hover View`}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-[1.03] scale-100"
                            />
                          </>
                        ) : (
                          <Image
                            src={product.defaultImage}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            priority={index < 4}
                          />
                        )}

                        {/* Floating Badge */}
                        {product.tag && (
                          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-[5px] border border-[#1A1A1A]/5 z-10">
                            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#742709]">
                              {product.tag}
                            </span>
                          </div>
                        )}

                        {/* Quick View Overlay */}
                        {product.isBrandOption && (
                          <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/5 transition-all duration-300 flex items-center justify-center z-10">
                            <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-[5px] border border-[#1A1A1A]/5 shadow-sm">
                              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A]/70">
                                View Collection
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Add to Bag Button Layer */}
                        {!product.isBrandOption && (
                          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/50 via-black/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                            <button className="w-full bg-white text-[#1A1A1A] text-[9px] font-bold uppercase tracking-[0.15em] py-2.5 rounded-[5px] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#742709] hover:text-white transition-all duration-200">
                              <ShoppingBag className="w-3 h-3" /> Add to Bag
                            </button>
                          </div>
                        )}
                      </div>

                      {/* 📝 INFO BLOCK — Clean */}
                      <div className="flex flex-col px-0.5 space-y-1">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#742709]/50">
                          {product.brand}
                        </p>
                        <h3 className="font-serif text-[13px] sm:text-sm font-normal tracking-tight leading-snug text-[#1A1A1A] group-hover:text-[#742709] transition-colors duration-200 line-clamp-1">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-semibold text-[#1A1A1A]/50">
                              {product.rating?.toFixed(1) ?? "0.0"}
                            </span>
                          </div>
                          {product.price > 0 && (
                            <span className="text-[12px] font-bold text-[#1A1A1A]/80">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}