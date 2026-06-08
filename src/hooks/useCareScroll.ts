"use client";

import { useEffect, useState } from "react";

export interface CareItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageKey: string;
  rightBg: string;
  isRightText: boolean;
  thumbKey: string;
}

export const useCareScroll = () => {
  const [data, setData] = useState<CareItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/care");
        if (!response.ok) {
          throw new Error("Failed to fetch split-scroll data");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCareData();
  }, []);

  return { data, loading, error };
};