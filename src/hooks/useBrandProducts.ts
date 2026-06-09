"use client";

import { useState, useEffect } from "react";
import { type EyeProductItem } from "@/lib/brandData";

// ✅ brandSlug প্যারামিটারটি ঐচ্ছিক (Optional) হিসেবে যোগ করা হলো
export function useBrandProducts(categorySlug: string, brandSlug?: string) {
  const [products, setProducts] = useState<EyeProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categorySlug) return;
      try {
        setLoading(true);
        
        // ── 🎯 ডাইনামিক ইউআরএল বিল্ড ──
        let url = `/api/store/products?category=${categorySlug}`;
        if (brandSlug) {
          url += `&brand=${brandSlug}`; // যদি ব্র্যান্ডে ক্লিক করা হয়, তবে সাব-ইউআরএল তৈরি হবে
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        
        const data = await res.json();
        if (data && data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, brandSlug]); // ✅ brandSlug পরিবর্তন হলেও এই ইফেক্টটি আবার রান হবে

  return { products, loading };
}