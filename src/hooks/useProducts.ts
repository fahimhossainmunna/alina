'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  src: string;
}

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data: Product[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }

      setProducts(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      console.error('Products fetch error:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};