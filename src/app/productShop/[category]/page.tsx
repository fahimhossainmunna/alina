"use client";

import { useBrandProducts } from "@/hooks/useBrandProducts"; // ✅ আলাদা করা ফ্রেশ হুক ইম্পোর্ট
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function BrandProductsPage() {
  const params = useParams();
  const router = useRouter();

  const categorySlug = params.category as string;

  // ✅ এপিআই হুক আলাদা ফাইলে চলে গেছে, এখানে শুধু ক্যাটাগরি স্লাগ পাস হচ্ছে
  const { products, loading } = useBrandProducts(categorySlug);

  const brandDisplayName = categorySlug
    ? categorySlug
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
    : "Collection";

  return (
    <main className="w-full min-h-screen bg-[#FFFCF9] text-[#1C1B1B] px-6 sm:px-12 lg:px-24 pt-40 pb-24 font-sans selection:bg-[#742709] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* 🔙 BACK TO BRANDS LIST */}
        <button
          onClick={() => router.push(`/productShop`)}
          className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#742709] mb-12 cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </button>

        {/* 📜 EDITORIAL BANNER */}
        <div className="mb-20 space-y-2">
          <div className="flex items-center gap-2 text-[#742709]">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
              Atelier Apothecary
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight">
            {brandDisplayName}{" "}
            <span className="font-normal text-[#742709] italic">
              Formulations
            </span>
          </h2>
        </div>

        {/* 💎 EXACT 2 PRODUCTS GRID WITH INTERACTIVE SWAP */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-5">
                <div className="aspect-[3/4] bg-[#742709]/5 rounded-[32px]" />
                <div className="h-6 bg-[#742709]/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#742709]/10 rounded-[24px]">
            <p className="text-sm text-[#1C1B1B]/40 font-light">
              No products found in this line.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 max-w-5xl">
            {products.map((product: any, index: number) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="group flex flex-col relative"
              >
                {/* ── 📸 IMAGE CANVAS LAYER WITH DUAL IMAGE SWAP ── */}
                <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-[#FCF6F2] border border-[#742709]/5 mb-6 transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(116,39,9,0.06)]">
                  {/* Default Product Image */}
                  <Image
                    src={product.defaultImage}
                    alt={product.name}
                    fill
                    sizes="(max-w-5xl) 50vw"
                    className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    priority
                  />

                  {/* ✅ হোভার ইমেজ সোয়াপ মেকানিজম */}
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} Hover View`}
                    fill
                    sizes="(max-w-5xl) 50vw"
                    className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 scale-100 group-hover:scale-[1.02]"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm border border-[#742709]/5 px-3 py-1.5 rounded-full z-20">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#742709]">
                      {product.tag}
                    </span>
                  </div>

                  {/* 🛒 SLIDE-UP ADD TO BAG OVERLAY */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/40 via-black/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) z-30 flex items-center justify-center">
                    <button className="w-full bg-[#FFFCF9] text-[#742709] text-[10px] font-bold uppercase tracking-[0.25em] py-4 rounded-xl transition-all duration-300 hover:bg-[#742709] hover:text-white flex items-center justify-center gap-2 cursor-pointer shadow-md">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Atelier Bag
                    </button>
                  </div>
                </div>

                {/* ── 📝 PRODUCT DETAILS ── */}
                <div className="flex flex-col px-1">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#742709]/50">
                        {product.brand}
                      </p>
                      <h3 className="font-serif text-2xl font-light transition-colors duration-300 group-hover:text-[#742709]">
                        {product.name}
                      </h3>
                    </div>
                    <span className="font-sans text-xl font-medium text-[#742709] pt-1">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 mt-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-xs font-bold text-[#1C1B1B]/70">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}