"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export interface UseBlogReturn {
  posts: BlogPost[];
  featuredPost: BlogPost | null;
  total: number;
  totalPages: number;
  currentPage: number;
  activeCategory: string;
  categories: string[];
  loading: boolean;
  featuredLoading: boolean;
  error: string | null;
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
  refresh: () => void;
}

export const CATEGORIES = ["All", "Skincare", "Ingredients", "Rituals", "Sustainability"];

// ── ⚓ HOOK MECHANICS ──
export function useBlog(initialFilters: BlogFilters = {}): UseBlogReturn {
  const [posts, setPosts]               = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  
  const [response, setResponse]         = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });

  const [activeCategory, setActiveCategory] = useState<string>(
    initialFilters.category ?? "All"
  );
  const [currentPage, setCurrentPage] = useState<number>(initialFilters.page ?? 1);

  const [loading, setLoading]               = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [error, setError]                   = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setFeaturedLoading(true);
        const res = await fetch("/api/blog?page=1&limit=6");
        if (!res.ok) throw new Error("Featured fetch failed");
        
        const data = await res.json();
        if (data && data.posts && data.posts.length > 0) {
          const featured = data.posts.find((p: BlogPost) => p.featured) || data.posts[0];
          setFeaturedPost(featured);
        }
      } catch (err) {
        setFeaturedPost(null);
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const loadPosts = useCallback(
    async (category: string, page: number) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          category: category,
          page: String(page),
          limit: "6"
        });

        const res = await fetch(`/api/blog?${queryParams.toString()}`, {
          signal: controller.signal
        });
        
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        
        const data = await res.json();

        if (controller.signal.aborted) return;

        if (data && data.posts) {
          setPosts(data.posts);
          setResponse({ 
            total: data.total ?? 0, 
            page: data.page ?? 1, 
            totalPages: data.totalPages ?? 1 
          });
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Failed to load blog posts. Please check your API route.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    loadPosts(activeCategory, currentPage);
  }, [activeCategory, currentPage, loadPosts]);

  const setCategory = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const refresh = useCallback(() => {
    loadPosts(activeCategory, currentPage);
  }, [activeCategory, currentPage, loadPosts]);

  return {
    posts,
    featuredPost,
    total: response.total,
    totalPages: response.totalPages,
    currentPage,
    activeCategory,
    categories: CATEGORIES,
    loading,
    featuredLoading,
    error,
    setCategory,
    setPage,
    refresh,
  };
}