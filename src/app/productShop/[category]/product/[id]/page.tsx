"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ArrowLeft, Star, Heart, ShoppingBag, ShieldCheck, 
  Truck, RefreshCw, Sparkles, ChevronLeft, ChevronRight 
} from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const categorySlug = params.category as string;

  const [product, setProduct] = useState<any>(null);
  const [randomSuggested, setRandomSuggested] = useState<any[]>([]); // 🎯 র্যান্ডম স্লাইডিং প্রোডাক্ট স্টেট
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // স্লাইডিং ট্র্যাকিংয়ের জন্য রেফ
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProductAndAllSuggestions() {
      try {
        setLoading(true);
        
        // ১. কারেন্ট প্রোডাক্ট ডিটেইলস ফেচ
        const resDetail = await fetch(`/api/store/products?productId=${productId}`);
        const dataDetail = await resDetail.json();
        
        if (dataDetail.success && dataDetail.product) {
          setProduct(dataDetail.product);
          setActiveImage(dataDetail.product.defaultImage);
        }

        // ২. 🎯 গ্লোবাল র্যান্ডম স্লাইডিং সাজেশন লজিক
        // সব ক্যাটাগরির মিক্সড প্রোডাক্টের জন্য আমরা আমাদের ৪টি প্রধান সাব-প্রোডাক্ট ক্যাটাগরিকে ফেচ করবো
        const categoriesToFetch = ["facewash", "lipstik", "moisturizers", "serum"];
        let allFlatProducts: any[] = [];

        await Promise.all(
          categoriesToFetch.map(async (cat) => {
            try {
              const res = await fetch(`/api/store/products?category=${cat}`);
              const data = await res.json();
              if (data.success && data.products) {
                data.products.forEach((item: any) => {
                  if (item.subProducts) {
                    allFlatProducts = [...allFlatProducts, ...item.subProducts];
                  } else {
                    allFlatProducts.push(item);
                  }
                });
              }
            } catch (e) {
              console.error(`Error fetching category ${cat} for suggestions:`, e);
            }
          })
        );

        // কারেন্ট ওপেন থাকা প্রোডাক্টটি বাদ দিয়ে ফিল্টার করা
        const currentId = parseInt(productId);
        let filteredPool = allFlatProducts.filter((p: any) => p.id !== currentId);

        // 🎯 ডাইনামিক র্যান্ডম শাফলিং (Fisher-Yates Shuffle Algorithm)
        for (let i = filteredPool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filteredPool[i], filteredPool[j]] = [filteredPool[j], filteredPool[i]];
        }

        // স্লাইডিং কন্টেন্টের জন্য আমরা সর্বোচ্চ ১২টি র্যান্ডমাইজড আইটেম সাজেশনে রাখবো
        setRandomSuggested(filteredPool.slice(0, 12));

      } catch (err) {
        console.error("Error loading luxury single product pipeline:", err);
      } finally {
        setLoading(false);
      }
    }
    
    if (productId) loadProductAndAllSuggestions();
  }, [productId, categorySlug]);

  // 🎛️ স্লাইডিং কন্ট্রোল ফাংশন (স্মুথ স্ক্রোলিং ট্রানজিশন)
  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#FFFCF9] flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-[#742709] border-[#742709]/10 animate-spin mx-auto" />
          <p className="text-xs tracking-widest text-[#742709] uppercase font-bold">Loading Studio Atelier...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#FFFCF9] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-[#1C1B1B]/60 font-light">Product could not be sourced.</p>
        <button onClick={() => router.back()} className="text-xs font-bold text-[#742709] underline">Go Back</button>
      </div>
    );
  }

  const imageGallery = [product.defaultImage];
  if (product.hoverImage && product.hoverImage !== product.defaultImage) {
    imageGallery.push(product.hoverImage);
  }

  return (
    <main className="w-full min-h-screen bg-[#FFFCF9] text-[#1C1B1B] pt-36 pb-24 font-sans selection:bg-[#742709] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* 🔙 BACK LINK */}
        <button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#742709] mb-12 focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Collection
        </button>

        {/* ── 🛍️ PRODUCT LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-28">
          
          {/* 📸 LEFT SIDE: IMAGE PANEL */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 w-full">
            <div className="flex sm:flex-col gap-3 shrink-0">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 rounded-xl overflow-hidden bg-[#FCF6F2] border transition-all ${
                    activeImage === img ? "border-[#742709] shadow-sm" : "border-[#742709]/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1 relative aspect-[4/5] rounded-[32px] overflow-hidden bg-[#FCF6F2] border border-[#742709]/5">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#742709] text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {product.tag}
              </div>
            </div>
          </div>

          {/* 📝 RIGHT SIDE: CONTENT PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#742709]/70">{product.brand}</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1C1B1B]">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3 border-b border-[#742709]/10 pb-4">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400" : "text-amber-200"}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-[#1C1B1B]/70 mt-0.5">{product.rating.toFixed(1)} / 5.0 Rating</span>
            </div>

            <div className="text-2xl font-semibold text-[#742709]">
              ${product.price > 0 ? product.price.toFixed(2) : "24.00"}
            </div>

            <p className="text-xs text-[#1C1B1B]/70 font-light leading-relaxed">
              Experience the pinnacle of clean luxury formula. Designed for ultimate compatibility, performance, and long-lasting absolute comfort. Non-irritating composition developed for selective skin tones.
            </p>

            {/* QUANTITY & ACTIONS */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border border-[#742709]/20 rounded-xl bg-white overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-sm hover:bg-[#742709]/5">-</button>
                <span className="px-4 text-xs font-bold font-sans">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-sm hover:bg-[#742709]/5">+</button>
              </div>

              <button className="flex-1 bg-[#742709] hover:bg-[#591d05] text-white rounded-xl py-3 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer">
                <ShoppingBag className="w-4 h-4" /> Add To Bag
              </button>

              <button onClick={() => setIsFavorite(!isFavorite)} className={`p-3 rounded-xl border transition-all ${isFavorite ? "border-red-500 bg-red-50/50 text-red-500" : "border-[#742709]/20 text-[#1C1B1B]/70"}`}>
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* BADGES */}
            <div className="pt-6 border-t border-[#742709]/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#742709]/70 shrink-0" />
                <span className="text-[10px] font-medium tracking-wide text-[#1C1B1B]/70">100% Authentic</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#742709]/70 shrink-0" />
                <span className="text-[10px] font-medium tracking-wide text-[#1C1B1B]/70">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-[#742709]/70 shrink-0" />
                <span className="text-[10px] font-medium tracking-wide text-[#1C1B1B]/70">Easy Returns</span>
              </div>
            </div>

            {/* TAB ACCORDION */}
            <div className="pt-6 border-t border-[#742709]/10 space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-serif text-sm font-normal text-[#742709]">Overview & Formula</h4>
                <p className="text-[11px] text-[#1C1B1B]/60 font-light leading-relaxed">
                  One look. One touch. Pure luxury signature finish. Smooth formulation glides effortlessly to offer a professional premium layout. Enriched with natural conditioning elements and moisture locking barriers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 🎯 🎯 NEW SUGGESTED RANDOM SLIDER SECTION (লাক্সারি স্লাইডার) ── */}
        {randomSuggested.length > 0 && (
          <section className="pt-16 border-t border-[#742709]/10 relative group/section">
            <div className="flex items-end justify-between mb-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#742709]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Exclusive Mix Feed</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-tight">
                  You May Also <span className="font-normal text-[#742709] italic">Like</span>
                </h3>
              </div>

              {/* 🎛️ স্লাইডার নেভিগেশন বাটনসমূহ */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollSlider("left")}
                  className="p-2.5 rounded-full border border-[#742709]/10 bg-white hover:bg-[#742709] hover:text-white transition-all focus:outline-none shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSlider("right")}
                  className="p-2.5 rounded-full border border-[#742709]/10 bg-white hover:bg-[#742709] hover:text-white transition-all focus:outline-none shadow-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 📦 স্লাইডার ট্র্যাক গ্রিড (টাচ সুইপ ও স্মুথ ওভারফ্লো স্ক্রোলিং সাপোর্ট) */}
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 select-none"
              style={{ scrollbarWidth: "none" }} // ফায়ারফক্স স্ক্রলবার রিমুভাল
            >
              {randomSuggested.map((item: any, index: number) => {
                // ইমেজ প্যাথ ডাইনামিকালি ডিটেক্ট করার ট্র্যাকিং সেফগার্ড লজিক
                let detectedCategory = "lipstik";
                if (item.defaultImage.includes("facewash")) detectedCategory = "facewash";
                else if (item.defaultImage.includes("moisturizers")) detectedCategory = "moisturizers";
                else if (item.defaultImage.includes("serum")) detectedCategory = "serum";

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    onClick={() => {
                      // স্লাইডারের প্রোডাক্টে ক্লিক করলে ইনস্ট্যান্টলি তার পেজে রিডাইরেক্ট হবে
                      router.push(`/productShop/${detectedCategory}/product/${item.id}`);
                    }}
                    className="min-w-[240px] sm:min-w-[290px] max-w-[300px] flex flex-col snap-start shrink-0 group cursor-pointer"
                  >
                    {/* ইমেজ কভার বক্স */}
                    <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#FCF6F2] border border-[#742709]/5 mb-3 transition-all duration-500 group-hover:shadow-[0_15px_30px_rgba(116,39,9,0.06)]">
                      <Image
                        src={item.defaultImage}
                        alt={item.name}
                        fill
                        sizes="(max-w-768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#742709]/5">
                        <span className="text-[7px] font-bold uppercase tracking-widest text-[#742709]">{item.tag}</span>
                      </div>
                    </div>

                    {/* প্রোডাক্ট ইনফো ব্লক */}
                    <div className="flex flex-col px-1">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#742709]/60">{item.brand}</p>
                      <h4 className="font-serif text-xs sm:text-sm font-light tracking-tight mt-0.5 text-[#1C1B1B] group-hover:text-[#742709] transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#742709]/5">
                        <span className="font-sans text-xs font-semibold text-[#742709]">
                          ${item.price > 0 ? item.price.toFixed(2) : "22.50"}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <span className="text-[9px] font-bold text-[#1C1B1B]/50">{item.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}