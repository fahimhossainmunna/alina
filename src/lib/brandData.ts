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
    { id: 1, name: "Hypnôse Volumizing Mascara", brand: "Lancôme Paris", price: 33.00, rating: 4.8, defaultImage: "/images/productList/eyeCare/lancomeEye/lanEyeOne.jpg", hoverImage: "/images/productList/eyeCare/lancomeEye/lanEyeOneHover.jpg", tag: "Best Seller" },
    { id: 2, name: "Définicils High Definition", brand: "Lancôme Paris", price: 35.00, rating: 4.9, defaultImage: "/images/productList/eyeCare/lancomeEye/lanEyeTwo.jpg", hoverImage: "/images/productList/eyeCare/lancomeEye/lanEyeTwoTwo.jpg", tag: "Trending" }
  ],

  // ── 🧴 ফেস মাস্ক কালেকশন ──
  faceMask: [
    { id: 3, name: "Pure Clay Mask Detoxifying", brand: "L'Oréal Paris", price: 28.00, rating: 4.8, defaultImage: "/images/productList/faceMask/lorealOne.jpg", hoverImage: "/images/productList/faceMask/lorealOneHover.jpg", tag: "Best Seller" },
    { id: 4, name: "Pure Clay Mask Exfoliating", brand: "L'Oréal Paris", price: 29.50, rating: 4.7, defaultImage: "/images/productList/faceMask/lorealTwo.jpg", hoverImage: "/images/productList/faceMask/lorealTwoHover.jpg", tag: "Trending" }
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

  // ── 💄 লিপস্টিক কালেকশন ──
  lipstik: [
    {
      id: 8,
      name: "MAC Retro Matte Elegance",
      brand: "MAC Cosmetics",
      slug: "mac",
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/lipstik/mac/macCover.png",
      tag: "Retro Matte",
      isBrandOption: true,
      subProducts: [
        { id: 81, name: "Retro Matte Lipstick One", brand: "MAC", price: 26.00, rating: 4.8, defaultImage: "/images/productList/lipstik/mac/macOne.png", hoverImage: "/images/productList/lipstik/mac/macOneHover.png", tag: "Iconic Ruby" },
        { id: 82, name: "Retro Matte Lipstick Two", brand: "MAC", price: 28.00, rating: 4.7, defaultImage: "/images/productList/lipstik/mac/macTwo.png", hoverImage: "/images/productList/lipstik/mac/macTwoHover.png", tag: "Trending" },
        { id: 83, name: "Retro Matte Lipstick Three", brand: "MAC", price: 29.00, rating: 4.9, defaultImage: "/images/productList/lipstik/mac/macThree.png", hoverImage: "/images/productList/lipstik/mac/macThreeHover.png", tag: "Best Seller" },
        { id: 84, name: "Retro Matte Lipstick Four", brand: "MAC", price: 27.50, rating: 4.6, defaultImage: "/images/productList/lipstik/mac/macFour.png", hoverImage: "/images/productList/lipstik/mac/macFourHover.png", tag: "New Formula" }
      ]
    },
    {
      id: 9,
      name: "Maybelline SuperStay Matte Ink",
      brand: "Maybelline",
      slug: "maybe",
      price: 0.00,
      rating: 4.7,
      defaultImage: "/images/productList/lipstik/maybe/maybeCover.jpg",
      tag: "Super Stay",
      isBrandOption: true,
      subProducts: [
        { id: 91, name: "SuperStay Matte Ink One", brand: "Maybelline", price: 14.00, rating: 4.8, defaultImage: "/images/productList/lipstik/maybe/maybeOne.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeOneHover.jpg", tag: "Long Lasting" },
        { id: 92, name: "SuperStay Matte Ink Two", brand: "Maybelline", price: 12.50, rating: 4.6, defaultImage: "/images/productList/lipstik/maybe/maybeTwo.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeTwoHover.jpg", tag: "Nude Lip" },
        { id: 93, name: "SuperStay Matte Ink Three", brand: "Maybelline", price: 16.00, rating: 4.7, defaultImage: "/images/productList/lipstik/maybe/maybeThree.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeThreeHover.jpg", tag: "High Shine" },
        { id: 94, name: "SuperStay Matte Ink Four", brand: "Maybelline", price: 13.00, rating: 4.5, defaultImage: "/images/productList/lipstik/maybe/maybeFour.jpg", hoverImage: "/images/productList/lipstik/maybe/maybeFourHover.jpg", tag: "Classic Red" }
      ]
    },
    {
      id: 10,
      name: "NARS Powermatte Collection",
      brand: "NARS Cosmetics",
      slug: "nars",
      price: 0.00,
      rating: 4.8,
      defaultImage: "/images/productList/lipstik/nars/nasCover.png",
      tag: "Powder Matte",
      isBrandOption: true,
      subProducts: [
        { id: 101, name: "Powermatte Lip Pigment One", brand: "NARS", price: 32.00, rating: 4.9, defaultImage: "/images/productList/lipstik/nars/narsOne.jpg", hoverImage: "/images/productList/lipstik/nars/narsOneHover.jpg", tag: "Velvet Lip" },
        { id: 102, name: "Powermatte Lip Pigment Two", brand: "NARS", price: 30.00, rating: 4.7, defaultImage: "/images/productList/lipstik/nars/narsTwo.jpg", hoverImage: "/images/productList/lipstik/nars/narsTwoHover.jpg", tag: "Best Seller" },
        { id: 103, name: "Powermatte Lip Pigment Three", brand: "NARS", price: 34.00, rating: 4.8, defaultImage: "/images/productList/lipstik/nars/narsThree.jpg", hoverImage: "/images/productList/lipstik/nars/narsThreeHover.jpg", tag: "Trending" },
        { id: 104, name: "Powermatte Lip Pigment Four", brand: "NARS", price: 32.50, rating: 4.6, defaultImage: "/images/productList/lipstik/nars/narsFour.jpg", hoverImage: "/images/productList/lipstik/nars/narsFourHover.jpg", tag: "Iconic Nude" }
      ]
    },
    {
      id: 11,
      name: "YSL Rouge Pur Couture Luxury",
      brand: "YSL",
      slug: "ysl",
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/lipstik/ysl/yslCover.jpg",
      tag: "Couture Shine",
      isBrandOption: true,
      subProducts: [
        { id: 111, name: "Rouge Pur Couture One", brand: "YSL", price: 45.00, rating: 4.9, defaultImage: "/images/productList/lipstik/ysl/ylsOne.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsOneHover.jpg", tag: "Luxury Glow" },
        { id: 112, name: "Rouge Pur Couture Two", brand: "YSL", price: 48.00, rating: 4.8, defaultImage: "/images/productList/lipstik/ysl/ylsTwo.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsTwoHover.jpg", tag: "Couture Matte" },
        { id: 113, name: "Rouge Pur Couture Three", brand: "YSL", price: 46.00, rating: 4.7, defaultImage: "/images/productList/lipstik/ysl/ylsThree.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsThreeHover.jpg", tag: "Satin Finish" },
        { id: 114, name: "Rouge Pur Couture Four", brand: "YSL", price: 44.00, rating: 4.6, defaultImage: "/images/productList/lipstik/ysl/ylsFour.jpg", hoverImage: "/images/productList/lipstik/ysl/ylsFourHover.jpg", tag: "Best Seller" }
      ]
    }
  ],

  // ── 🧴 ময়েশ্চারাইজার কালেকশন ──
  moisturizers: [
    {
      id: 12,
      name: "CeraVe Advanced Hydration",
      brand: "CeraVe",
      slug: "CeraVe", 
      price: 0.00,
      rating: 4.8,
      defaultImage: "/images/productList/moisturizers/CeraVe/ceraVeCover.jpeg", 
      tag: "Hydrating Pack",
      isBrandOption: true,
      subProducts: [
        { id: 121, name: "Daily Moisturizing Lotion One", brand: "CeraVe", price: 18.50, rating: 4.9, defaultImage: "/images/productList/moisturizers/CeraVe/ceraVeOne.jpeg", hoverImage: "/images/productList/moisturizers/CeraVe/ceraVeOneHover.jpeg", tag: "Deep Moisture" },
        { id: 122, name: "Moisturizing Cream Two", brand: "CeraVe", price: 19.99, rating: 4.8, defaultImage: "/images/productList/moisturizers/CeraVe/ceraVeTwo.jpeg", hoverImage: "/images/productList/moisturizers/CeraVe/ceraVeTwoHover.jpeg", tag: "Best Seller" },
        { id: 123, name: "Skin Renewing Cream Three", brand: "CeraVe", price: 24.00, rating: 4.7, defaultImage: "/images/productList/moisturizers/CeraVe/ceraVeThree.jpeg", hoverImage: "/images/productList/moisturizers/CeraVe/ceraVeThreeHover.jpeg", tag: "Barrier Repair" },
        { id: 124, name: "AM Facial Moisturizing Four", brand: "CeraVe", price: 17.50, rating: 4.6, defaultImage: "/images/productList/moisturizers/CeraVe/ceraVeFour.jpeg", hoverImage: "/images/productList/moisturizers/CeraVe/ceraVeFourHover.jpeg", tag: "SPF Protection" }
      ]
    },
    {
      id: 13,
      name: "Clinique Moisture Surge System",
      brand: "Clinique",
      slug: "clinique",
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/moisturizers/clinique/cliniquCover.png", 
      tag: "Dermatologist Tested",
      isBrandOption: true,
      subProducts: [
        { id: 131, name: "Moisturizing Lotion+ One", brand: "Clinique", price: 32.00, rating: 4.8, defaultImage: "/images/productList/moisturizers/clinique/cliOne.png", hoverImage: "/images/productList/moisturizers/clinique/cliOneHover.png", tag: "Classic Hydration" },
        { id: 132, name: "Moisture Surge 100H Two", brand: "Clinique", price: 44.00, rating: 4.9, defaultImage: "/images/productList/moisturizers/clinique/cliTwo.png", hoverImage: "/images/productList/moisturizers/clinique/cliTwoHover.png", tag: "Best Seller" },
        { id: 133, name: "Liquid Facial Soap Three", brand: "Clinique", price: 26.00, rating: 4.6, defaultImage: "/images/productList/moisturizers/clinique/cliThree.png", hoverImage: "/images/productList/moisturizers/clinique/cliThreeHover.png", tag: "Gentle Glow" },
        { id: 134, name: "Dramatically Different Gel Four", brand: "Clinique", price: 32.50, rating: 4.7, defaultImage: "/images/productList/moisturizers/clinique/cliFour.png", hoverImage: "/images/productList/moisturizers/clinique/cliFourHover.png", tag: "Oil-Free Look" }
      ]
    },
    {
      id: 14,
      name: "La Roche-Posay Thermal Shield",
      brand: "La Roche-Posay",
      slug: "laRoche",
      price: 0.00,
      rating: 4.8,
      defaultImage: "/images/productList/moisturizers/laRoche/larocheCover.jpg", 
      tag: "Sensitive Skin",
      isBrandOption: true,
      subProducts: [
        { id: 141, name: "Toleriane Double Repair One", brand: "La Roche-Posay", price: 22.00, rating: 4.8, defaultImage: "/images/productList/moisturizers/laRoche/laroOne.webp", hoverImage: "/images/productList/moisturizers/laRoche/laroOneHover.webp", tag: "Barrier Support" },
        { id: 142, name: "Lipikar Triple Repair Two", brand: "La Roche-Posay", price: 20.00, rating: 4.7, defaultImage: "/images/productList/moisturizers/laRoche/laroTwo.webp", hoverImage: "/images/productList/moisturizers/laRoche/laroTwoHover.webp", tag: "Trending" },
        { id: 143, name: "Effaclar Mat Moisturizer Three", brand: "La Roche-Posay", price: 34.00, rating: 4.6, defaultImage: "/images/productList/moisturizers/laRoche/laroThree.webp", hoverImage: "/images/productList/moisturizers/laRoche/laroThreeHover.webp", tag: "Best Seller" }
      ]
    },
    {
      id: 15,
      name: "Neutrogena Hydro Boost Water Gel",
      brand: "Neutrogena",
      slug: "neutrogenar",
      price: 0.00,
      rating: 4.7,
      defaultImage: "/images/productList/moisturizers/neutrogenar/neutrogenarCover.jpg", 
      tag: "Water Gel",
      isBrandOption: true,
      subProducts: [
        { id: 151, name: "Hydro Boost Water Gel One", brand: "Neutrogena", price: 21.50, rating: 4.8, defaultImage: "/images/productList/moisturizers/neutrogenar/neuOne.png", hoverImage: "/images/productList/moisturizers/neutrogenar/neuOneHover.png", tag: "Hyaluronic Acid" },
        { id: 152, name: "Hydro Boost Gel Cream Two", brand: "Neutrogena", price: 22.00, rating: 4.7, defaultImage: "/images/productList/moisturizers/neutrogenar/neuTwo.png", hoverImage: "/images/productList/moisturizers/neutrogenar/neuTwoHover.png", tag: "Extra Dry" },
        { id: 153, name: "Hydro Boost Night Cream Three", brand: "Neutrogena", price: 26.00, rating: 4.6, defaultImage: "/images/productList/moisturizers/neutrogenar/neuThree.png", hoverImage: "/images/productList/moisturizers/neutrogenar/neuThreeHover.png", tag: "Overnight Glow" }
      ]
    }
  ],

  // ── 🧪 সিরাম কালেকশন (📸 আপনার স্ক্রিনশটের ৩টি ব্র্যান্ড ফোল্ডারের ১০০% রিয়াল ডেটা) ──
  serum: [
    {
      id: 16,
      name: "Cetaphil Radiance Serum",
      brand: "Cetaphil",
      slug: "cetaphil", // ফোল্ডার নাম হুবহু ম্যাচড
      price: 0.00,
      rating: 4.8,
      defaultImage: "/images/productList/serum/cetaphil/cetaCover.jpeg", // .jpeg এক্সটেনশন লক
      tag: "Sensitive Skin Care",
      isBrandOption: true,
      subProducts: [
        { id: 161, name: "Healthy Radiance Serum One", brand: "Cetaphil", price: 24.00, rating: 4.8, defaultImage: "/images/productList/serum/cetaphil/cetaOne.png", hoverImage: "/images/productList/serum/cetaphil/cetaOneHover.png", tag: "Glow Serum" },
        { id: 162, name: "Deep Hydration Serum Two", brand: "Cetaphil", price: 26.50, rating: 4.7, defaultImage: "/images/productList/serum/cetaphil/cetaTwo.png", hoverImage: "/images/productList/serum/cetaphil/cetaTwoHover.png", tag: "Best Seller" },
        { id: 163, name: "Targeted Spot Serum Three", brand: "Cetaphil", price: 25.00, rating: 4.9, defaultImage: "/images/productList/serum/cetaphil/cetaThree.png", hoverImage: "/images/productList/serum/cetaphil/cetaThreeHover.png", tag: "Trending" },
        { id: 164, name: "Optimal Hydration Four", brand: "Cetaphil", price: 28.00, rating: 4.6, defaultImage: "/images/productList/serum/cetaphil/cetaFour.png", hoverImage: "/images/productList/serum/cetaphil/cetaFourHover.png", tag: "New Formulation" }
      ]
    },
    {
      id: 17,
      name: "Lancôme Advanced Génifique",
      brand: "Lancôme",
      slug: "lancome", // ফোল্ডার নাম ম্যাচড
      price: 0.00,
      rating: 4.9,
      defaultImage: "/images/productList/serum/lancome/lancomeCover.jpg", // .jpg এক্সটেনশন লক
      tag: "Luxury Youth Activating",
      isBrandOption: true,
      subProducts: [
        { id: 171, name: "Advanced Génifique Serum One", brand: "Lancôme", price: 88.00, rating: 4.9, defaultImage: "/images/productList/serum/lancome/lanOne.jpg", hoverImage: "/images/productList/serum/lancome/lanOneHover.jpg", tag: "Best Seller" },
        { id: 172, name: "Rénergie H.C.F. Triple Two", brand: "Lancôme", price: 140.00, rating: 4.8, defaultImage: "/images/productList/serum/lancome/lanTwo.jpg", hoverImage: "/images/productList/serum/lancome/lanTwoHover.jpg", tag: "Anti-Aging" },
        { id: 173, name: "Clarifique Dual Essence Three", brand: "Lancôme", price: 95.00, rating: 4.7, defaultImage: "/images/productList/serum/lancome/lanThree.jpg", hoverImage: "/images/productList/serum/lancome/lanThreeHover.jpg", tag: "Brightening" },
        { id: 174, name: "Absolue Sublime Serum Four", brand: "Lancôme", price: 220.00, rating: 4.9, defaultImage: "/images/productList/serum/lancome/lanFour.jpg", hoverImage: "/images/productList/serum/lancome/lanFourHover.jpg", tag: "Luxury Care" }
      ]
    },
    {
      id: 18,
      name: "The Ordinary Clinical Formulations",
      brand: "The Ordinary",
      slug: "ordinary", // ফোল্ডার নাম ম্যাচড
      price: 0.00,
      rating: 4.7,
      defaultImage: "/images/productList/serum/ordinary/ordinaryCover.jpg", // .jpg এক্সটেনশন লক
      tag: "Pure Science",
      isBrandOption: true,
      subProducts: [
        { id: 181, name: "Niacinamide 10% + Zinc 1% One", brand: "The Ordinary", price: 10.50, rating: 4.8, defaultImage: "/images/productList/serum/ordinary/orOne.jpg", hoverImage: "/images/productList/serum/ordinary/orOneHover.jpg", tag: "Oil Control" },
        { id: 182, name: "Hyaluronic Acid 2% + B5 Two", brand: "The Ordinary", price: 11.00, rating: 4.7, defaultImage: "/images/productList/serum/ordinary/orTwo.jpg", hoverImage: "/images/productList/serum/ordinary/orTwoHover.jpg", tag: "Best Seller" },
        { id: 183, name: "AHA 30% + BHA 2% Peeling Three", brand: "The Ordinary", price: 12.50, rating: 4.9, defaultImage: "/images/productList/serum/ordinary/orThree.jpg", hoverImage: "/images/productList/serum/ordinary/orThreeHover.jpg", tag: "Exfoliating" },
        { id: 184, name: "Buffet Multi-Technology Four", brand: "The Ordinary", price: 18.00, rating: 4.6, defaultImage: "/images/productList/serum/ordinary/orFour.jpg", hoverImage: "/images/productList/serum/ordinary/orFourHover.jpg", tag: "Trending" }
      ]
    }
  ]
};