export interface EyeProductItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  defaultImage: string;
  hoverImage: string;
  tag: string;
  isBrandOption?: boolean; // ব্র্যান্ড অপশন চেনার জন্য স্পেশাল ফ্ল্যাগ
}

export const CATEGORY_DIRECT_PRODUCTS: Record<string, EyeProductItem[]> = {
  // ── 👁️ আই কেয়ার কালেকশন ──
  eyeCare: [
    {
      id: 1,
      name: "Hypnôse Volumizing Mascara",
      brand: "Lancôme Paris",
      price: 33.00,
      rating: 4.8,
      defaultImage: "/images/productList/eyeCare/lancomeEye/lanEyeOne.jpg",
      hoverImage: "/images/productList/eyeCare/lancomeEye/lanEyeOneHover.jpg",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Définicils High Definition",
      brand: "Lancôme Paris",
      price: 35.00,
      rating: 4.9,
      defaultImage: "/images/productList/eyeCare/lancomeEye/lanEyeTwo.jpg",
      hoverImage: "/images/productList/eyeCare/lancomeEye/lanEyeTwoTwo.jpg",
      tag: "Trending"
    }
  ],

  // ── 🧴 ফেস মাস্ক কালেকশন ──
  faceMask: [
    {
      id: 3,
      name: "Pure Clay Mask Detoxifying",
      brand: "L'Oréal Paris",
      price: 28.00,
      rating: 4.8,
      defaultImage: "/images/productList/faceMask/lorealOne.jpg",
      hoverImage: "/images/productList/faceMask/lorealOneHover.jpg",
      tag: "Best Seller"
    },
    {
      id: 4,
      name: "Pure Clay Mask Exfoliating",
      brand: "L'Oréal Paris",
      price: 29.50,
      rating: 4.7,
      defaultImage: "/images/productList/faceMask/lorealTwo.jpg",
      hoverImage: "/images/productList/faceMask/lorealTwoHover.jpg",
      tag: "Trending"
    }
  ],

  // ── 🧼 ফেসওয়াশ কালেকশন (আপনার ৩টি রিয়েল ব্র্যান্ড অপশন) ──
  facewash: [
    {
      id: 5,
      name: "Bombay Shaving Co. Line",
      brand: "Bombay Shaving Company",
      price: 0.00, // ব্র্যান্ড কালেকশন তাই প্রাইস হাইড থাকবে ইউআই-তে
      rating: 4.9,
      defaultImage: "/images/productList/facewash/bombay/bombayFacewash.jpg",
      hoverImage: "/images/productList/facewash/bombayFacewash.jpg",
      tag: "Premium Care",
      isBrandOption: true // ✅ ডাইনামিক পেজকে সিগন্যাল দেবে যে এটি ব্র্যান্ড কার্ড
    },
    {
      id: 6,
      name: "Ela De Pure Gel Cleanser",
      brand: "Ela De Pure",
      price: 0.00,
      rating: 4.8,
      defaultImage: "/images/productList/facewash/gelFace/gelFacewash.jpg",
      hoverImage: "/images/productList/facewash/gelFacewash.jpg",
      tag: "Organic Gel",
      isBrandOption: true
    },
    {
      id: 7,
      name: "mCaffeine Caffeinated Care",
      brand: "mCaffeine India",
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/facewash/mCofee/coffeFacewash.jpg",
      hoverImage: "/images/productList/facewash/coffeFacewash.jpg",
      tag: "100% Vegan",
      isBrandOption: true
    }
  ],
  lipstik: [],
  moisturizers: [],
  serum: []
};