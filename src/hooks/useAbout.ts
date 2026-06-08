"use client";

import { useState, useEffect } from "react";

export interface AboutStat {
  value: string;
  label: string;
  icon: string;
}

export interface AboutFeature {
  title: string;
  description: string;
  icon: string;
}

export interface AboutImage {
  src: string;
  alt: string;
  caption: string;
}

export interface AboutData {
  heading: string;
  subtitle: string;
  description: string;
  stats: AboutStat[];
  features: AboutFeature[];
  images: AboutImage[];
  team: {
    heading: string;
    text: string;
  };
}

export const useAbout = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/about");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const jsonRouteData = await response.json();
        setData(jsonRouteData);
      } catch (err: any) {
        setError(err.message || "An unexpected network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return { data, loading, error };
};