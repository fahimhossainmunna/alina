"use client";

import { useBrandProducts } from "@/hooks/useBrandProducts";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Sparkles, Star, SlidersHorizontal, Check } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function CategoryProductsDirectPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categorySlug = params.category as string;
  
  // 🎯 লোকাল স্টেট ফেলে দিয়ে সরাসরি URL Query Parameter (?brand=...) থেকে রিড করা হচ্ছে
  const selectedBrandSlug = searchParams.get("brand") || undefined;
  const activeFilter = searchParams.get("filter") || "All";

  // কাস্টম হুক এখন রিফ্রেশ দিলেও ইউআরএল থেকে ডাইরেক্ট ডাটা নিয়ে আসবে
  const { products, loading } = useBrandProducts(categorySlug, selectedBrandSlug);

  const isBrowsingSubProducts = selectedBrandSlug !== undefined;

  const displayTitle = categorySlug
    ? categorySlug.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
    : "Collection";

  // ফিল্টার লজিক
  const uniqueFilters = ["All", ...Array.from(new Set(products.map((p: any) => p.tag)))];
  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter((p: any) => p.tag === activeFilter);

  // 🎯 ইউআরএল কুয়েরি প্যারামিটার আপডেট করার জন্য হেল্পার ফাংশন
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
    <main className="w-full min-h-screen bg-[#FFFCF9] text-[#1C1B1B] pt-36 pb-24 font-sans selection:bg-[#742709] selection:text-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        
        {/* 🔙 BACK CONTROL (URL ড্রিভেন ব্যাক কন্ট্রোল) */}
        <button
          onClick={() => {
            if (selectedBrandSlug) {
              updateQueries(undefined, "All"); // সাব-প্রোডাক্ট থেকে ব্যাক করে ব্র্যান্ড হাউজে ফিরবে
            } else {
              router.push("/productShop");
            }
          }}
          className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#742709] mb-8 cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          {selectedBrandSlug ? "Back to Brands" : "Back to Shop"}
        </button>

        {/* 📜 HEADER PANEL */}
        <div className="mb-12 space-y-1">
          <div className="flex items-center gap-2 text-[#742709]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Atelier Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight">
            {displayTitle} <span className="font-normal text-[#742709] italic">{isBrowsingSubProducts ? "Products" : "Houses"}</span>
          </h2>
        </div>

        {/* ── 🛒 MAIN WORKSPACE ── */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* 🎛️ SIDEBAR FILTER BAR */}
          <aside className="w-full lg:w-[260px] bg-white border border-[#742709]/10 rounded-[24px] p-6 shrink-0 lg:sticky lg:top-40 shadow-[0_10px_30px_rgba(116,39,9,0.02)]">
            <div className="flex items-center gap-2 border-b border-[#742709]/5 pb-4 mb-6">
              <SlidersHorizontal className="w-4 h-4 text-[#742709]" />
              <span className="text-xs font-bold uppercase tracking-wider">Filter System</span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1C1B1B]/40 mb-3">Sort Content</h4>
                <div className="flex flex-col gap-1.5">
                  {uniqueFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => updateQueries(selectedBrandSlug, filter)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs tracking-wide transition-all ${
                        activeFilter === filter 
                          ? 'bg-[#742709] text-white font-medium' 
                          : 'hover:bg-[#742709]/5 text-[#1C1B1B]/70'
                      }`}
                    >
                      {filter}
                      {activeFilter === filter && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#742709]/5 text-[11px] text-[#1C1B1B]/40 font-light">
                Active Feed Count: {filteredProducts.length} items
              </div>
            </div>
          </aside>

          {/* 📦 COMPACT CARDS GRID */}
          <div className="flex-1 w-full">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-4"><div className="aspect-[4/5] bg-[#742709]/5 rounded-[24px]" /></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#742709]/10 rounded-[24px]">
                <p className="text-xs text-[#1C1B1B]/40 font-light">No items found in this line.</p>
              </div>
            ) : (
              <div className={`grid grid-cols-2 ${isBrowsingSubProducts ? 'md:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-3'} gap-x-5 gap-y-10`}>
                {filteredProducts.map((product: any, index: number) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    onClick={() => {
                      if (product.isBrandOption) {
                        // 🎯 মেইন কাভার কার্ডে ক্লিক করলে ইউআরএল-এ ?brand=slug যুক্ত হবে
                        updateQueries(product.slug, "All");
                      }
                    }}
                    className="group flex flex-col relative cursor-pointer"
                  >
                    {/* 📸 IMAGE LAYERS (SMART MULTI-HOVER SWAP) */}
                    <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#FCF6F2] border border-[#742709]/5 mb-3 transition-all duration-500 group-hover:shadow-[0_15px_30px_rgba(116,39,9,0.06)]">
                      
                      {product.hoverImage && product.hoverImage !== product.defaultImage ? (
                        <>
                          <Image
                            src={product.defaultImage}
                            alt={product.name}
                            fill
                            sizes="(max-w-1200px) 50vw, 25vw"
                            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                            priority
                          />
                          <Image
                            src={product.hoverImage}
                            alt="Hover View"
                            fill
                            sizes="(max-w-1200px) 50vw, 25vw"
                            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-100 group-hover:scale-[1.02]"
                          />
                        </>
                      ) : (
                        <Image
                          src={product.defaultImage}
                          alt={product.name}
                          fill
                          sizes="(max-w-1200px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          priority
                        />
                      )}

                      {/* Floating Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full border border-[#742709]/5 z-10">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#742709]">{product.tag}</span>
                      </div>

                      {/* Add to Bag Button Layer */}
                      {!product.isBrandOption && (
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                          <button className="w-full bg-[#742709] text-white text-[9px] font-bold uppercase tracking-widest py-2 rounded-xl flex items-center justify-center gap-1">
                            <ShoppingBag className="w-3 h-3" /> Add To Bag
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 📝 INFO BLOCK */}
                    <div className="flex flex-col px-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#742709]/60">{product.brand}</p>
                      <h3 className="font-serif text-sm sm:text-base font-light tracking-tight mt-0.5 leading-tight text-[#1C1B1B] group-hover:text-[#742709] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#742709]/5">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="text-[10px] font-bold text-[#1C1B1B]/60">{product.rating.toFixed(1)}</span>
                        </div>
                        {product.price > 0 && (
                          <span className="font-sans text-xs font-semibold text-[#742709]">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}