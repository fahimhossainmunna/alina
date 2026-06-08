"use client";

import { useState, useEffect, useCallback } from "react";

export interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  btnText: string;
  src: string;
}

export interface UseCollectionsReturn {
  collections: CollectionItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCollections = (): UseCollectionsReturn => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/collections");

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data: CollectionItem[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }

      setCollections(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      console.error("Collections error:", err);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return {
    collections,
    loading,
    error,
    refetch: fetchCollections,
  };
};
