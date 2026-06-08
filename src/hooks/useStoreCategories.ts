"use client";

import { useState, useEffect } from "react";
import { type CategoryItem } from "@/lib/categoryData";

export function useStoreCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/store/categories");
        if (!res.ok) throw new Error("Category API fetch failure");
        
        const data = await res.json();
        if (data && data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}