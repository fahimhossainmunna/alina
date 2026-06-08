"use client";

import { useState, useEffect } from "react";

// ইন্টারফেস ডিফাইন করা (TypeScript-এর বেস্ট প্র্যাকটিস)
export interface CategoryItem {
  id: number;
  title: string;
  count: string;
  src: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch premium categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
