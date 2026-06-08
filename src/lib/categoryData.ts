export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  coverImage: string;
}

// ── 📸 আপনার স্ক্রিনশট (image_7ea1fa.png) অনুযায়ী নিখুঁত পাথ লকিং ──
export const STATIC_CATEGORIES: CategoryItem[] = [
  {
    id: 1,
    name: "Eye Care",
    slug: "eyeCare",
    coverImage: "/images/productList/eyelash.jpeg"
  },
  {
    id: 2,
    name: "Face Mask",
    slug: "faceMask",
    coverImage: "/images/productList/facemaskP.jpeg"
  },
  {
    id: 3,
    name: "Facewash",
    slug: "facewash",
    coverImage: "/images/productList/facewashP.jpg"
  },
  {
    id: 4,
    name: "Lipstick",
    slug: "lipstik",
    coverImage: "/images/productList/lipstikP.jpg"
  },
  {
    id: 5,
    name: "Moisturizers",
    slug: "moisturizers",
    coverImage: "/images/productList/moisturizersP.jpg"
  },
  {
    id: 6,
    name: "Serum",
    slug: "serum",
    coverImage: "/images/productList/serumP.jpg"
  }
];