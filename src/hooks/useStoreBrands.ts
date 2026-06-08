"use client";

import { useState, useEffect } from "react";
import { type EyeProductItem, CATEGORY_DIRECT_PRODUCTS } from "@/lib/brandData";

export function useBrandProducts(brandSlug: string) {
  const [products, setProducts] = useState<EyeProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400)); // লাক্সারি সফট ফিল ডিলে
      
      if (brandSlug && CATEGORY_DIRECT_PRODUCTS[brandSlug]) {
        setProducts(CATEGORY_DIRECT_PRODUCTS[brandSlug]);
      } else {
        setProducts([]);
      }
      setLoading(false);
    };

    if (brandSlug) fetchProducts();
  }, [brandSlug]);

  return { products, loading };
}