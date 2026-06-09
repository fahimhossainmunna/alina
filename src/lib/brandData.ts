export interface EyeProductItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  defaultImage: string;
  hoverImage?: string;     
  tag: string;
  isBrandOption?: boolean; 
  slug?: string;           
  subProducts?: any[];     
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

  // ── 🧼 ফেসওয়াশ কালেকশন ──
  facewash: [
    {
      id: 5,
      name: "Bombay Shaving Co. Line",
      brand: "Bombay Shaving Company",
      slug: "bombay",
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/facewash/bombay/bombayFacewash.jpg",
      hoverImage: "/images/productList/facewash/bombay/bombayFacewash.jpg",
      tag: "Premium Care",
      isBrandOption: true,
      subProducts: [
        { id: 51, name: "Charcoal Deep Cleanse One", brand: "Bombay Shaving Co.", price: 12.00, rating: 4.6, defaultImage: "/images/productList/facewash/bombay/bomBayOne.jpg", tag: "Best Seller" },
        { id: 52, name: "Charcoal Face Scrub Two", brand: "Bombay Shaving Co.", price: 15.00, rating: 4.8, defaultImage: "/images/productList/facewash/bombay/bomBayTwo.jpg", tag: "Oil Control" },
        { id: 53, name: "Charcoal Face Pack Three", brand: "Bombay Shaving Co.", price: 14.50, rating: 4.7, defaultImage: "/images/productList/facewash/bombay/bombayThree.jpg", tag: "Deep Cleanse" },
        { id: 54, name: "Charcoal Glow Mask Four", brand: "Bombay Shaving Co.", price: 16.00, rating: 4.5, defaultImage: "/images/productList/facewash/bombay/bomBayfour.jpg", tag: "New Formula" }
      ]
    },
    {
      id: 6,
      name: "Ela De Pure Gel Cleanser",
      brand: "Ela De Pure",
      slug: "gelFace",
      price: 0.00,
      rating: 4.8,
      defaultImage: "/images/productList/facewash/gelFace/gelFacewash.jpg",
      hoverImage: "/images/productList/facewash/gelFace/gelFacewash.jpg",
      tag: "Organic Gel",
      isBrandOption: true,
      subProducts: [
        { id: 61, name: "Gel Facial Cleanser One", brand: "Ela De Pure", price: 22.00, rating: 4.9, defaultImage: "/images/productList/facewash/gelFace/gelFaceOne.jpg", tag: "Hydrating" },
        { id: 62, name: "Moisturizing Cream Two", brand: "Ela Pure", price: 26.00, rating: 4.7, defaultImage: "/images/productList/facewash/gelFace/gelFaceTwo.jpg", tag: "Skin Repair" },
        { id: 63, name: "Rosehip Face Serum Three", brand: "Ela De Pure", price: 28.00, rating: 4.8, defaultImage: "/images/productList/facewash/gelFace/gelFacethree.jpg", tag: "New Formula" },
        { id: 64, name: "Cleansing Oil Four", brand: "Ela De Pure", price: 24.50, rating: 4.6, defaultImage: "/images/productList/facewash/gelFace/gelFaceFour.jpg", tag: "Gentle Clean" }
      ]
    },
    {
      id: 7,
      name: "mCaffeine Caffeinated Care",
      brand: "mCaffeine India",
      slug: "mCofee",
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/facewash/mCofee/coffeFacewash.jpg",
      hoverImage: "/images/productList/facewash/mCofee/coffeFacewash.jpg",
      tag: "100% Vegan",
      isBrandOption: true,
      subProducts: [
        { id: 71, name: "Coffee Naked & Raw Wash One", brand: "mCaffeine", price: 18.00, rating: 4.8, defaultImage: "/images/productList/facewash/mCofee/mCoffeeOne.jpg", tag: "Glow & Shine" },
        { id: 72, name: "Coffee Face Scrub Pack Two", brand: "mCaffeine", price: 20.00, rating: 4.7, defaultImage: "/images/productList/facewash/mCofee/mCoffeeTwo.jpg", tag: "Trending" },
        { id: 73, name: "Coffee Body Scrub Three", brand: "mCaffeine", price: 22.50, rating: 4.9, defaultImage: "/images/productList/facewash/mCofee/mCoffeeThree.jpg", tag: "Best Seller" },
        { id: 74, name: "Coffee Foaming Cleanser Four", brand: "mCaffeine", price: 19.00, rating: 4.6, defaultImage: "/images/productList/facewash/mCofee/mCoffeeFour.jpg", tag: "Daily Cleanse" }
      ]
    }
  ],

  // ── 💄 লিপস্টিক কালেকশন (📸 আপনার ৪টি এক্সাক্ট সাব-ফোল্ডারের সম্পূর্ণ রিয়াল ডেটা) ──
 // ── 📂 src/lib/brandData.ts এর ভেতরের lipstik অ্যারেটি এটি দিয়ে রিপ্লেস করুন ──

  lipstik: [
    {
      id: 8,
      name: "MAC Luxury Collection",
      brand: "MAC Cosmetics",
      slug: "mac",
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/lipstik/mac/macCover.png",
      tag: "Retro Matte",
      isBrandOption: true,
      subProducts: [
        { id: 81, name: "MAC Matte Lipstick One", brand: "MAC", price: 26.00, rating: 4.8, defaultImage: "/images/productList/lipstik/mac/macOne.png", hoverImage: "/images/productList/lipstik/mac/macOneHover.png", tag: "Iconic Ruby" },
        { id: 82, name: "MAC Satin Finish Two", brand: "MAC", price: 28.00, rating: 4.7, defaultImage: "/images/productList/lipstik/mac/macTwo.png", hoverImage: "/images/productList/lipstik/mac/macTwoHover.png", tag: "Trending" },
        { id: 83, name: "MAC Liquid Lip Three", brand: "MAC", price: 29.00, rating: 4.9, defaultImage: "/images/productList/lipstik/mac/macThree.png", hoverImage: "/images/productList/lipstik/mac/macThreeHover.png", tag: "Best Seller" },
        { id: 84, name: "MAC Velvet Blur Four", brand: "MAC", price: 27.50, rating: 4.6, defaultImage: "/images/productList/lipstik/mac/macFour.png", hoverImage: "/images/productList/lipstik/mac/macFourHover.png", tag: "New Formulation" }
      ]
    },
    {
      id: 9,
      name: "Maybelline New York Line",
      brand: "Maybelline",
      slug: "maybe",
      price: 0.00,
      rating: 4.7,
      defaultImage: "/images/productList/lipstik/maybe/maybeCover.jpg",
      tag: "Super Stay",
      isBrandOption: true,
      subProducts: [
        { id: 91, name: "SuperStay Matte Ink One", brand: "Maybelline", price: 14.00, rating: 4.8, defaultImage: "/images/productList/lipstik/maybe/maybeOne.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeOneHover.jpg", tag: "Long Lasting" },
        { id: 92, name: "Sensational Creamy Two", brand: "Maybelline", price: 12.50, rating: 4.6, defaultImage: "/images/productList/lipstik/maybe/maybeTwo.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeTwoHover.jpg", tag: "Nude Lip" },
        { id: 93, name: "Vinyl Ink Liquid Three", brand: "Maybelline", price: 16.00, rating: 4.7, defaultImage: "/images/productList/lipstik/maybe/maybeThree.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeThreeHover.jpg", tag: "High Shine" },
        { id: 94, name: "Color Sensational Four", brand: "Maybelline", price: 13.00, rating: 4.5, defaultImage: "/images/productList/lipstik/maybe/maybeFour.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeFourHover.jpg", tag: "Classic Red" }
      ]
    },
    {
      id: 10,
      name: "NARS Audacious Mattes",
      brand: "NARS Cosmetics",
      slug: "nars",
      price: 0.00,
      rating: 4.8,
      defaultImage: "/images/productList/lipstik/nars/nasCover.png",
      tag: "Powder Matte",
      isBrandOption: true,
      subProducts: [
        { id: 101, name: "NARS Matte Lipstick One", brand: "NARS", price: 32.00, rating: 4.9, defaultImage: "/images/productList/lipstik/nars/narsOne.jpg", hoverImage: "/images/productList/lipstik/nars/narsOneHover.jpg", tag: "Velvet Lip" },
        { id: 102, name: "NARS Air Matte Lip Two", brand: "NARS", price: 30.00, rating: 4.7, defaultImage: "/images/productList/lipstik/nars/narsTwo.jpg", hoverImage: "/images/productList/lipstik/nars/narsTwoHover.jpg", tag: "Best Seller" },
        { id: 103, name: "NARS Velvet Matte Three", brand: "NARS", price: 34.00, rating: 4.8, defaultImage: "/images/productList/lipstik/nars/narsThree.jpg", hoverImage: "/images/productList/lipstik/nars/narsThreeHover.jpg", tag: "Trending" },
        { id: 104, name: "NARS Powermatte Lip Four", brand: "NARS", price: 32.50, rating: 4.6, defaultImage: "/images/productList/lipstik/nars/narsFour.jpg", hoverImage: "/images/productList/lipstik/nars/narsFourHover.jpg", tag: "Iconic Nude" }
      ]
    },
    {
      id: 11,
      name: "Yves Saint Laurent Luxury",
      brand: "YSL",
      slug: "ysl",
      price: 0.00,
      rating: 4.9,
      // 📸 মেইন কভার ইমেজ পাথ ফিক্স
      defaultImage: "/images/productList/lipstik/ysl/yslCover.jpg", 
      tag: "Couture Shine",
      isBrandOption: true,
      // 🎯 সাব-প্রোডাক্টগুলোর স্পেলিং হুবহু ফোল্ডারের সাথে ম্যাচ করা হলো (ylsOne, ylsTwo ইত্যাদি)
      subProducts: [
        { id: 111, name: "YSL Rouge Volupté One", brand: "YSL", price: 45.00, rating: 4.9, defaultImage: "/images/productList/lipstik/ysl/ylsOne.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsOneHover.jpg", tag: "Luxury Glow" },
        { id: 112, name: "YSL Slim Matte Velvet Two", brand: "YSL", price: 48.00, rating: 4.8, defaultImage: "/images/productList/lipstik/ysl/ylsTwo.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsTwoHover.jpg", tag: "Couture Matte" },
        { id: 113, name: "YSL Rouge Pur Couture Three", brand: "YSL", price: 46.00, rating: 4.7, defaultImage: "/images/productList/lipstik/ysl/ylsThree.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsThreeHover.jpg", tag: "Satin Finish" },
        { id: 114, name: "YSL Tatouage Couture Four", brand: "YSL", price: 44.00, rating: 4.6, defaultImage: "/images/productList/lipstik/ysl/ylsFour.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsFourHover.jpg", tag: "Best Seller" }
      ]
    }
  ],
  moisturizers: [],
  serum: []
};