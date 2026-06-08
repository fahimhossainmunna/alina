import { NextResponse } from "next/server";

interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  btnText: string;
  src: string;
}

export async function GET() {
  const collections: CollectionItem[] = [
    {
      id: 1,
      title: "Glow Essentials",
      subtitle: "Flawless Daily Makeup Collection",
      description:
        "Curated makeup essentials featuring Bobbi Brown's iconic palettes, blushes, and finishing touches. Create your perfect everyday glow with professional-grade cosmetics.",
      btnText: "Shop Makeup",
      src: "/images/cover/coverOne.jpg", // Bobbi Brown makeup flatlay
    },
    {
      id: 2,
      title: "Midnight Luxe",
      subtitle: "Premium Pigmented Lip Couture",
      description:
        "Pat McGrath Labs' luxurious lipsticks with velvet matte finish. Long-wear, transfer-resistant formula enriched with shea butter for ultimate comfort and color.",
      btnText: "Buy Lipsticks",
      src: "/images/cover/coverTwo.jpg", // Pat McGrath lipsticks
    },
    {
      id: 3,
      title: "Sahara Secret",
      subtitle: "Secret of Sahara Oil Serum",
      description:
        "Huxley's lightweight facial oil from the Secret of Sahara collection. Prickly pear seed oil blend that deeply nourishes without greasiness. Perfect for face and body.",
      btnText: "View Serum",
      src: "/images/cover/coverThree.jpg", // BN skincare products
    },
    {
      id: 4,
      title: "Illumination Mask",
      subtitle: "French Rosé Detox Treatment",
      description:
        "Lume's illuminating face mask with French Rose extract. Detoxify, hydrate, and repair your skin with this luxurious treatment enriched with natural botanicals.",
      btnText: "Discover Mask",
      src: "/images/cover/coverFour.jpg", // Lume illumination mask
    },
    {
      id: 5,
      title: "Botanical Ritual",
      subtitle: "Pure Clinical Skincare Collection",
      description:
        "BN's minimalist skincare range featuring face creams, body oils, and intensive care formulas. Dermatologist-tested, fragrance-free formulations for sensitive skin.",
      btnText: "Explore Skincare",
      src: "/images/cover/coverFive.jpg", // Huxley oil serum
    },
  ];

  return NextResponse.json(collections, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

export const dynamic = "force-dynamic";
export const revalidate = 60;
