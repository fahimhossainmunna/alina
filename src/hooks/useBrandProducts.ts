"use client";

import { useState, useEffect } from "react";
import { type EyeProductItem } from "@/lib/brandData";

export function useBrandProducts(categorySlug: string) {
  const [products, setProducts] = useState<EyeProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categorySlug) return;
      try {
        setLoading(true);
        // আমাদের তৈরি করা এপিআই রুটে ক্যাটাগরি পাঠিয়ে ডাটা ফেচ করা হচ্ছে
        const res = await fetch(`/api/store/products?category=${categorySlug}`);
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
  }, [categorySlug]);

  return { products, loading };
}