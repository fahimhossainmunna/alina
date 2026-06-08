"use client";

import { useState, useEffect } from "react";

export interface BookItem {
  id: number;
  title: string;
  heading: string;
  description: string;
  coverSrc: string;
}

export const useTelier = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/telier");
        if (!response.ok) {
          throw new Error("Failed to fetch Telier editorial data");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return { books, loading, error };
};
